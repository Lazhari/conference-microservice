const bunyan = require('bunyan');
// Load package.json
const pjs = require('../../package.json');

// Get some meta info from the package.json
const { name, version } = pjs;

// Set up a logger
const getLogger = (serviceName, serviceVersion, level) =>
  bunyan.createLogger({ name: `${serviceName}:${serviceVersion}`, level });

module.exports = {
  development: {
    sitename: 'Roux Meetups [Development]',
    serviceRegistryUrl: process.env.REGISTRY_HOST || 'http://localhost:3000',
    serviceVersionIdentifier: '0.1.x',
    log: () => getLogger(name, version, 'debug'),
  },

  production: {
    sitename: 'Roux Meetups',
    serviceRegistryUrl: process.env.REGISTRY_HOST || 'http://localhost:3000',
    serviceVersionIdentifier: '0.1.x',
    log: () => getLogger(name, version, 'info'),
  },
};
