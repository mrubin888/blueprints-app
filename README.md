# blueprints-app
An app for loading files and generating floorplans.

## Installation
Run 'npm install' from the root directory

## Start app
Run 'npm start' from the root directory

## Run tests
Run 'npm test' from the root directory

## Current features
* Supports JPG and PNG
* Allows user to upload various floorplans with titles and image sets
* Stores off data to postgres and images to S3
* Allows user to view submitted floorplans

## Features currently in development
* User login, authentication, and ownership of floorplans
* Greater file format support (including pdf splitting and conversion)
* More responsive UI with detailed error reporting
* Front end filetype validation
* Asyncronous preformatting of images (resize, convert file type) on file load (instead of on submit)
* API-level test coverage

## Sample instance of the app can be found at https://fieldwire-blueprint-app.herokuapp.com/