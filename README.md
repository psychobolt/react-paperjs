# React Rollup Boilerplate

[![Dependencies Status](https://david-dm.org/psychobolt/react-rollup-boilerplate.svg)](https://david-dm.org/psychobolt/react-rollup-boilerplate)
[![Dev Dependencies Status](https://david-dm.org/psychobolt/react-rollup-boilerplate/dev-status.svg)](https://david-dm.org/psychobolt/react-rollup-boilerplate?type=dev)
[![Peer Dependencies Status](https://david-dm.org/psychobolt/react-rollup-boilerplate/peer-status.svg)](https://david-dm.org/psychobolt/react-rollup-boilerplate?type=peer)

[![Build Status](https://travis-ci.org/psychobolt/react-rollup-boilerplate.svg?branch=master)](https://travis-ci.org/psychobolt/react-rollup-boilerplate)
[![codecov](https://codecov.io/gh/psychobolt/react-rollup-boilerplate/branch/master/graph/badge.svg)](https://codecov.io/gh/psychobolt/react-rollup-boilerplate)

A boilerplate for building React libraries.

## Included

- [React](https://reactjs.org/) with [recompose](https://github.com/acdlite/recompose)
- [Rollup](https://rollupjs.org/) with [Babel](https://www.npmjs.com/package/rollup-plugin-babel), [SCSS](https://www.npmjs.com/package/rollup-plugin-scss) and other plugins:
    - [Node Resolve](https://www.npmjs.com/package/rollup-plugin-node-resolve)
    - [CommonJS](https://www.npmjs.com/package/rollup-plugin-commonjs)
    - [Uglify](https://www.npmjs.com/package/rollup-plugin-uglify)
    - [Alias](https://www.npmjs.com/package/rollup-plugin-alias)
- [styled-components](https://www.styled-components.com/) with [default](https://www.styled-components.com/docs/tooling#stylelint) [stylelint](https://stylelint.io/) support
- Monorepo support with [Lerna](https://lernajs.io)
- Run tests with [Jest](https://facebook.github.io/jest/)
- Code Coverage reporting with [Codecov](https://codecov.io/)
- Dev sandbox and documentation with [Storybook](https://storybook.js.org/)
- Structural and interaction testing with [Enzyme](https://github.com/airbnb/enzyme)
- Type checking with [Flow](https://flow.org)
- JS style check with [ESLint](http://eslint.org/) using [AirBnb style guide](https://github.com/airbnb/javascript)

## Setup

Install the latest [Node JS LTS](https://nodejs.org/) and [Yarn](https://yarnpkg.com) and simply run ```yarn bootstrap``` command in the root project directory.

## Local development

During development,
```sh
yarn start # watch, build, and serves packages
```

## Including NPM packages

```sh
yarn add <package-name> --dev # for dev tools, story dependencies, libraries to be bundled
yarn add <package-name> [--peer] # for external dependencies (Note: Include in externals from rollup.config.common.js whenever update)
yarn lerna add <package-name> [--dev] packages/<target-package-name>] # Add/link a package to all or specific local package(s). See section: Including local packages
```

## Including local packages

This boilerplate supports [Monorepo](https://danluu.com/monorepo/) configurations out of the box and will watch, build, serve any local packages. Each package should have ```src/index.js``` entry file. Additionally, it may include a ```stories.js``` file at its root to include stories.

By default, local packages are [independently](https://github.com/psychobolt/react-rollup-boilerplate/blob/master/lerna.json#L6) versioned. You may import your own repos with Lerna or create your own sub-packages using NPM:

```sh
yarn lerna import <path-to-external-repository> # import a repository to packages/
# or 
mkdir packages/<my-package> && cd <my-package> && yarn init
```

See Lerna's offical [readme](https://github.com/lerna/lerna#readme) for a configuration and usage guide.

> You can also give alias to source files of the packages in order to work with Visual Studio Code's Intellisense. See [jsconfig.json](https://github.com/psychobolt/react-rollup-boilerplate/blob/master/jsconfig.json) and [usage](https://code.visualstudio.com/docs/languages/jsconfig#_using-webpack-aliases).

## Main Package

By default, the ```lerna.json``` defines the main package at the [root](https://github.com/psychobolt/react-rollup-boilerplate/blob/master/lerna.json#L3). You may opt-out of this configuration manually, by removing its settings and any alias references to its directory or package. 

> Note, the main package has one limitation: it cannot include any non-published packages.

## Static Types

```sh
yarn flow-typed-install # clean & install flow definitions
yarn flow-typed-update # downloads and updates new flow definitions
yarn flow # performs type checking on files
```

## Lint

```sh
yarn lint # runs linter to detect any style issues (css & js)
yarn lint:css # lint only css
yarn lint:js # lint only js
yarn lint:js --fix # attempts to fix js lint issues
```

## Test

```sh
yarn test # runs functional/unit tests using Jest
yarn test --coverage # with coverage
```

> You can also inspect tests in debug mode within Visual Studio Code.

## Other scripts

```sh
yarn build # builds all packages
yarn build:dev [--environment PACKAGES:<*,package-name>] # builds sources for development, optionally provide environment variable to specify local package(s) e.g. yarn build:dev --environment PACKAGES:default-export,package-* (glob pattern supported)
yarn build:prod [--environment PACKAGES:<*,package-name>] # builds sources for production
yarn watch [--environment PACKAGES:<*,package-name>]# watches dev builds
yarn dist # builds all packages and publishes to npm
```