describe('ホーム画面  投稿作成用のテスト', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.get('#mat-input-0').type('add1@test.com')
        cy.get('#mat-input-1').type('test001')
        cy.get('#loginButton').click()
    })
    it('投稿することができる', () => {
        const content = 'post test content'
        cy.get('.post-form').find('input').type(content)
        cy.get('.add-post').click()
        cy.contains(content).should('be.visible')
    })
})