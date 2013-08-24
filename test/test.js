'use strict';

var Some = require('../lib/option').Some;
var None = require('../lib/option').None;
var expect = require('expect.js');

describe('Option', function() {
  it('#valueOf', function() {
    expect(Some('value').valueOf()).to.be.eql('value');
    expect(None().valueOf()).to.be.eql(null);
  });
});