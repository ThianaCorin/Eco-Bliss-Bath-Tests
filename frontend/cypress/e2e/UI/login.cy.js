describe("Checks login process", () => {
    beforeEach(() => {
        cy.clearLocalStorage()
    })

    it("should login and store token if user entries correct id and password", () => {
        cy.visit('/#/login')
        cy.get("[data-cy='login-input-username']").type('test2@test.fr')
        cy.get("[data-cy='login-input-password']").type('testtest')
        cy.get("[data-cy='login-submit']").click()
        cy.url().should('include', '/#/')
        cy.should(() => {
            expect(localStorage.getItem('user')).to.not.be.null
        })
    })

    it("should show a message if user entries incorrect id and password", () => {
        cy.visit('/#/login')
        cy.get("[data-cy='login-input-username']").type('test2@test.fr')
        cy.get("[data-cy='login-input-password']").type('wrongpassword')
        cy.get("[data-cy='login-submit']").click()
        cy.get("[data-cy='login-errors']").should('exist')
        cy.url().should('include', '/#/login')
    })

    it("should not execute XSS script in login form", () => {
        cy.visit('/#/login')
        cy.get("[data-cy='login-input-username']").type('<script>alert("faille XSS");</script>')
        cy.get("[data-cy='login-input-password']").type('wrongpassword')
        cy.get("[data-cy='login-submit']").click()
        cy.get("[data-cy='login-errors']").should('exist')
        cy.url().should('include', '/#/login')
    })

})


