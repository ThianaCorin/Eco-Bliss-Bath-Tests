describe("Checks if API returns products", () => {
    it("should return all products list", () => {
        const apiUrl = Cypress.env('apiUrl')
        cy.request("GET", `${apiUrl}products`).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).not.to.be.empty
        })
    })

    it("should return a random product", () => {
        const apiUrl = Cypress.env('apiUrl')
        cy.request("GET", `${apiUrl}products/random`).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).not.to.be.empty
        })
    })

    it("should return one product by its id", () => {
        const apiUrl = Cypress.env('apiUrl')
        cy.request("GET", `${apiUrl}products/3`).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).not.to.be.empty
        })
    })
})


