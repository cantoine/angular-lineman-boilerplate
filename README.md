# Angular Boilerplate built with Grunt

The current boilerplate that I'm using for angular apps. Stole lots of ideas etc from the Lineman Angular template and ng-boilerplate

## Quick Start

Install Node.js and then:

```sh
$ git clone git://github.com/cantoine/boilerplate
$ cd boilerplate
$ npm -g install grunt-cli bower
$ npm install
$ bower install
```

```
# Grunt Watch -- This will build the app and run unit tests where applicable
$ grunt watch
```

# E2E tests need some work before they are fully functional.
```sh
$ ./start-selenium.sh
```

#In Another terminal window
```sh
$ grunt protractor
```