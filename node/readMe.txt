1. If you facing any issue related bcrypt
 - please check in package.json file bcrypt should be 3.0.2 ::::  ("bcrypt": "^3.0.2").

2. If you facing any error like that
   dyld: lazy symbol binding failed: Symbol not found: __ZN4node19GetCurrentEventLoopEPN2v87IsolateE
   Referenced from: /testify_test/node/node_modules/bcrypt/lib/binding/bcrypt_lib.node
   Expected in: flat namespace

3. Please enter this command
 - npm rebuild bcrypt --build-from-source

4. If you facing any : node_modules/rxjs/internal/types.d.ts(81,77): error TS1109: Expression expected.
just remove ^ character from "rxjs": "^6.0.0" from package.json file and make it "rxjs": "6.0.0". It should work fine.