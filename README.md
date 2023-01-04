<a name="readme-top"></a>

[![Build Status][build-shield]][build-url]
[![Npmjs][npmjs-shield]][npmjs-url]
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
[![Twitter][twitter-shield]][twitter-url]

<br />

<!-- PROJECT LOGO -->

<div align="center">

<h3>Flagsio JavaScript SDK</h3>

  <p align="center">
    A JavaScript & TypeScript SDK for NodeJS and Browser Clients 
    <br />
    <a href="https://docs.flagsio.com/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/flagsio/js-sdk/issues">Report Bug</a>
    ·
    <a href="https://github.com/flagsio/js-sdk/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Overview](#overview)
- [Getting started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Local development](#local-development)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

<!-- OVERVIEW -->

## Overview

[Flagsio](https://www.flagsio.com/) is an easy-to-use, real-time feature management platform that helps teams build
better software, faster.
<br />[Get started](#getting-started) using Flagsio today!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting started

To run any of the example client apps locally follow these steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```
* Create a free account at [https://app.flagsio.com/signup](https://app.flagsio.com/signup)

### Installation

1. Install the SDK package
   ```sh
   npm install @flagsio/js-sdk
   ```
2. Build
   ```
   npm run build
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Local development

1. Clone the repo
   ```sh
   git clone https://github.com/flagsio/js-sdk.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Build
   ```
   npm run build
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->

## Usage

### Browser Client:

Import SDK

```js
// /browser path contains a polyfilled bundle of the SDK for browsers 
import FlagsioSdk from "@flagsio/js-sdk/browser";
```

Connect once in the entry point of your app

#### `app.js`:

```js
const ENV_ID = 'ENTER YOUR ENVIRONMENT ID';
const API_KEY = 'ENTER YOUR API KEY';

FlagsioSdk.connect(ENV_ID, API_KEY, {
    // optional configs
    debug: true, // enabe to print logs in the console
    logger: (msg) => {
        // optional logger override
        console.debug(msg);
    },
    onConnectionStatusChanged: (status: string) => {
        // optional connection status callback
        console.log("Connection status:", status);
    },
    onFeatureUpdated: (featureId: string) => {

        // optional feature updated callback
        // can immediately evaluate the new feature state
        const enabled = FlagsioSdk.hasFeature(featureId, false);
        console.log("Feature updated:", featureId, enabled);
    },
});
```

Anywhere in your application

```js
const isEnabled = FlagsioSdk.hasFeature("example-feature", false);

if (isEnabled) {
    // do something when example feature is enabled
} else {
    // do something else
}
```

### NodeJS Client:

Import SDK

```js
// root path contains a bundle of the SDK for NodeJS 
import FlagsioSdk from "@flagsio/js-sdk"; 
```

Connect once in the entry point of your app

#### `app.js`:

```js
const ENV_ID = 'ENTER YOUR ENVIRONMENT ID';
const API_KEY = 'ENTER YOUR API KEY';

FlagsioSdk.connect(ENV_ID, API_KEY, {
    // optional configs
    debug: true, // enabe to print logs in the console
    logger: (msg) => {
        // optional logger override
        console.debug(msg);
    },
    onConnectionStatusChanged: (status: string) => {
        // optional connection status callback
        console.log("Connection status:", status);
    },
    onFeatureUpdated: (featureId: string) => {

        // optional feature updated callback
        // can immediately evaluate the new feature state
        const enabled = FlagsioSdk.hasFeature(featureId, false);
        console.log("Feature updated:", featureId, enabled);
    },
});
```

Anywhere in your application

```js
const isEnabled = FlagsioSdk.hasFeature("example-feature", false);

if (isEnabled) {
    // do something when example feature is enabled
} else {
    // do something else
}
```

*For more examples, please refer to the [Documentation](https://docs.flagsio.com/)*

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->

## Roadmap

- [ ] TODO

<!-- 
- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
    - [ ] Nested Feature
-->

See the [open issues](https://github.com/flagsio/js-sdk/issues) for a full list of proposed features (and
known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any
contributions you make are **greatly appreciated**.

If you have a suggestion that would make this project better, please fork the repo and create a pull request. You can
also
simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for more information on how to contribute to our project.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->

## License

Distributed under the **Apache License, Version 2.0** License.See [LICENSE.txt](LICENSE.txt) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->

## Contact

Flagsio Team - [@FlagsioDotCom](https://twitter.com/FlagsioDotCom/) - github@flagsio.com

Project Link: [https://github.com/flagsio/js-sdk/](https://github.com/flagsio/js-sdk/)

Website Link: [https://www.flagsio.com/](https://www.flagsio.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

<!-- TODO -->

[build-shield]: https://dev.azure.com/flagsio/js-sdk/_apis/build/status/flagsio.js-sdk?branchName=main&stageName=Build

[build-url]: #

[npmjs-shield]: https://img.shields.io/npm/dm/@flagsio/js-sdk.svg

[npmjs-url]: https://npmjs.com/package/@flagsio/js-sdk

[contributors-shield]: https://img.shields.io/github/contributors/flagsio/js-sdk.svg

[contributors-url]: https://github.com/flagsio/js-sdk/graphs/contributors

[forks-shield]: https://img.shields.io/github/forks/flagsio/js-sdk.svg

[forks-url]: https://github.com/flagsio/js-sdk/network/members

[stars-shield]: https://img.shields.io/github/stars/flagsio/js-sdk.svg

[stars-url]: https://github.com/flagsio/js-sdk/stargazers

[issues-shield]: https://img.shields.io/github/issues/flagsio/js-sdk.svg

[issues-url]: https://github.com/flagsio/js-sdk/issues

[license-shield]: https://img.shields.io/github/license/flagsio/js-sdk.svg

[license-url]: https://github.com/flagsio/js-sdk/blob/main/LICENSE.txt

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?logo=linkedin&colorB=555

[linkedin-url]: https://linkedin.com/company/flagsio/

[twitter-shield]: https://img.shields.io/twitter/follow/FlagsioDotCom.svg?label=Follow

[twitter-url]: https://twitter.com/FlagsioDotCom/
