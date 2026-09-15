rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return request.auth != null &&
             exists(/databases/$(database)/documents/SKSSF/charity_app/admins/$(request.auth.uid)) &&
             get(/databases/$(database)/documents/SKSSF/charity_app/admins/$(request.auth.uid)).data.active == true;
    }

    function isAuthenticated() { return request.auth != null; }

    match /SKSSF/charity_app {
      match /admins/{userId} {
        allow get: if request.auth != null && request.auth.uid == userId;
        allow list, create, update, delete: if false;
      }

      match /settings/{document=**} {
        allow read: if isAuthenticated();
        allow write: if isAdmin();
      }

      match /inventory/{document=**} {
        allow read: if isAuthenticated();
        allow write: if isAdmin();
      }

      // Applicant data is private and visible only to administrators.
      match /requests/{requestId} {
        allow get, list: if isAdmin();
        allow create: if isAuthenticated()
          && request.resource.data.keys().hasAll(['trackingId', 'itemId', 'itemName', 'reqName', 'reqPhone', 'reqLoc', 'reqDuration', 'status', 'createdAt'])
          && request.resource.data.reqName is string && request.resource.data.reqName.size() >= 1 && request.resource.data.reqName.size() <= 100
          && request.resource.data.reqPhone is string && request.resource.data.reqPhone.matches('^[0-9]{10}$')
          && request.resource.data.reqLoc is string && request.resource.data.reqLoc.size() >= 1 && request.resource.data.reqLoc.size() <= 200
          && request.resource.data.status == 'Item Request';
        allow update, delete: if isAdmin();
      }

      // Tracking contains only the minimum fields needed for phone/name status lookup.
      match /tracking/{trackingId} {
        allow get, list: if isAuthenticated();
        allow create: if isAuthenticated()
          && request.resource.data.keys().hasOnly(['itemName', 'reqName', 'reqPhone', 'status', 'createdAt'])
          && request.resource.data.itemName is string
          && request.resource.data.reqName is string
          && request.resource.data.reqPhone is string && request.resource.data.reqPhone.matches('^[0-9]{10}$')
          && request.resource.data.status == 'Item Request';
        allow update, delete: if isAdmin();
      }
    }
  }
}
