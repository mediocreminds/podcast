## Install and run podcast

### `yarn install`

### `yarn dev`

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `out` folder.<br>

## Learn more

This project uses [NextJS](https://nextjs.org/) and [TailwindCSS](https://tailwindcss.com/).

# Deployment Steps

- First make sure your changes are good to go on `main` branch
- Then merge changes from `main` to `podcast` (we always use `podcast` branch as prodoction branch, and every change must go from adhoc branch -> main -> podcast)
- Github Pages action will automatically deploy the new changes

# Future Milestones

- [x] Convert Static to Dynamic (React, Nextjs, etc)
- Make sure audio files are pushed as git lfs
- Make this as generic as possible with a single or a couple of json configuration files
- Make this open source + self hosted podcast manager
- Charge others who want to host from our end
