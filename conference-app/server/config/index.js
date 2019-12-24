module.exports = {
  development: {
    sitename: 'Roux Meetups [Development]',
    serviceRegistryUrl: process.env.REGISTRY_HOST || 'http://localhost:3000',
    serviceVersionIdentifier: '0.1.x',
  },
  production: {
    sitename: 'Roux Meetups',
    serviceRegistryUrl: process.env.REGISTRY_HOST || 'http://localhost:3000',
    serviceVersionIdentifier: '0.1.x',
  },
};
