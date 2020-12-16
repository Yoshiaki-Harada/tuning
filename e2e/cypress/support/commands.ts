import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import firebase from "firebase/app";
import { attachCustomCommands } from 'cypress-firebase/lib';

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      google(): Chainable<Window>;
      navigate(pageName: string): void;
    }
  }
}

firebase.initializeApp({
  apiKey: 'apikey',
  authDomain: 'tuning-dev.firebaseapp.com',
  projectId: 'tuning-dev',
  storageBucket: 'tuning-dev.appspot.com',
  messagingSenderId: 'messagingSenderId',
  appId: 'appId',
  measurementId: 'measurementId'
});

const firestoreEmulatorHost = Cypress.env("FIRESTORE_EMULATOR_HOST");
if (firestoreEmulatorHost) {
  firebase.firestore().settings({
    host: firestoreEmulatorHost,
    ssl: false,
  });
}

attachCustomCommands({ Cypress, cy, firebase });

before(() => {
  console.log('before test')
  cy.callFirestore("set", "comments/TEST0001", { content: 'test comment' });
});

export { }
