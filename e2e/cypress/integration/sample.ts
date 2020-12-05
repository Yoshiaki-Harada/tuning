import { eq } from "cypress/types/lodash";

describe('hello world', () => {
    it('hello worldが表示される', () => {
        cy.visit('/');
        cy.get('.message').should('have.text', 'hello world')
    })
})