'use strict';

const bodyBuilder = require('./builders/body.builder');

const workaroundConfig = require('./configs/workaround.config');
const xRayConfig = require('./configs/xray.config');

const requestHelper = require('./helpers/request.helper');
const responseHelper = require('./helpers/response.helper');

const logger = require('./logger');

module.exports = {
  builders: {
    body: bodyBuilder
  },
  configs: {
    workaround: workaroundConfig,
    xRay: xRayConfig
  },
  helpers: {
    request: requestHelper,
    response: responseHelper
  },
  logger
};
