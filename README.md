## Install and run podcast

### `npm install`
### `npm start`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn more

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).


# Deployment Steps

- First make sure your changes are good to go on `main` branch
- Then merge changes from `main` to `podcast` (we always use `podcast` branch as prodoction branch, and every change must go from adhoc branch -> main -> podcast)
- Github Pages action will automatically deploy the new changes


# Future Milestones

- Convert Static to Dynamic (React, Nextjs, etc)
- Make sure audio files are pushed as git lfs
- Make this as generic as possible with a single or a couple of json configuration files
- Make this open source + self hosted podcast manager
- Charge others who want to host from our end
