describe("Checks login API", () => {
    it("should login and return a token with valid credentials", () => {
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
    it("should return 401 with invalid credentials", () => {
        const apiUrl = Cypress.env('apiUrl')
        cy.request({
            method: "POST",
            url: `${apiUrl}login`,
            body: {
                username: "test2@test.fr",
                password: "wrongpassword"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401)
            expect(response.body.token).to.not.exist
        })
    })
})