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
        cy.get('.posts .post-item .card-title').eq(0).text().should('eq', 'test comment 1')
        cy.get('.posts .post-item .card-title').eq(1).text().should('eq', 'test comment 2')
    })
    it('投稿することができる', () => {
        const content = 'post test content'
        cy.get('.post-form').get('input').type(content)
        cy.get('.add-post').click()
        cy.contains(content).should('be.visible')
    })
})