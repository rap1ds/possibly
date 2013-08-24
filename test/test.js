'use strict';

var Some = require('../lib/option').Some;
var None = require('../lib/option').None;
var expect = require('expect.js');

describe('Option', function() {
  it('#valueOf', function() {
    expect(Some('value').valueOf()).to.be.eql('value');
    expect(Some(null).valueOf()).to.be.eql(null);
    expect(None().valueOf()).to.be.eql(null);
  });

  it('#isSome', function() {
    expect(Some('value').isSome()).to.be.eql(true);
    expect(None().isSome()).to.be.eql(false);
    expect(Some(null).isSome()).to.be.eql(true);
  });

  it('#isNone', function() {
    expect(Some('value').isNone()).to.be.eql(false);
    expect(None().isNone()).to.be.eql(true);
    expect(Some(null).isNone()).to.be.eql(false);
  });

  it('#valueOrElse', function() {
    expect(Some('value').valueOrElse('default value')).to.be.eql('value');
    expect(Some(null).valueOrElse('default value')).to.be.eql(null);
    expect(None().valueOrElse('default value')).to.be.eql('default value');
  });
});