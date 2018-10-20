# BusinessCardParser

This project was created for [Asymmetrik's programming challenge #1](https://asymmetrik.com/programming-challenges/#silk-accordion-0-0).

The main business logic of the app is implemented in an Angular service called `BusinessCardParser`.

`DemoComponent` serves as an example of an Angular component consuming the `BusinessCardParser` service.

## Tools and Framework

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.1.

[Lite-server](https://github.com/johnpapa/lite-server) makes it easy to check out the static website that is generated for code coverage metrics. `npm install -g lite-server`.

## Run the application
Install project dependencies with npm: `npm install`.

Then you can run the app with `npm start`. It spins up a dev server and opens a browser window on `http://localhost:4200/`. 

## Build

`npm run build` - Build the project. The build artifacts will be stored in the `dist/` directory. 

`npm run build:prod` - Uses the `--prod` flag for a production build.

## Unit tests and code coverage

`npm run test` - Execute unit tests and generate code coverage via [Karma](https://karma-runner.github.io). 

Use lite server to easily view the code coverage metrics. `lite-server --baseDir="coverage"`

## Documentation

`npm run compodoc` - generate documentation via [Compodoc](https://compodoc.app/). Documentation will be stored in `docs/` and served on localhost:8080).

## Running end-to-end tests

`npm run e2e` - execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` (requires Angular CLI tools to be installed globally) or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
