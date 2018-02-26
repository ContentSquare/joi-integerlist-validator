'use strict';

const Joi = require('joi');

const integerItemValidationSchema = Joi.number().integer().invalid(0);

const NewJoi = {
  base: Joi.any(),
  name: 'custom',
  language: {
    function: 'didn\'t validate properly',
    integerList: 'is not a valid list of Integers',
  },
  rules: [{
    name: 'function',
    params: {
      validationFunction: Joi.func().required(),
    },
    validate(params, value, state, options) {
      if (!params.validationFunction(value)) {
        return this.createError('custom.function', { v: value }, state, options);
      }
      return value;
    },
  }, {
    name: 'integerList',
    validate(params, value, state, options) {
      if (!value) {
        return this.createError('custom.integerList', { v: value }, state, options);
      }

      const list = value.split(',');
      const isOk = list.length >= 1 && !list.some(i => isNaN(i) || integerItemValidationSchema.validate(i).error);

      if (!isOk) {
        return this.createError('custom.integerList', { v: value }, state, options);
      }

      return value;
    },
  }],
};

module.exports = NewJoi;
