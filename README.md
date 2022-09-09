# kona-dashboard

### About the Project

A simple, clean dashboard that explores the idea of using Kona from an "admin" perspective. In this project, admins can review teams' current and overall status and explore at deeper information on their weekly status. A future iteration would include "pinning" teams so that high-priority/new teams get first priority for review, as well as a more visual barometer of how teams are faring across the org.

There is Node.js + Express backend/API that parses the CSV file, then sends that information to the frontend after the frontend calls its /teamInfo endpoint. The frontend is React + MaterialUI and displays the info accordingly.

The project should compile/reload fine if you make any changes to the code locally; it runs on nodemon and webpack for the frontend/backend respectively!

### Prerequisites
* first things first, you'll need npm
  ```sh
  npm install npm@latest -g
  ```
* clone this repo
  ```sh
  https://github.com/dramaswamyy/kona-dashboard.git
  ```
* next you'll need to download the csv file used for this project (rygs.csv!) the csv file should be added to the ROOT of the folder under kona-dashboard.
* install npm packages
   ```sh
   npm install
   ```
* open two terminal tabs
* cd into "kona-dashboard" and run the backend first using npm start in your first terminal tab. the console message should inform you the server is listening at localhost:8000.
   ```sh
   npm start
   ```
* cd into "ui/kona-dashboard-frontend" and run the frontend next using npm start in your second terminal tab. it should run on localhost:3000 and use the proxy to redirect api requests to localhost:8000. if you see any errors in terminal related to the proxy, the frontend/backend may not have been started in the correct order. cut the process and try again! 
   ```sh
   npm start
   ```

congrats, you've successfully run this project!
