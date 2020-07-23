# Development Guide

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

This boilerplate supports [Monorepo](https://danluu.com/monorepo/) configurations out of the box and will watch, build, serve any local packages. Each package should have ```src/index.js``` entry file.

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
yarn test # runs functional/unit tests for all packages
```

> Configurable with .project file, supports the [PACKAGES](#packages) variable. You can also inspect all tests in debug mode within Visual Studio Code.

## Coverage

Coverage will be uploaded to your [codecov](https://codecov.io/) account, individually for packages by using each package's name as a [flag](https://docs.codecov.io/docs/flags). By default, coverage is configured to utilize a configuration from codecov-config branch (for [example](https://github.com/psychobolt/react-rollup-boilerplate/tree/codecov-config)). However, you may opt out that setting and configure codecov.yml in the master branch.

```sh
yarn codecov # Runs tests and upload coverage for all packages
```

> Configurable with .project file, supports the [PACKAGES](#packages) variable.

## Other scripts

```sh

yarn build # builds sources for prod and dev
yarn build:dev # builds sources for development
yarn build:prod # builds sources for production

yarn watch # watches dev builds
yarn dist # builds all packages and publishes to npm
```

> Configurable with .project file, supports the [PACKAGES](#packages) variable.

## Environment Variables

### PACKAGES

Some scripts optionally allow the environment variable to specific local packages(s) (in Glob format) for running scripts e.g. ```PACKAGES=default-export,package-* yarn test``` This environment variable will override the .projects config.