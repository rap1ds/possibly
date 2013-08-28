'use strict';

var option = require('../lib/option');
var Some = option.Some;
var None = option.None;
var expect = require('expect.js');

describe('Option', function() {
  it('#isSome', function() {
    expect(option.isSome(Some('value'))).to.be.eql(true);
    expect(option.isSome(None())).to.be.eql(false);
    expect(option.isSome(Some(undefined))).to.be.eql(true);
    expect(option.isSome(false)).to.be.eql(false);
    expect(option.isSome('string')).to.be.eql(false);
    expect(option.isSome(null)).to.be.eql(false);
  });

  it('#isNone', function() {
    expect(option.isNone(Some('value'))).to.be.eql(false);
    expect(option.isNone(None())).to.be.eql(true);
    expect(option.isNone(Some(undefined))).to.be.eql(false);
    expect(option.isNone(false)).to.be.eql(false);
    expect(option.isNone('string')).to.be.eql(false);
    expect(option.isNone(null)).to.be.eql(false);
  });

  it('#isOption', function() {
    expect(option.isOption(Some('value'))).to.be.eql(true);
    expect(option.isOption(None())).to.be.eql(true);
    expect(option.isOption(Some(undefined))).to.be.eql(true);
    expect(option.isOption(false)).to.be.eql(false);
    expect(option.isOption('string')).to.be.eql(false);
    expect(option.isOption(null)).to.be.eql(false);
  });
});

describe('Some and None', function() {
  it('#valueOf', function() {
    expect(Some('value').valueOf()).to.be.eql('value');
    expect(Some(undefined).valueOf()).to.be.eql(undefined);
    expect(None().valueOf()).to.be.eql(undefined);
  });

  it('#isSome', function() {
    expect(Some('value').isSome()).to.be.eql(true);
    expect(None().isSome()).to.be.eql(false);
    expect(Some(undefined).isSome()).to.be.eql(true);
  });

  it('#isNone', function() {
    expect(Some('value').isNone()).to.be.eql(false);
    expect(None().isNone()).to.be.eql(true);
    expect(Some(undefined).isNone()).to.be.eql(false);
  });

  it('#valueOrElse', function() {
    expect(Some('value').valueOrElse('default value')).to.be.eql('value');
    expect(Some(undefined).valueOrElse('default value')).to.be.eql(undefined);
    expect(None().valueOrElse('default value')).to.be.eql('default value');
  });

  it('#map', function() {
    expect(Some('value').map(function(val) {
      return val.toUpperCase();
    })).to.be.eql('VALUE');
    expect(None().map(function(val) {
      return val.toUpperCase();
    })).to.be.eql(undefined);
  });

  it('#filter', function() {
    var even = function(val) {
      return val % 2 === 0;
    };

    expect(Some(1).filter(even)).to.be.eql(undefined);
    expect(Some(2).filter(even)).to.be.eql(2);
    expect(None().filter(even)).to.be.eql(undefined);
  });

  it('#forEach', function() {
    var called = 0;

    var incr = function() {
      called++;
    };

    expect(called).to.be.eql(0);
    Some(1).forEach(incr);
    expect(called).to.be.eql(1);
    None().forEach(incr);
    expect(called).to.be.eql(1);
  });

  it('#every', function() {
    var truthy = function(val) {
      return !!val;
    };

    expect(Some(true).every(truthy)).to.be.eql(true);
    expect(Some(false).every(truthy)).to.be.eql(false);

    // return true because "all" element (i.e. none) the function return true
    expect(None().every(truthy)).to.be.eql(true);
  });

  it('#some', function() {
    var truthy = function(val) {
      return !!val;
    };

    expect(Some(true).some(truthy)).to.be.eql(true);
    expect(Some(false).some(truthy)).to.be.eql(false);

    // return true because "none" of the elements returned true
    expect(None().some(truthy)).to.be.eql(false);
  });

  it('#reduce', function() {
    var add = function(a, b) {
      return a + b;
    };

    expect(Some(1).reduce(add)).to.be.eql(1);
    expect(Some(1).reduce(add, 2)).to.be.eql(3);
    expect(Some(undefined).reduce(add)).to.be.eql(undefined);
    expect(None().reduce(add, 0)).to.be.eql(0);
    // Reduce raises error if empty array is reduced without initial value
    expect(function() { None().reduce(add); }).to.throwError();
  });

  it('#reduceRight', function() {
    var add = function(a, b) {
      return a + b;
    };

    expect(Some(1).reduceRight(add)).to.be.eql(1);
    expect(Some(1).reduceRight(add, 2)).to.be.eql(3);
    expect(Some(undefined).reduceRight(add)).to.be.eql(undefined);
    expect(None().reduceRight(add, 0)).to.be.eql(0);
    // ReduceRight raises error if empty array is reduced without initial value
    expect(function() { None().reduceRight(add); }).to.throwError();
  });

  it('#join', function() {
    expect(Some(1).join('')).to.be.eql('1');
    expect(Some(undefined).join('')).to.be.eql('');
    expect(None().join('')).to.be.eql('');
  });

  it('#slice', function() {
    expect(Some(1).slice(0, 0)).to.be.eql([]);
    expect(Some(1).slice(0, 1)).to.be.eql([1]);
    expect(Some(1).slice(0, 5)).to.be.eql([1]);
    expect(Some(1).slice(1, 1)).to.be.eql([]);
    expect(Some(1).slice(-1)).to.be.eql([1]);
    expect(Some(1).slice(-2)).to.be.eql([1]);
    expect(None().slice(0, 0)).to.be.eql([]);
    expect(None().slice(0, 1)).to.be.eql([]);
  });

  it('#lastIndexOf', function() {
    expect(Some(1).lastIndexOf(1)).to.be.eql(0);
    expect(Some(1).lastIndexOf(1, 0)).to.be.eql(0);
    expect(Some(1).lastIndexOf(1, 1)).to.be.eql(0);
    expect(Some(1).lastIndexOf(1, -1)).to.be.eql(0);
    expect(Some(1).lastIndexOf(0)).to.be.eql(-1);
    expect(None().lastIndexOf(1)).to.be.eql(-1);
    expect(None().lastIndexOf(1, 0)).to.be.eql(-1);
    expect(None().lastIndexOf(1, 1)).to.be.eql(-1);
    expect(None().lastIndexOf(1, -1)).to.be.eql(-1);
    expect(None().lastIndexOf(0)).to.be.eql(-1);
  });

  it('#concat', function() {
    expect(Some(1).concat([2, 3])).to.be.eql([1, 2, 3]);
    expect(Some().concat([2, 3])).to.be.eql([undefined, 2, 3]);
    expect(None().concat([2, 3])).to.be.eql([2, 3]);
  });

  it('#indexOf', function() {
    expect(Some(1).indexOf(1)).to.be.eql(0);
    expect(Some(1).indexOf(1, 0)).to.be.eql(0);
    expect(Some(1).indexOf(1, 1)).to.be.eql(-1);
    expect(Some(1).indexOf(1, -1)).to.be.eql(0);
    expect(Some(1).indexOf(0)).to.be.eql(-1);
    expect(None().indexOf(1)).to.be.eql(-1);
    expect(None().indexOf(1, 0)).to.be.eql(-1);
    expect(None().indexOf(1, 1)).to.be.eql(-1);
    expect(None().indexOf(1, -1)).to.be.eql(-1);
    expect(None().indexOf(0)).to.be.eql(-1);
  });

  it('#sort', function() {
    var compare = function(a, b) {
      if(a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    };

    expect(Some(1).sort(compare)).to.be.eql(1);
    expect(Some(undefined).sort(compare)).to.be.eql(undefined);
    expect(None().sort(compare)).to.be.eql(undefined);
  });

  it('#reverse', function() {
    expect(Some(1).reverse()).to.be.eql(1);
    expect(Some(undefined).reverse()).to.be.eql(undefined);
    expect(None().reverse()).to.be.eql(undefined);
  });
});