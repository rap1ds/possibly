(function(global) {
  'use strict';

  function Option(val) {
    var hasValue = !!arguments.length;
    var value = hasValue ? val : null;
    
    function valueOf() {
      return value;
    }

    function isSome() {
      return hasValue;
    }

    function isNone() {
      return !hasValue;
    }

    return {
      valueOf: valueOf,
      isSome: isSome,
      isNone: isNone
    };
  }

  function Some(val) {
    return Option(val);
  }

  function None() {
    return Option();
  }

  // Export
  var exported = {
    Some: Some,
    None: None
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