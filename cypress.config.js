const { defineConfig } = require('cypress');

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:8080',
    // baseUrl: 'http://150.165.75.99:8080',
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
