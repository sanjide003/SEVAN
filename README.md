# Service Portal — മൊബൈൽ ഉപയോഗിച്ച് സജ്ജീകരിക്കൽ

ഈ app GitHub Pages-ലാണ് പ്രവർത്തിക്കുന്നത്. വേറെ server, paid Firebase plan, Firebase Hosting എന്നിവ ആവശ്യമില്ല.

## ഓരോ code update-നും

1. GitHub-ൽ ലഭിക്കുന്ന PR തുറക്കുക.
2. **Update PR** / merge button അമർത്തുക.
3. GitHub Pages site സ്വയം പുതുക്കും.

## ആദ്യ Firebase setup

### 1. Authentication

Firebase Console → **Authentication** → **Sign-in method**:

- **Email/Password** enable ചെയ്യുക (admin login-നായി).
- **Anonymous** enable ചെയ്യുക (public visitors-നായി).

### 2. Admin user

Authentication → **Users** → **Add user** ഉപയോഗിച്ച് admin email/password ഉണ്ടാക്കുക.

### 3. Super admin document

Firestore Database-ൽ താഴെയുള്ള path-ൽ admin user-ന്റെ Firebase UID ഉപയോഗിച്ച് document വേണം:

`SKSSF / charity_app / admins / <ADMIN_UID>`

Document fields:

```text
active: true
username: Your Name
```

### 4. Firestore Rules (ഓരോ rules update-നും)

1. ഈ repository-യിലെ `firestore_rules.js` തുറക്കുക.
2. മുഴുവൻ ഉള്ളടക്കവും copy ചെയ്യുക.
3. Firebase Console → **Firestore Database** → **Rules**-ൽ paste ചെയ്യുക.
4. **Publish** അമർത്തുക.

ഇതാണ് GitHub PR വഴി സ്വയം ചെയ്യാൻ കഴിയാത്ത ഏക Firebase Console step.

## ആദ്യ content setup

1. `/admin.html` തുറന്ന് admin email/password ഉപയോഗിച്ച് login ചെയ്യുക.
2. **Settings** tab-ൽ title, subtitle, contact number, WhatsApp, address, logo എന്നിവ നൽകുക.
3. **Add Item/Service** tab-ൽ services/items ചേർക്കുക.
4. Settings അല്ലെങ്കിൽ services ഒന്നും നൽകിയിട്ടില്ലെങ്കിൽ public site ഒരു സ്ഥാപനത്തിന്റെയും പഴയ വിവരങ്ങൾ കാണിക്കാതെ clean empty state ആയി തുടരും.

## Privacy note

Public visitors-ക്ക് ഇനി പേര്, ഫോൺ, സ്ഥലം എന്നിവയുള്ള അപേക്ഷകൾ വായിക്കാൻ കഴിയില്ല. അപേക്ഷ submit ചെയ്തതിന് ശേഷം ലഭിക്കുന്ന **tracking ID** സുരക്ഷിതമായി സൂക്ഷിക്കണം; അതുപയോഗിച്ചാണ് status കാണാൻ കഴിയുക.
