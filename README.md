# Boku No Dicom Viewer
### This is not meant to be used for diagnostic in any way
![Viewer demo](https://raw.githubusercontent.com/Hggo/boku-no-dicom-viewer/master/demo.gif)

This viewer consumes Orthanc rest api, it may be necessary to run it in serve folders or in some other way to bypass Orthanc's CORS restrictions:

http://book.orthanc-server.com/faq/same-origin.html

# Run it locally for development

Run `ng start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

It does a proxy to `http://localhost:8042/` where you should have an orthanc instance running.

# Run it together with an Orthanc instance on Docker

 In this method there should be no CORS problems

 1. Update the .env file located in the project root folder with the absolute path of this project in your machine
 
 2. npm i -g  @angular/cli 
 
 3. npm i
 
 4. ng b
 
 5. docker-compose up -d
 
 6. Navigate to `http://localhost:8042/bndv/index.html`

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
