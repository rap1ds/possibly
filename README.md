# Option structure in JavaScript

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