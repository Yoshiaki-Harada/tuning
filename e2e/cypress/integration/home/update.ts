describe('ホーム画面  投稿編集用のテスト', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.get('#mat-input-0').type('update1@test.com')
        cy.get('#mat-input-1').type('test001')
        cy.get('#loginButton').click()
    })
    it('投稿を編集することができる', () => {
        cy.contains('編集用のポスト').parents('.post-item').find('[data-test=edit-button]').click()
        cy.get('#content').clear().type('編集済')
        cy.getBySel('save-button').click()
        cy.contains('編集済').should('be.visible')
    })
})