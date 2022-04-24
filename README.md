# Introduction
This is an express js server that illustrate CRUD (Create, Read, Update and Delete) operations over REST.
There is no frontend, the api is tested over postman.
We will use sequalize orm with postgres database.


The postman project link is `https://www.getpostman.com/collections/ce92cba89cd649cc69f8`
in the case you are unable toimport from the above link import the json from postman folder into Postman.


## Getting Started
* ensure you have installed.
    1. An upto date version of Node.
    2. npm
    3. Vs code.
    4. An updated version of chrome.

* navigate to the project folder and run
    1. `npm install`
    2. `npm run start-dev` to run ther server with node mon.

## Overview 
Exexcution start in `bin/www` and uses port `4000`, the app has been hosted on ip `209.250.224.120` uses port `88` for example `http://209.250.224.120:88/` opens the homepage
* the root routes are declared in app.js but route path are specied in files under route.
* model holds our database object representation
* uploads and public are where uloaded assests or public files like js would exist.
* views contain our ejs views.
* env stores our secreats for example mailgun credentials for sending emails can also have default server arguments

To test how the diffferent ednpoints work we wil use `POSTMAN`.
open this link `https://www.getpostman.com/collections/ce92cba89cd649cc69f8` (recomended) or use the json in postman folder ,will open the REST request test collection.

NB: default user was create with name :`sample` email : `sample@mail.com`, password : hashed string `sample`

## Why express and javascript
Javascript is concise language that does not boggle the learner with tons of syntax.
Express has good documentation and well established patterns.