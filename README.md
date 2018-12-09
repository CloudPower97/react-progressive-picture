# React Progressive Picture

[![made-for-react](https://img.shields.io/badge/Made%20for-React-1f425f.svg?style=for-the-badge)](https://reactjs.org/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier)
[![GitHub release](https://img.shields.io/github/release/CloudPower97/react-progressive-picture.svg?style=for-the-badge)](https://GitHub.com/CloudPower97/react-progressive-picture/releases/)
[![GitHub contributors](https://img.shields.io/github/contributors/CloudPower97/react-progressive-picture.svg?style=for-the-badge)](https://GitHub.com/CloudPower97/react-progressive-picture/graphs/contributors/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

[![Build Status](https://travis-ci.com/CloudPower97/react-progressive-picture.svg?style=for-the-badge)](https://travis-ci.com/CloudPower97/react-progressive-picture)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/330865ddfd1d45b0b09b1cbb5320123c)](https://www.codacy.com/app/claudio.cortese/react-progressive-picture?utm_source=github.com&utm_medium=referral&utm_content=CloudPower97/react-progressive-picture&utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/330865ddfd1d45b0b09b1cbb5320123c)](https://www.codacy.com/app/claudio.cortese/react-progressive-picture?utm_source=github.com&utm_medium=referral&utm_content=CloudPower97/react-progressive-picture&utm_campaign=Badge_Coverage)

<details>
<summary><strong>Table of Contents</strong></summary>

- [Overview](#overview)
- [Installation](#installation)
- [Why use this component?](#why-use-this-component)
- [Documentation](#documentation)
  - [Usage](#usage)
  - [Options](#options)
- [Polyfill](#polyfill)
- [Contributing](#contributing)
  - [Development](#development)
  - [Linter](#linters)
  - [Testing](#testing)
  - [Commit Guidelines](#commit-guidelines)

</details>

---

## Overview

<p align="center">
  <img src="https://i.ibb.co/1nbysdb/react-progressive-picture.jpg" alt="React Progressive Picture" width="512">
</p>
_React Progressive Picture_ is the right way to handle your `img` or `picture` element inside a `React` application.

_React Progressive Picture_ is highly inspired by [`react-progressive-image-loading`](https://github.com/wcandillon/react-progressive-image-loading) and [`react-responsive-picture`](https://github.com/braposo/react-responsive-picture).

_React Progressive Picture_ does make internally uses of the [`Intersection Observer`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) API to know exactly when to lazyload your beautiful image.

Also supports different kind of effects like blur, opacity and/or grayscale to make your design just the way you want it!

> You also want to add the
> [intersection-observer](https://www.npmjs.com/package/intersection-observer)
> and/or [picturefill](https://www.npmjs.com/package/picturefill)
> polyfill for full browser support. Check out adding the [polyfill](#polyfill)
> for details about how you can include it.

---

## Installation

`npm i @cloudpower97/react-progressive-picture`

or

`yarn add @cloudpower97/react-progressive-picture`

---

## Documentation

<!-- TODO: Add Demo section -->

### Usage

<img src="https://i.ibb.co/SxZCr2q/carbon.png" alt="carbon" border="0">

> You can find more example in the `example` folder.

---

<!-- TODO: Add new props to this table -->

### Options

| property       | propType | required | default | description                                                                       |
| -------------- | -------- | -------- | ------- | --------------------------------------------------------------------------------- |
| sources        | array    | false    | -       | The array of source objects                                                       |
| placeholder    | string   | false    | -       | Placeholder image to show until the src loads                                     |
| src            | number   | true     | -       | The src of the image                                                              |
| alt            | string   | true     | ''      | Alternative text for image                                                        |
| sizes          | string   | false    | -       | Sizes attribute to be used with src for determing best image for user's viewport. |
| transitionTime | number   | true     | 750     | Time in millisecond to transition the effects                                     |
| timingFunction | string   | true     | 'ease'  | Timing function to use for the effects                                            |
| blur           | number   | false    | 10      | Initial value for the blur filter                                                 |
| grayscale      | number   | false    | 0       | Initial value for the grayscale filter                                            |
| opacity        | number   | false    | 1       | Initial value for the opacity filter                                              |
| delay          | number   | false    | 0       | Time in milliseconds before src image is loaded                                   |

---

## Contributing

> Yes please!

Pull requests and [reporting an issue](https://github.com/CloudPower97/react-progressive-picture/issues) are always welcome :D

<!-- TODO: Update development workflow -->

### Development

Fork and clone the repo:

`git clone git@github.com:your-username/react-progressive-picture.git`

Create a branch for the feature/fix:

`git checkout -b feat:new-great-idea`

Add tests and make them pass:

`npm run test`

or

`yarn test`

You can also

`npm run start`

or

`yarn start`

to spin up a webpack dev server and see your changes as you make them in the `src` folder!

Once you are done, push to your fork and submit a pull request.

#### Linters

<p align="center">
<img src="https://prettier.io/icon.png" alt="Prettier" width="128">
<img src="https://avatars-04.gitter.im/group/iv/3/57542cecc43b8c6019777d76" alt="ESLint" width="128">
</p>

To enforce a consistent style across the entire project we are using [`Prettier`](https://prettier.io/).

We are also using [`ESLint`](https://eslint.org/) to catch bugs and syntax errors during development.

We run `Prettier` and `ESLint` before each commit thanks to [`Husky`](https://github.com/typicode/husky), so that you can focus on what matter the most : writing code.

Please, note that you will not be able to commit/push any changes you made if your code doesn't pass any of the linting stage described above.

In that case check your `git-log` and fix any problem reported there.

Also note that by default `ESLint` will try to fix any problems it can fix by itself.

It will bother you only for changes it can't fix.

All of the above assure us that our code base is always consistent with the rules we are using and bug free as much as possible.

<!-- TODO: Add cypress.io -->

#### Testing

<p align="center">
  <img src="https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/940/square_256/jestlogo.png" alt="Jest" width="128"/>
  <img src="https://www.cypress.io/img/logo-dark.36f3e062.png" width="128">
</p>
We are using [`Jest`](https://github.com/facebook/jest) and [`Enzyme`](https://github.com/airbnb/enzyme) to test our components.

#### Commit Guidelines

We follow the [Angular Commit Guidelines](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits).

Refer to their documentation for more information.

Note: If you DON'T follow the [Angular Commit Guidelines](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits) you will not be able to commit your changes.

---

## Intersection Observer

[Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
is the _API_ used to determine if an element is inside the viewport or not.

> [Can i use intersectionobserver?](https://caniuse.com/#feat=intersectionobserver)

## Picture

> [Can i use picture?](https://caniuse.com/#feat=picture)

---

## Polyfill

You can import the
[intersection-observer](https://www.npmjs.com/package/intersection-observer)
and/or [picturefill](https://www.npmjs.com/package/picturefill) directly or use
a service like [polyfill.io](https://polyfill.io/v2/docs/) to add it when
needed.

```sh
yarn add intersection-observer picturefill
```

Then import it in your app:

```js
import 'intersection-observer'
import 'picturefill'
```
