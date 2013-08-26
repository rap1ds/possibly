(function(global) {
  'use strict';

  function Option(hasValue, val) {
    
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

    ['map', 'filter', 'forEach', 'every'].forEach(function(method) {
      optionMethods[method] = function() {
        var result = Array.prototype[method].apply((hasValue ? [val] : []), arguments);
        return result[0];
      };
    });

    ['forEach'].forEach(function(method) {
      optionMethods[method] = function() {
        Array.prototype[method].apply((hasValue ? [val] : []), arguments);
      };
    });

    ['every', 'some', 'reduce', 'reduceRight', 'join', 'slice', 'lastIndexOf', 'concat'].forEach(function(method) {
      optionMethods[method] = function() {
        var result = Array.prototype[method].apply((hasValue ? [val] : []), arguments);
        return result;
      };
    });

    return optionMethods;
  }

  // Export
  var exported = {
    Some: function Some(val) {
      return Option(true, val);
    },
    None: function None() {
      return Option(false);
    }
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
        define('option', function() {
          return exported;
        });
      }
      
      global.Option = exported;
    }
  })();

})(this);