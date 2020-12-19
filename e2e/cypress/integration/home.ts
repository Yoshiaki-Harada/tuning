import "firebase/firestore";


describe('ホーム画面', () => {
    it('投稿の一覧が表示される', () => {
        cy.visit('/');
        cy.get('.posts .post-item').eq(0).text().should('eq', 'test comment 1')
        cy.get('.posts .post-item').eq(1).text().should('eq', 'test comment 2')
    })
})