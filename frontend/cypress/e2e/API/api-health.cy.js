describe("Checks if API is corrected", () => {
    it("should return code 200", () => {
        const apiUrl = Cypress.env('apiUrl')
        cy.request("GET", `${apiUrl}api/health`).then((response) => {
            expect(response.status).to.eq(200)
        })
    })
})     