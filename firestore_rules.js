rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // അഡ്മിൻ ആണോ എന്ന് പരിശോധിക്കാനുള്ള ഫംഗ്ഷൻ (Database ലെ admins കളക്ഷൻ നോക്കും)
    function isAdmin() {
      return request.auth != null && 
             exists(/databases/$(database)/documents/SKSSF/charity_app/admins/$(request.auth.uid)) &&
             get(/databases/$(database)/documents/SKSSF/charity_app/admins/$(request.auth.uid)).data.active == true;
    }

    // പബ്ലിക് യൂസർ ആണോ എന്ന് പരിശോധിക്കാനുള്ള ഫംഗ്ഷൻ
    function isAuthenticated() {
      return request.auth != null;
    }

    match /SKSSF/charity_app {
        
        // 1. Admins Collection Rules
        match /admins/{userId} {
            // അഡ്മിന് വിവരങ്ങൾ വായിക്കാം (ലോഗിൻ ചെക്കിങ്ങിനായി)
            allow read: if request.auth != null && request.auth.uid == userId;
            // അഡ്മിൻ മാനേജ്മെന്റ് ഫയർബേസ് കൺസോൾ വഴി മാത്രം ചെയ്യുന്നതാണ് സുരക്ഷിതം
            allow write: if false; 
        }

        // 2. App Settings Rules
        match /settings/{document=**} {
            allow read: if isAuthenticated();
            allow write: if isAdmin();
        }

        // 3. Inventory/Services Rules
        match /inventory/{document=**} {
            allow read: if isAuthenticated();
            allow write: if isAdmin();
        }

        // 4. Requests Rules
        match /requests/{document=**} {
            // യൂസർക്ക് സ്റ്റാറ്റസ് ട്രാക്ക് ചെയ്യാൻ ഫോൺ നമ്പർ ഉപയോഗിച്ചുള്ള fetch ന് പെർമിഷൻ
            allow read: if isAuthenticated(); 
            // ആർക്കും പുതിയ അപേക്ഷ നൽകാം
            allow create: if isAuthenticated(); 
            // അഡ്മിന് മാത്രമേ അപേക്ഷകൾ എഡിറ്റ് ചെയ്യാനോ delete ചെയ്യാനോ സാധിക്കൂ
            allow update, delete: if isAdmin(); 
        }
    }
  }
}
