'use strict';

const enableLogError = () => (process.env.ENABLE_LOG_ERROR === 'true');
const enableLogInfo = () => (process.env.ENABLE_LOG_INFO === 'true');
const enableLogWarn = () => (process.env.ENABLE_LOG_WARN === 'true');

const error = (err, message) => {
  if (enableLogError()) {
    const customMessage = message || err.message;

    // eslint-disable-next-line no-console
    console.error(customMessage, err);
  }
}

const info = (message) => {
  if (enableLogInfo()) {
    // eslint-disable-next-line no-console
    console.info(message);
  }
}

const warn = (message) => {
  if (enableLogWarn()) {
    // eslint-disable-next-line no-console
    console.warn(message);
  }
}

/**
 *
 * @param {string} timestamp - is in milliseconds. Ex: new Date().getTime()
 * @param {string} metricName - uniquely identifies your metric. Ex: 'my.metric.name'
 * @param {string} metricType - is ms, s, min. Ex: 'ms'
 * @param {string} value - MUST be a number (i.e. integer or float). Ex: 1
 */
const createMetric = (timestamp, metricName, metricType, value, tag) => {
  const newMetric = `MONITORING timestamp: ${timestamp} metricName: ${metricName} metricType: ${metricType} value: ${value} tag: #${tag}`;
  // eslint-disable-next-line no-console
  console.log(newMetric);
};

module.exports = {
  error,
  info,
  warn,
  createMetric
};
