# blueprints-app
An app for loading files and generating floorplans.

## Installation
Install imagemagick on your server system if you have not already
Run 'npm install' from the root directory
Replace the sample_awsconfig.json with your own awsconfig.json

## Start app
Run 'npm start' from the root directory

## Run tests
Run 'npm test' from the root directory

## Current features
* Supports JPG, PNG, and PDF files
* Asynchronous background resize
* Allows user to upload various floorplans with titles and image sets
* Stores off data to postgres and images to S3
* Allows user to view submitted floorplans

## Features currently in development
* User login, authentication, and ownership of floorplans
* More responsive UI with detailed error reporting
* Back end filetype validation
* API-level test coverage

## Sample instance of the app can be found at https://fieldwire-blueprint-app.herokuapp.com/