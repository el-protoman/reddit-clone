# Project requirements and goals
# Wireframes:
Figma

# Technologies used: React, Redux, HTML/CSS/JS, Jest, Git and Github

# Features/Components:
+ Accessible on any device and browser (responsive design)
++ replace components with frontend library (MUI,antd,etc)
+ Users see initial view of data (home page)
++ Header
+++ Users can search data using terms (search bar)
+++ Users can filter data based on categories (search filter) : dropdown with subreddits (js, html, css, webdev, programming, etc)
++ Feed
+++ Card component with post data: voting, comments, title, media
+ Users can see detailed view of item (content page)
++ Header
++ Hero : Post title, media, comments section, add comment
+ Users can leave an error state (404 page)
++ Header
++ Hero : 404 message, go back button

+ Redux state slice for reddit home page, state slice for subreddit
+ Addition to Redux state slices of reducers/thunks for voting, adding comments
+ CI/CD deployment (digital ocean or vercel or netlify)
+ TDD (jest and possibly enzyme)


# Future Work:
+ Animations and transitions with animation library
+ 90+ accessibility score on lighthouse


# Getting Started with Create React App and Redux

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
