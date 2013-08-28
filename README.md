# Option structure in JavaScript

## Installation and usage

```bash
npm install --save optionally
```

### Usage in Node

```javascript
/* require */
var Optional = require('optional');
var Some = Optional.Some;
var None = Optional.None;

/* use */
var someOpt = Optional.Some('value');
var noneOpt = Optional.None();
```

### Usage in browser

```javascript
/* add script tag and use global variable 'Optional' */
var Some = Optional.Some;
var None = Optional.None;

/* use */
var someOpt = Optional.Some('value');
var noneOpt = Optional.None();
```

### Usage in browser with RequireJS

```javascript
require(['optional'], function(Optional) {
    var Some = Optional.Some;
    var None = Optional.None;

    /* use */
    var someOpt = Optional.Some('value');
    var noneOpt = Optional.None();
})
```

## Create new option type

```javascript
var someOpt = Some('value');
var noneOpt = None();
```

## Is it Some or None?

```javascript
someOpt.isSome()  // true
someOpt.isNone()  // false
noneOpt.isSome()  // false
noneOpt.isNone()  // true

Optional.isSome(someOpt)    // true
Optional.isNone(someOpt)    // false
Optional.isSome(noneOpt)    // false
Optional.isNone(noneOpt)    // true

Optional.isSome("I'm not Some")         // false
Optional.isNone("I'm not None")         // false
Optional.isOption("And I'm not Option") // false
Optional.isOption(Some("But I am"))     // true
```

## Access the value

```javascript
someOpt.valueOf()  // 'value'
noneOpt.valueOf()  // undefined
```

## Access the value, or else...

```javascript
someOpt.valueOrElse('default value')  // 'value'
noneOpt.valueOrElse('default value')  // 'default value'
```

## Map, filter, every, forEach...

```javascript

/* Map */
someOpt.map(function(value) {
  return value.toUpperCase()
});
// => 'VALUE'

noneOpt.map(function(value) {
  return value.toUpperCase()
});
// => undefined

/* TODO Filter */
someOpt.filter(function(value) {
  return value !== ''
});
// => 'value'

noneOpt.filter(function(value) {
  return value !== ''
});
// => 'null'

/* TODO Each */
someOpt.forEach(function(value) {
  alert(value);
});
// => alerts 'value'

noneOpt.forEach(function(value) {
  alert(value);
});
// => does not alert

```

## Wait, what? Map, filter, every and co. are array methods. How do they apply to Option structure?

Think Option as an array with either one or none elements. E.g. map over `Some` is same as mapping over an array with only one element. Similarly, map over `None` is same as mapping over an array with no elements. And in fact, the Option library doesn't implement its own `map`, `filter` etc. methods, instead it uses native array methods.

Following array methods are supported:

* map
* filter
* forEach
* every
* sort
* reverse
* forEach
* every
* some
* reduce
* reduceRight
* join
* slice
* lastIndexOf
* concat
* indexOf