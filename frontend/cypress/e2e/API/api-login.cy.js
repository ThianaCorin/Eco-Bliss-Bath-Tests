describe("Checks login API", () => {
    it("should login and return a token", () => {
        const apiUrl = Cypress.env('apiUrl')
        cy.request({
            method: "POST",
            url: `${apiUrl}login`,
            body: {
                username: "test2@test.fr",
                password: "testtest"
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.token).to.exist
        })
    })
})