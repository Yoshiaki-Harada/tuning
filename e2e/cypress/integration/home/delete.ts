describe('ホーム画面 投稿削除用のテスト', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.get('#mat-input-0').type('delete1@test.com')
        cy.get('#mat-input-1').type('test001')
        cy.get('#loginButton').click()
    })
    it('自分の投稿を削除することができる', () => {
        cy.contains('削除用のポスト').parents('.post-item').find('[data-test=delete-box]').click()
        cy.getBySel('yes').click()
        cy.contains('削除用のポスト').should('not.exist')
    })
    it('自分の投稿以外は削除することができない', () => {
        cy.contains('test comment 1').parents('.post-item').find('[data-test=delete-box]').should('not.exist')
    })
})