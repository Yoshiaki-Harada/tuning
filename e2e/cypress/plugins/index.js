const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor')
const fs = require('fs');
const admin = require("firebase-admin");
const cypressFirebasePlugin = require("cypress-firebase").plugin

module.exports = (on, config) => {

  on('file:preprocessor', cypressTypeScriptPreprocessor)
  const extendedConfig = cypressFirebasePlugin(on, config, admin);

  // Add other plugins/tasks such as code coverage here
  on('task', {
    getFileNames (directoryPath) {
      return fs.readdirSync(directoryPath)
    }
  })
  return extendedConfig;
};