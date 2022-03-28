# BetterBank

### A fullstack SPA 

This project is my 3rd semester final assignment via MIT xPro's Fullstack with MERN course. It demonstrates a 3-tier single page banking application built on following the provided user stories. My main starting point was redesigning my 2nd semester final assignment, the [Bad Bank banking application](https://github.com/boglarkasebestyen/badBank) and refactoring the code.

<!--<p align="center">
<img src=""
</p>-->

![](https://i.imgur.com/itZccN1.jpg)

## Frontend Architecture
The BetterBank application consists of three layers that are loosely coupled and can run on different machines. The presentation layer, or frontend, is written in React.js and contains the client-side code for the various operations like:

- creating an account
- logging in
- withdrawing
- depositing
- transferring money

and listing all transactions in the All Data component and the investment page.


The second layer is a Rest web-service based on the Strapi Content Management System. This exposes methods to manage users and create transactions. The data is stored in the 3rd layer, which is a MongoDB instance that has collections for the users and the transactions.

The front-end makes HTTP POST requests to the service layer to manage users and transactions. The client side contains validation logic and the web service also validates all the data it receives. If all the checks pass, the service creates the relevant entries in the MongoDB collections.

### React

The front-end uses React.js in functional style, using hooks like useLocation, useContext, useState, useHistory. We re-use the components from the BadBank project like Card and NavigationBar. Each page is an individual React component.

The shared state is stored and shared via react context. We also have the shared validation logic here. Other shared operations like authenticating with Strapi and getting the current balance is also implemented in MyContext.js.

We use Bootstrap for CSS and I almost entirely re-designed the original BadBank application.

## Authentication
Authenticating to the Rest API is done via a pre-defined Strapi user. The username and password for this is stored in the env file. All the rest-endpoints are secured and only authenticated users can access them. Once we authenticate with strapi we get a JWT token and we store that in a cookie, using js-cookies. 

Then this authentication token is included in every subsequent request, so we don’t have to call the authentication service again.
Logging out is done via invalidating that token from the cookie. I do the client side validation before calling the service, to avoid unnecessary calls.

## Database
We use the mongoose plugin for Strapi to have it use the MongoDB storage. We can run a MongoDB instance locally in docker, for development. 
Once we create a new strapi project, it generates routes, models and controllers. We add our new routes and controllers for our newly created entities like newusers and transactions.

The database.js file in strapi, contains the credentials required to connect to the MongoDB database. We can change this once we deploy in production.

## Deployment
The production version is deployed on heroku as two separate projects, one for the frontend and one for the service. This is done using Heroku GIT.

The .env file in the frontend project contains the URL of the service REST endpoint of our backend project.
For the database we use a MongoDB instance running in Mongo Atlas, on the cloud, the backend project is configured to connect to this.

We configure this mongo instance by setting up a user and allowing incoming connections. We can also connect to this with the MongoDB compass GUI.

## Additional features
- transferring to an existing user
- investing a given amount, which can, at random, double or it can be lost
- if it double, the user is redirected to the official Lamborghini website
- if it's lost, a gif shows saying "aaand it's gone" from South Park's "Margaritaville" episode 


## Reflection
Things to improve in the future:

- currently we are sharing to much state in the context, this can be reduced
- we can further improve the styling and error messages
- more testing to find and fix bugs
- think about security and try to improve it


## Technologies used

- HTML5, CSS3, React Bootstrap, React Tooltip
- Javascript, React.js, Node.js, Express.js, 	MongoDB, Mongoose, Strapi
- deployed to Heroku

### Additional info
* Design created with [Canva](https://www.canva.com/).

## Live demo
[Here](https://betterbankbsebe.herokuapp.com/#/).



# License

MIT License

Copyright (c) 2022 Boglárka Sebestyén

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

--
### This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
