<h2 align="center">swiss-address-js</h3>
<p align="center">
    Retrieve and manage your ePost/swiss-address-js snail mail with ease.
</p>

<br/>

<div align="center">

[![Build, Lint and Test](https://github.com/cytex-media-solutions/swiss-address-js/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/cytex-media-solutions/swiss-address-js/actions/workflows/build-and-test.yml)
[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub issues](https://img.shields.io/github/issues/cytex-media-solutions/swiss-address-js)]()
[![GitHub pull requests](https://img.shields.io/github/issues-pr/cytex-media-solutions/swiss-address-js)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)
[![codecov](https://codecov.io/gh/cytex-media-solutions/swiss-address-js/graph/badge.svg?token=P7TXWCFFB5)](https://codecov.io/gh/cytex-media-solutions/swiss-address-js)

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

<strong>swiss-address-js</strong> allows you to easily fetch physical snail mail from your ePost/Swiss-address-js account. Additionally, you can also manage your snail mail by creating, updating and deleting it.

### ⚠️ Disclaimer

This project is not affiliated with Swiss Post or Swiss-address-js in any way. It is an unofficial API wrapper for the Swiss-address-js API. Use at your own risk. We are not responsible for any damage caused by the use of this library.

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
- A [epost.ch](https://www.epost.ch) account whose address is verified and has enabled Scanning Services.

And a package manager of your choice:

- [npm](https://www.npmjs.com/) - Node.js package manager
- [yarn](https://yarnpkg.com/) - Node.js package manager

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
import Swiss-address-js from 'swiss-address-js';

// Create a new instance
const swiss-address-js = new Swiss-address-js('username', 'password');

// Fetch tenants (optional, defaults to first tenant)
const tenants = await swiss-address-js.user.tenants();
swiss-address-js.use(tenants[0]);

// Login
await swiss-address-js.login();

// Fetch all letters
await swiss-address-js.letterbox.find();

// Fetch a specific letter
await swiss-address-js.letterbox.findOne("letter-id");

// Remove a letter
await swiss-address-js.letterbox.delete("letter-id");

// Download a letter
await swiss-address-js.letterbox.download("letter-id", "./letter.pdf");

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

- [@cytex-media-solutions](https://github.com/cytex-media-solutions) - Project author
- [@sjutz](https://github.com/sjutz) - Project maintainer <simon.jutz@cytex.ch>
