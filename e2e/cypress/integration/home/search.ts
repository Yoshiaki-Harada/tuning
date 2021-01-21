describe('ホーム画面', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.get('#mat-input-0').type('test1@test.com')
        cy.get('#mat-input-1').type('test001')
        cy.get('#loginButton').click()
    })
    it('ヘッダーの検索ボックスで検索することができる', () => {
        cy.getBySel('search-form').type('test')
        cy.getBySel('search').click()
        cy.contains('test comment 1').should('be.visible')
        cy.contains('test comment 2').should('be.visible')
    })
})