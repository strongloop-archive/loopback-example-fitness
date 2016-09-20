**DEPRECATED AS OF 2016-09-19**

---

#loopback-example-fitness

Example Cordova-Loopback based fitness app (modelled after Fitbit)

##Getting started

1. cd into repository folder and run 'npm install'.
2. The application runs in two modes application and server. Follwing are the corresponding steps required. 

### Steps to run the application for wearable mixin android app:
1. Set the responseType attribute to **app** in config.json file under server. 
2. Execute '**slc run**' to start the application.
3. Open the wearable  mixin app and click login.
4. You will be redirected to new screen, enter credentials for fitbit and click allow.
5. User activities will be displayed along with user name. 

#### Steps to run application for accessing server side UI and REST connector methods. 
1. Set the responseType attribute to server in config.json file under server.
2. Hit **'http://localhost:3000/'** url in your browser, you will be redirected to api.fibit.com, enter credentials and click allow.
3. You will be redirected to success page. This page contains link 'Checkout your activities', follow the link you will see user activites loaded for 12/10/2012 date by default (since data is available for mentioned date).
4. The page has a date control to get user activities from Fitbit for selected date.
5. You can also get user activites from REST explorer, open **'http://localhost:3000/explorer'** in your browser and check the getActivities function under userActivityModel. 
5. Enter the date you want to get the user activities for, then enter the accessToken and accessSecret which are saved for the user in the user model.
6. Click on try it to get the user avtivities in JSON format.  
