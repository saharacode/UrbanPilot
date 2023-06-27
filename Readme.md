## UrbanPilot

UrbanPilot is a mapbased app and is supposed to collect and exchange travel advices.
It allows its users to add and show locations for several cities on a map.
It is possible to add new cities to the user-account and start a new collection of travel advices for
this city.


## Features
- Register and Login with an account
- Show User Details
- Mapcomponent with locations (not available yet)
- Possibility to add and remove new locations (not available yet)
- Possibility to add and remove new cities (not available yet)
- Connect with other users and exchange cities (not available yet)

The following APIs are used:
- API for City-Coordinates (not available yet)

Do the following steps to setup the project:

1. Clone project from GitHub
2. run `npm install` in the frontend folder
3. set env variable `MONGO_URI` to the address of your local database (e.g. mongodb://localhost:27017)
4. create a database with the name "UrbanPilotDB" with a collection "Users"
5. start backend
6. start frontend via `npm start` or `package,json`
7. start the server and open your browser on http://localhost:3000 to see the frontend
8. use the register-form to create a test-account for the database 
