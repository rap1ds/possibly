(function(global) {
  'use strict';

  function Option(val) {
    
    function valueOf() {
      return val;
    }

    return {
      valueOf: valueOf
    };
  }

  function Some(val) {
    return Option(val);
  }

  function None() {
    return Option(null);
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