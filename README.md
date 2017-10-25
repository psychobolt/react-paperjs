# React Rollup Boilerplate

[![Build Status](https://travis-ci.org/psychobolt/react-rollup-boilerplate.svg?branch=master)](https://travis-ci.org/psychobolt/react-rollup-boilerplate)
[![Dependencies Status](https://david-dm.org/psychobolt/react-rollup-boilerplate.svg)](https://david-dm.org/psychobolt/react-rollup-boilerplate)
[![codecov](https://codecov.io/gh/psychobolt/react-rollup-boilerplate/branch/master/graph/badge.svg)](https://codecov.io/gh/psychobolt/react-rollup-boilerplate)

A boilerplate for building React libraries

## Included

- [Rollup](https://rollupjs.org/) with [Babel](https://www.npmjs.com/package/rollup-plugin-babel), [SCSS](https://www.npmjs.com/package/rollup-plugin-scss) and other plugins:
    - [Node Resolve](https://www.npmjs.com/package/rollup-plugin-node-resolve)
    - [CommonJS](https://www.npmjs.com/package/rollup-plugin-commonjs)
- Test runner: [Jest](https://facebook.github.io/jest/)
- Code Coverage reporter: [Codecov](https://codecov.io/)
- [Enzyme](https://github.com/airbnb/enzyme) test framework
- ES Linting: [ESLint](http://eslint.org/) using [AirBnb style guide](https://github.com/airbnb/javascript) for library sources
- Example from official [Rollup tutorial](https://rollupjs.org/#creating-your-first-bundle)
- Demo project with [create-react-app](https://github.com/facebookincubator/create-react-app)

## Setup

Install the latest [Node JS](https://nodejs.org/) and [Yarn](https://yarnpkg.com) and simply run ```yarn``` or ```yarn install``` command in the root project directory and in ```demo/```.

## Local development

During development, run:
```sh
yarn start # watches and builds new code changes
```

## Static Types

```sh
yarn flow # performs type checking on files
```

See [official documentation](https://flow.org/) for a usage guide.

Yarn will run postinstall for updating flowtype definitions when new packages are added.

## Lint

```sh
yarn lint # runs linter to detect any style issues
yarn lint --fix # tries to fix lint issues
```

## Test

```sh
yarn test # runs functional/unit tests using Jest
yarn test --coverage # with coverage
```

## Build

```sh
yarn build
```

## Demo App Development

```sh
npm link
cd demo/
yarn # install dependencies
yarn start # watch, build, and serve the demo app on localhost:3000
```

Review [demo/README.md](demo/README.md) for more information.