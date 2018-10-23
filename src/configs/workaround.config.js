'use strict';

const Promise = require('bluebird');

const workaroundXRayFunc = (handler) => {
  return (event, context, callback) => {
    Promise.resolve(handler(event, context)).asCallback(callback);
  };
};

/**
* https://github.com/aws/aws-xray-sdk-node/issues/27#issuecomment-395818547
* Use callback. Yeah, maybe it sounds ugly. But will work without having any issues.
*/
const wrap = () => {
  return ({
    before: (handler, next) => {
      workaroundXRayFunc(handler);
      next();
    }
  });
};

module.exports = {
  wrap
};
