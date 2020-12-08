import "firebase/firestore";

describe('hello world', () => {
    it('hello worldが表示される', () => {
        cy.visit('/');
        cy.get('.message').should('have.text', 'HELLO WORLD')
        cy.callFirestore('get', 'comments/TEST0001').then(comment => {
            console.log('comment: ');
            console.log(comment);
        })
    })
})