# The TDK page of the University in Miskolc

NodeJS + Express + TypeScript
Angular
MongoDB

## Installations
1. Install Node.js from https://nodejs.org/en/
2. Install Angular CLI: `npm install -g @angular/cli`
3. Install TypeScript: `npm install -g typescript`
4. Install MongoDB from  https://docs.mongodb.com/manual/installation/


## Email service
1. Create an etheral account : https://ethereal.email/create  
2. `cd backend\src\Configuration.ts`  
3. Write the mail configuration  

## backend start:
`cd backend`

`npm install`

`npm run start`


## frontend start:
`cd frontend\tdk-app`

`npm install`

## Admin initialization (first user)
GET request: `/api/admin`
(anitaagardi@gmail.com, admin)

## File upload initialization:
 mkdir `/backend/tmp`

### Start the hungarian site:
`npm run start:hu`
### Start the english site:
`npm run start:en`

-------------------------------------------------------------------------------------------------------------------------

### i18n (build):
`ng xi18n --output-path src/locale`


### build:
`ng build --prod --verbose > logAngular.txt`


### nodemon:
`nodemon --exec npm start`


### test:

`npm run test Conference.spec.ts`

`npm run test ConferenceValidator.spec.ts`

`npm run test DB.spec.ts`

`npm run test Menu.spec.ts`

`npm run test MenuValidator.spec.ts`

`npm run test TDKFile.spec.ts`

`npm run test TDKFileValidator.spec.ts`

`npm run test User.spec.ts`

`npm run test UserValidator.spec.ts`


### Backend configurations:
tdk-page\backend\src\Configuration.ts


### Frontend configurations:
frontend\tdk-app\src\app\constants.ts