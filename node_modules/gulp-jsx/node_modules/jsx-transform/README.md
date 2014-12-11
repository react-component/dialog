# jsx-transform

[![Build Status](https://secure.travis-ci.org/alexmingoia/jsx-transform.png)](http://travis-ci.org/alexmingoia/jsx-transform) 
[![NPM version](https://badge.fury.io/js/jsx-transform.png)](http://badge.fury.io/js/jsx-transform)
[![Dependency Status](https://david-dm.org/alexmingoia/jsx-transform.png)](http://david-dm.org/alexmingoia/jsx-transform)

JSX transpiler. Desugar JSX into JavaScript.

This module aims to be a standard and configurable implementation of JSX
decoupled from [React][0].

## Installation

```sh
npm install jsx-transform
```

## Example

This JSX:

```jsx
/** @jsx h */

var h = require('virtual-hyperscript');

var profile = <div>
  <img src="avatar.png" class="profile" />
  <h3>{[user.firstName, user.lastName].join(' ')}</h3>
</div>;
```

is transformed into this JavaScript:

```javascript
var h = require('virtual-hyperscript');

var profile = h('div', null, [
  h('img', { src: "avatar.png", class: "profile" }),
  h('h3', null, [[user.firstName, user.lastName].join(' ')])
]);
```

## JSX

JSX is a JavaScript XML syntax.

### The Transform

Known tag names are passed as arguments to the ident specified by the `@jsx`
docblock:

`<div class="blue"></div>` => `virtualdom.h('div', { class: 'blue' })`

Unknown tags are assumed to be function names in scope:

`<FrontPage class="blue"></FrontPage>` => `FrontPage({ class: 'blue' })`

### docblock

Only files with the `/** @jsx DOM */` docblock will be parsed unless
`options.ignoreDocblock` is set. The constructor name is taken from the `@jsx`
definition.

### Expressions

Use JavaScript expressions as attribute values by wrapping the expression in a
pair of curly braces ({}) instead of quotes (""):

```jsx
<Profile class={state.isLoggedIn ? 'loggedIn' : 'loggedOut'}></Profile>
```

```javascript
Profile({ class: state.isLoggedIn ? 'loggedIn' : 'loggedOut' });
```

Expressions can also express children:

```jsx
<Profile>{ state.isLoggedIn ? <Settings /> : <CreateAccount /> }</Profile>
```

```javascript
Profile(null, [state.isLoggedIn ? Settings(null) : CreateAccount(null)]);
```

### React and JSX

React's transform has a slightly different API, treating tag names as method
names instead of arguments. Equivelant behavior can be achieved in
`jsx-transform` by setting `options.tagMethods` to `true`.

## API

### jsx.transform(str, options)

Desugar JSX and return transformed string.

### jsx.transformFile(path, options)

Desugar JSX in file and return transformed string.

### Options

* `ignoreDocblock` Parse files without docblock. If true, `options.jsx` must
   also be set (default: false).
* `tagMethods` Use tag as method instead of argument (default: false).
   If true, `DOM.h1()` instead of `DOM('h1')`.
* `jsx` name of virtual DOM node constructor (default: set by docblock).
* `tags` array of known tags (default: exports.tags)

## BSD Licensed
