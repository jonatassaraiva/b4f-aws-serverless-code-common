
'use strict';

const logger = require('../logger');

const getCacheControl = (maxAge) => {
  const age = maxAge || maxAge === 0 ? maxAge : 300;
  if (age === 0) {
    return 'private, max-age=0, no-cache, no-store, must-revalidate';
  }
  return `public, max-age=${age}`;
};

const createResponseJSON = (body, headers, statusCode = 200) => {
  const mergeHeaders = { ...headers, 'Content-Type': 'application/json; charset=utf-8' };
  return {
    statusCode,
    headers: mergeHeaders,
    body: JSON.stringify(body)
  };
};

const success = (body, context, statusCode, cacheMaxAge = 0, headers = {}) => {
  const newBody = {
    data: body,
    requestId: context.awsRequestId
  };

  const headersWithCacheControl = {
    ...headers,
    'Cache-Control': getCacheControl(cacheMaxAge)
  };

  return createResponseJSON(newBody, headersWithCacheControl, statusCode);
};

const error = (err, context, headers = {}) => {
  logger.error(err);
  const { httpStatusCode, message } = err;
  const statusCode = httpStatusCode || 500;
  const body = {
    error: {
      httpStatusCode: statusCode,
      message
    },
    requestId: context.awsRequestId
  };

  const headersWithCacheControl = {
    ...headers,
    'Cache-Control': 'private, max-age=0, no-cache, no-store, must-revalidate'
  };

  return createResponseJSON(body, headersWithCacheControl, statusCode);
}

module.exports = {
  success,
  error
};
