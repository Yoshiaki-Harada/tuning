import "firebase/firestore";


describe('ホーム画面', () => {
    it.skip('投稿の一覧が表示される', () => {
        cy.visit('/');
        cy.get('.posts').first().should('have.text', 'テスト用の投稿')
    })
})