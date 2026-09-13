rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isAdmin() {
      return request.auth != null && request.auth.token.firebase.sign_in_provider == 'password';
    }

    function isAuthenticated() {
      return request.auth != null;
    }

    match /artifacts/{appId}/public/data/settings/{document=**} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }

    match /artifacts/{appId}/public/data/inventory_v3/{document=**} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }

    match /artifacts/{appId}/public/data/requests_v3/{document=**} {
      // FIX: Public users can only 'get' specific documents if they know the exact ID. 
      // They can no longer 'list' all requests in the database (Massive Data Exposure Fixed).
      allow get: if isAuthenticated(); 
      allow create: if isAuthenticated(); 
      // Admin has full control including listing all requests.
      allow list, update, delete: if isAdmin(); 
    }
  }
}
