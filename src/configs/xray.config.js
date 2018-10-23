'use strict';

const enableXray = () => (process.env.ENABLE_XRAY === 'true');

const init = () => {
  if(enableXray()) {
    const xray = require('aws-xray-sdk');
    xray.captureHTTPsGlobal(require('http'));
    xray.captureAWS(require('aws-sdk'));
  }
}

module.exports = {
  init
};
