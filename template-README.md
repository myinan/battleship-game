# Javascript Template Repository
- `Node.js` and `npm` are installed globally. Dependencies of projects are managed locally.<br>
  Use the `nvm install --lts` command to install the latest Node.js version, with Node Version Manager (When you use NVM to update Node.js, it also updates npm to the latest version that corresponds to the installed Node.js version.).

- After running the command `npm install` locally to install dependencies, run the command `npm update --save-dev` to update your project's package.json file to include dependency versions.

- ### Files:

  - `package.json`: Metadata file used by npm to manage project dependencies, scripts, configuration settings, and other metadata.
  - `package-lock.json`: Records the exact version of each installed package and their dependencies.
  - `webpack.common/dev/prod.js`: Config files for webpack.
  - `.eslintrc.json`: Config file for ESLint. Extends eslint-config-airbnb-base. Extends eslint-config-prettier to disable conflicting rules with Prettier.
  - `.prettierrc.json`: Empty config file to let editors and other tools know you are using Prettier.
  - `.babelrc`: Using ES6 import/export statements with Jest requires some configuration to ensure that Jest can  handle the ES6 syntax. First, make sure `babel-jest` and `@babel/preset-env` dependencies are installed. `.babelrc` will contain Babel configuration options (`"presets": ["@babel/preset-env"]`).
  - `jest.config.js`: This is the configuration file for Jest.
Here's an explanation of the non-commented configuration options in your `jest.config.js` file:

    1. **clearMocks**: When set to `true`, Jest will clear all mocks between every test. This ensures that mocks from one test do not affect others.

    2. **collectCoverage**: When set to `true`, Jest will collect code coverage information during the test run.

    3. **coverageDirectory**: Specifies the directory where Jest should store its coverage files.

    4. **moduleNameMapper**: A map from regular expressions to module names or arrays of module names that allow stubbing out resources with a single module. In this case, it is used to handle CSS files and other static assets.
        ```js
          "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
          "<rootDir>/src/tests/__mocks__/fileMock.js",
          "\\.(css|less|scss|sass)$": "identity-obj-proxy",

          // fileMock.js is used to mock imported static files.
          // identitiy-obj-proxy: An identity object using ES6 proxies. Used for mocking .css imports.
        ```

    5. **testRegex**: A regular expression that Jest uses to detect test files. The provided regex (`(/__tests__/.*|(\\.|/)(test|spec))\\.js$`) matches files in the `__tests__` directory and files ending with `.test.js` or `.spec.js`.

    6. **transform**: An object specifying the transformation module for different file types. In this case, it uses Babel (`babel-jest`) to transform JavaScript files.

    7. **transformIgnorePatterns**: An array of regular expression patterns that are matched against all source file paths. Files matching these patterns will be skipped during the transformation process.

  - `.gitignore`: Set files for Git to ignore.
  - `.prettierignore`: Set files for Prettier to ignore.
  - `.vscodeignore`: This is the file i keep my WSL2 installation guide and custom `settings.json` file for the remote Ubuntu enviroment.
  
- ### Dependencies (`devDependencies` entry in the `package.json` file):
  1. **`@babel/core`**: Babel is a JavaScript compiler. This package is the core of Babel, which provides the basic functionality for transforming ECMAScript 2015+ code (ES6+) into a compatible version of JavaScript.

  1. **`@babel/preset-env`**: This Babel preset allows you to use the latest JavaScript features without having to micromanage which syntax transformations are needed. It automatically determines the plugins and polyfills needed based on your target environment.

  1. **`babel-loader`**: This is a webpack loader that allows using Babel with webpack. It transpiles JavaScript files using Babel during the webpack build process.

  1. **`css-loader`**: This webpack loader enables you to import and bundle CSS files in your JavaScript code. It interprets `@import` and `url()` like `import/require()` and will resolve them.

  1. **`eslint`**: ESLint is a popular JavaScript linter that helps maintain a consistent code style and catch potential errors. It can be configured using various plugins and configurations.

  1. **`eslint-config-airbnb-base`**: This is a shareable ESLint configuration from Airbnb for JavaScript, particularly useful for enforcing their style guide rules.

  1. **`eslint-config-prettier`**: This package disables formatting rules that may conflict with Prettier, a code formatter. It allows you to use ESLint and Prettier together without issues.

  1. **`eslint-plugin-jest`**: ESLint rules for Jest.

  1. **`eslint-plugin-import`**: A plugin for ESLint that provides linting rules for import/export syntax and path resolution in JavaScript files.

  1. **`html-webpack-plugin`**: This webpack plugin simplifies the creation of HTML files to include in the output bundle. It automatically adds script tags for the generated JavaScript bundles.

  1. **`prettier`**: Prettier is a code formatter that helps maintain a consistent code style. It is often used in conjunction with ESLint to format code automatically.

  1. **`style-loader`**: This webpack loader enables you to add CSS styles to the DOM by injecting `<style>` tags. It's often used in conjunction with `css-loader`.

  1. **`webpack`**: Webpack is a module bundler for JavaScript applications. It takes modules with dependencies and generates static assets representing those modules.

  1. **`webpack-cli`**: This package provides the command-line interface for webpack. It allows you to run webpack commands from the terminal.

  1. **`webpack-dev-server`**: This package provides a development server for webpack. It includes features like live reloading, allowing you to preview your application in a development environment.

  1. **`webpack-merge`**: This utility allows you to merge webpack configuration objects. It's often used to keep the webpack configuration DRY (Don't Repeat Yourself) by splitting it into multiple files and merging them as needed.

  1. **`jest`**: Jest is a popular JavaScript testing framework developed by Facebook. It is widely used for testing JavaScript code, particularly for React applications. Jest is designed to be easy to set up and use, providing a robust set of features for testing, mocking, and code coverage.

  1. **`babel-jest`**: Required dependency to use babel alongside jest.

  1. **`identity-obj-proxy`**: An identity object using ES6 proxies. Used for mocking .css imports with Jest.

- ### Used VSCod Plugins:
  - **ESLint**: Integrates ESLint into VS Code. The extension uses the ESLint library installed in the opened workspace folder. If the folder doesn't provide one the extension looks for a global install version. If you haven't installed ESLint either locally or globally, do so by running npm init @eslint/config (this will install eslint locally and let you configure the installation.)
  Setting the following rule on **settings.json** will automatically fix the fixable ESLint errors on `.js` files when you save(ctrl+s) the file:
  ```json
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  ```
  - **Prettier-Code Formatter**: Integrates Prettier into VS Code. This extension will use prettier from your project's local dependencies.
  Setting the following rule on **settings.json** will automatically format the `.js` and `.css` files when you save(ctrl+s):
  ```json
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  }
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  }
  ```
  - **Atom One Dark Theme (font: Fira Mono Medium)**
  - **Material Icon Theme**
  - **Live Server**
  - **WSL (Windows Subsystem for Linux) extension**