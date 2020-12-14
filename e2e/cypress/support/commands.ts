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

const fbConfig = {
  projectId: 'tuning-dev',
};

firebase.initializeApp(fbConfig);

firebase.firestore().settings({
  host: 'localhost:8080',
  ssl: false,
});

attachCustomCommands({ Cypress, cy, firebase });

before(() => {
  console.log('before test')
  cy.callFirestore("set", "comments/TEST0001", { content: 'test comment' });
});

export { }
