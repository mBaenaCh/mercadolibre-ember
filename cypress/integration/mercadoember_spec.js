describe('Search action test', () => {
    it('Galaxy buds plus search', () => {
        cy.visit('/')
        cy.get('input').type('galaxy buds plus');
        cy.get('button:first').click();
        cy.contains('Ver mas').click();
    })
})