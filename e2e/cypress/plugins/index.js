const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor')
const fs = require('fs');
const admin = require("firebase-admin");
const cypressFirebasePlugin = require("cypress-firebase").plugin

module.exports = (on, config) => {

  on('file:preprocessor', cypressTypeScriptPreprocessor)
  const extendedConfig = cypressFirebasePlugin(on, config, admin);
  // Add other plugins/tasks such as code coverage here
  on('task', {
    getFileNames(directoryPath) {
      return fs.readdirSync(directoryPath)
    }
  });
  on('task', {
    createUser(user) {
      return admin.auth().createUser(user);
    }
  });
  on('task', {
    clearUser(email) {
      return admin.auth().getUserByEmail(email)
        .then(user => {
          admin.auth().deleteUser(user.uid)
          return user.uid
        })
        .catch((error) => {
          console.log(error)
          return null;
        })
    }
  });
  return extendedConfig;
};