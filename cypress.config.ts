import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://training-frontend-angular.s3-website-eu-west-1.amazonaws.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
