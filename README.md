# React Rollup Boilerplate

[![Dependencies Status](https://david-dm.org/psychobolt/react-rollup-boilerplate.svg)](https://david-dm.org/psychobolt/react-rollup-boilerplate)
[![Dev Dependencies Status](https://david-dm.org/psychobolt/react-rollup-boilerplate/dev-status.svg)](https://david-dm.org/psychobolt/react-rollup-boilerplate?type=dev)
[![Peer Dependencies Status](https://david-dm.org/psychobolt/react-rollup-boilerplate/peer-status.svg)](https://david-dm.org/psychobolt/react-rollup-boilerplate?type=peer)

[![Build Status](https://travis-ci.org/psychobolt/react-rollup-boilerplate.svg?branch=master)](https://travis-ci.org/psychobolt/react-rollup-boilerplate)
[![codecov](https://codecov.io/gh/psychobolt/react-rollup-boilerplate/branch/master/graph/badge.svg)](https://codecov.io/gh/psychobolt/react-rollup-boilerplate)

A boilerplate for building React libraries

## Included

- [Rollup](https://rollupjs.org/) with [Babel](https://www.npmjs.com/package/rollup-plugin-babel), [SCSS](https://www.npmjs.com/package/rollup-plugin-scss) and other plugins:
    - [Node Resolve](https://www.npmjs.com/package/rollup-plugin-node-resolve)
    - [CommonJS](https://www.npmjs.com/package/rollup-plugin-commonjs)
- [styled-components](https://www.styled-components.com/) with [default](https://www.styled-components.com/docs/tooling#stylelint) [stylelint](https://stylelint.io/) support
- Run tests with [Jest](https://facebook.github.io/jest/)
- Code Coverage reporting with [Codecov](https://codecov.io/)
- Manual Testing with [Storybook](https://storybook.js.org/)
- Structural and interaction testing with [Enzyme](https://github.com/airbnb/enzyme)
- Type checking with [Flow](https://flow.org)
- JS style check with [ESLint](http://eslint.org/) using [AirBnb style guide](https://github.com/airbnb/javascript)

## Setup

Install the latest [Node JS LTS](https://nodejs.org/) and [Yarn](https://yarnpkg.com) and simply run ```yarn``` or ```yarn install``` command in the root and stories directory.

## Installing Flow Types

Install flowtypes using the package script:
```sh
yarn flow-typed
```

> It is advised to run the script whenever NPM packages are installed.

## Local development

During development,
```sh
# watch and build new source changes
yarn start
# or serve *.stories.js files and manually test on the Storyboard app
yarn storyboard
```

## Including NPM packages

This project uses two package.json structure.

### Library dependencies -- <root_dir>/package.json

```sh
yarn add [package-name] --dev # for dev tools
yarn add [package-name] # for app
```

### Storybook dependencies -- <root_dir>/stories/package.json

```sh
cd stories/
yarn add [package-name]
```

## Static Types

```sh
yarn flow # performs type checking on files
```

## Lint

```sh
yarn lint # runs linter to detect any style issues (css & js)
yarn lint:css # lint only css
yarn lint:js # lint only js
yarn lint:js --fix # tries to fix js lint issues
```

## Test

```sh
yarn test # runs functional/unit tests using Jest
yarn test --coverage # with coverage
```

## Build

```sh
yarn build # builds sources at src/
```