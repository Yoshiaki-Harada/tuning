import "firebase/firestore";

describe('ホーム画面', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.get('#mat-input-0').type('test1@test.com')
        cy.get('#mat-input-1').type('test001')
        cy.get('#loginButton').click()
    })
    it('ヘッダーにホームが表示される', () => {
        cy.get('.header .home').should('be.visible')
    })
    it('投稿の一覧が表示される', () => {
        cy.contains('test comment 1').should('be.visible')
        cy.contains('test comment 2').should('be.visible')
    })
})