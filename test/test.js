'use strict';

var Some = require('../lib/option').Some;
var None = require('../lib/option').None;
var expect = require('expect.js');

describe('Option', function() {
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
});