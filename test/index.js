'use strict';

const Lab = require('lab');
const code = require('code');

const BaseJoi = require('joi');
const Extension = require('../');
const Joi = BaseJoi.extend(Extension);

const lab = exports.lab = Lab.script();
const { expect } = code;
const { it, describe } = lab;

const schema = Joi.custom().integerList();

describe('joi-integerlist-validator', () => {
  it('should succeed when a valid segment list is provided', () => {
    const result = schema.validate('1,2,3');
    expect(result.error).to.be.null();
  });

  it('should succeed when a single valid segment id is provided', () => {
    const result = schema.validate('1');
    expect(result.error).to.be.null();
  });

  it('should fails when an negative segment id is provided', () => {
    const result = schema.validate('1,-2,3');
    expect(result.error).not.to.be.null();
  });

  it('should fails when an invalid segment list is provided', () => {
    const result = schema.validate('abc');
    expect(result.error).not.to.be.null();
  });

  it('should fails when an empty segment list is provided', () => {
    const result = schema.validate('');
    expect(result.error).not.to.be.null();
  });
});
