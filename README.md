<h2 align="center">swiss-address-js</h3>
<p align="center">
Allows to query for 🇨🇭 addresses with ease.
</p>

<br/>

<div align="center">

[![Build, Lint and Test](https://github.com/cytex-ch/swiss-address-js/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/cytex-ch/swiss-address-js/actions/workflows/build-and-test.yml)
[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub issues](https://img.shields.io/github/issues/cytex-ch/swiss-address-js)]()
[![GitHub pull requests](https://img.shields.io/github/issues-pr/cytex-ch/swiss-address-js)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)
[![codecov](https://codecov.io/gh/cytex-ch/swiss-address-js/graph/badge.svg?token=P7TXWCFFB5)](https://codecov.io/gh/cytex-ch/swiss-address-js)

</div>

<br/>

<div align="center" style="margin-bottom: 20px; background-color: #FFF; border-radius: 5px; padding: 20px; color: #000;">
        ⚠️ This project is still in development and not ready for production use. ⚠️<br/>
        Can't wait to use it? Feel free to
        <a href="#authors">contribute</a>.
</div>

<br/>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installing](#installing)
- [Tests](#tests)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)

## 🧐 About

<a name="about"></a>

<strong>swiss-address-js</strong> is a JavaScript library that allows you to query for swiss addresses with ease. It uses the API of Swiss Post fetch latest building addresses. It is written in TypeScript and can be used in any JavaScript environment.

### ⚠️ Disclaimer

This project is not affiliated with Swiss Post. It is an unofficial API wrapper for the [Address Webservices API](https://developer.post.ch/en/address-web-services-rest). Use at your own risk. We are not responsible for any damage caused by the use of this library.

## 🏁 Features

<a name="features"></a>

- Search
- Fetch
- Download
- Create

## 🏁 Getting Started

<a name="getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

<a name="prerequisites"></a>

Please make sure you have installed the following tools:

- [Node.js](https://nodejs.org/en/) - JavaScript runtime environment
- [TypeScript](https://www.typescriptlang.org/) - Typescript compiler

And a package manager of your choice:

- [npm](https://www.npmjs.com/) - Node.js package manager
- [yarn](https://yarnpkg.com/) - Node.js package manager

Next, you need to create a new account at [Swiss Post](https://developer.post.ch/en/address-web-services-rest) and request an API key for a technical user. You will need the username and password to use this library.

### Installing

<a name="installing"></a>

Install the package via npm:

```bash
npm install swiss-address-js --save
```

or via yarn:

```bash
yarn add swiss-address-js
```

## 🎈 Usage

<a name="usage"></a>

### Basic usage

```typescript
import AddressWebServices from 'swiss-address-js';

// Create a new instance
const addresses = new AddressWebServices({
    username: 'your-username',
    password: 'your-password',
});

// Search for zip codes
const zipCodes = await swiss-address-js.findTownNameByZipCode('8000')

// Search for street names beginning with 'A'
const streetNames = await addresses.findStreetsByTown('A', '8000', 'Zürich')

// Search for house numbers beginning with 1, in towns with zip code beginning with "80" and name "Zürich" lying in a street called "Alte Landstrasse"
const buildingNumbers = await addresses.findBuildingNumbersByStreet('1', '80', 'Zürich', 'Alte Landstrasse')
```

## 🔧 Running the tests

<a name="tests"></a>

Tests are written with jest. You can run them with the following command:

```bash
npm run test
```

## ⛏️ Built Using

<a name="built_using"></a>

- [TypeScript](https://www.typescriptlang.org/) - Programming language
- [Jest](https://jestjs.io/) - Testing framework
- [Prettier](https://prettier.io/) - Code formatter
- [ESLint](https://eslint.org/) - Linter

## ✍️ Authors

<a name="authors"></a>

- [@cytex-ch](https://github.com/cytex-ch) - Project author
- [@sjutz](https://github.com/sjutz) - Project maintainer <simon.jutz@cytex.ch>
