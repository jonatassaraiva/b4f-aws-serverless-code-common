'use strict';

const _getCacheControl = (cache, maxAge) => {
  const age = maxAge || maxAge === 0 ? maxAge : 300;
  if (cache === false || age === 0) {
    return 'private, max-age=0, no-cache, no-store, must-revalidate';
  }
  return `public, max-age=${age}`;
};

/**
 * Creates a basic response object
 * @param {Object} body - Response body
 * @param {Number} statusCode - Default = 200. Http status code of the response
 * @param {Number} cache - Default = true. Set if there will be cache in the cache control header
 * @param {Number} cacheMaxAge - Default = 300. Max age to set in the cache control header
 * @param {Object} headers - Default = {}. Headers to return in the response
 */
const baseResponse = (body, statusCode, cache, cacheMaxAge, headers) => {
  const response = {
    body,
    statusCode: statusCode || 200
  };
  response.headers = {
    ...headers,
    'Cache-Control': _getCacheControl(cache, cacheMaxAge)
  };
  return response;
};

module.exports = {
  baseResponse
};
