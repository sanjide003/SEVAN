rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isAdmin() {
      return request.auth != null && request.auth.token.firebase.sign_in_provider == 'password';
    }

    function isAuthenticated() {
      return request.auth != null;
    }

    // 1. App Settings Rules
    match /artifacts/{appId}/public/data/settings/{document=**} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }

    // 2. Inventory & Services Unified Rules
    match /artifacts/{appId}/public/data/inventory_v3/{document=**} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }

    // 3. Requests Rules
    match /artifacts/{appId}/public/data/requests_v3/{document=**} {
      // User can fetch specific data for tracking
      allow get: if isAuthenticated(); 
      allow create: if isAuthenticated(); 
      // Admin can list, edit, update status and delete
      allow list, update, delete: if isAdmin(); 
    }
  }
}
