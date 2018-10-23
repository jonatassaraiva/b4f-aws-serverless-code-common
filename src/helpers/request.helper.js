'use strict';

const request = require('request');
const logger = require('../logger');

const hasIP = (customIP) => (customIP !== undefined && customIP !== '127.0.0.1' && customIP !== '::1');

const send = (optionsRequest, tag, customIP) => {
  const options = Object.assign(optionsRequest, {
    resolveWithFullResponse: true,
    time: true,
    json: true
  });

  if (hasIP(customIP)) {
    const headers = {};
    headers['X-Forwarded-For'] = customIP;
    headers['x-forwarded-for'] = customIP;
    headers['x-client-ip'] = customIP;
    headers['X-Client-Ip'] = customIP;
    headers['cf-connecting-ip'] = customIP;
    headers['forwarded-for'] = customIP;
    headers['x-forwarded'] = customIP;
    headers['x-cluster-client-ip'] = customIP;
    headers['x-real-ip'] = customIP;
    headers['true-client-ip'] = customIP;
    headers.HTTP_CLIENT_IP = customIP;
    headers.http_client_ip = customIP;
    headers.HTTP_X_FORWARDED_FOR = customIP;
    headers.http_x_forwarded_for = customIP;
    headers.HTTP_X_FORWARDED = customIP;
    headers.http_x_forwarded = customIP;
    headers.HTTP_FORWARDED_FOR = customIP;
    headers.http_forwarded_for = customIP;
    headers.HTTP_FORWARDED = customIP;
    headers.http_forwarded = customIP;
    headers.REMOTE_ADDR = customIP;
    headers.remote_addr = customIP;
    headers.ClientIP = customIP;
    headers.forwarded = customIP;

    if (options.headers) {
      Object.assign(options.headers, headers);
    } else {
      options.headers = headers;
    }
  }

  return new Promise((resolve, reject) => {
    request(options, (err, response) => {
      if (err) {
        return reject(err);
      }

      const requestTime = {
        tag,
        timeEnd: response.timings.end,
        uri: options.uri,
        href: response.request.href
      };
      logger.createMetric(new Date().getTime(), requestTime.tag, 'ms', Math.round(requestTime.timeEnd), tag);
      return resolve(response);
    });
  });
}

module.exports = {
  send
};
