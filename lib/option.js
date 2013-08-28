(function(global) {
  'use strict';

  function Possibly(hasValue, val) {
    
    function valueOf() {
      return val;
    }

    function isSome() {
      return hasValue;
    }

    function isNone() {
      return !hasValue;
    }

    function valueOrElse(els) {
      return hasValue ? val : els;
    }

    var optionMethods = {
      valueOf: valueOf,
      isSome: isSome,
      isNone: isNone,
      valueOrElse: valueOrElse
    };

    function arrayFn(method, args) {
      return Array.prototype[method].apply((hasValue ? [val] : []), args);
    }

    ['map', 'filter', 'forEach', 'every', 'sort', 'reverse'].forEach(function(method) {
      optionMethods[method] = function() {
        return arrayFn(method, arguments)[0];
      };
    });

    ['forEach', 'every', 'some', 'reduce', 'reduceRight', 'join', 'slice', 'lastIndexOf', 'concat', 'indexOf'].forEach(function(method) {
      optionMethods[method] = function() {
        return arrayFn(method, arguments);
      };
    });

    return optionMethods;
  }

  function testFor(fn) {
    return function(val) {
      if(val && typeof val[fn] === 'function') {
        return val[fn]();
      } else {
        return false;
      }
    };
  }

  var isSome = testFor('isSome');
  var isNone = testFor('isNone');

  function isOption(val) {
    return isSome(val) || isNone(val);
  }

  // Export
  var exported = {
    Some: function Some(val) {
      return Possibly(true, val);
    },
    None: function None() {
      return Possibly(false);
    },
    isSome: isSome,
    isNone: isNone,
    isOption: isOption
  };

  (function() {
    /*global module: false */
    /*global define: false */
    if (typeof module !== 'undefined' && module !== null) {
      // CommonJS
      module.exports = exported;
    } else {
      if (typeof define === 'function') {
        // AMD RequireJS
        define('possibly', function() {
          return exported;
        });
      }
      
      global.Possibly = exported;
    }
  })();

})(this);