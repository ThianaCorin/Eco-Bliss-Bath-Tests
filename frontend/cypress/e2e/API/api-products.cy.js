describe("Checks if API returns products", () => {
    const apiUrl = Cypress.env('apiUrl')
    it("should return all products list", () => {
        cy.request("GET", `${apiUrl}products`).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).not.to.be.empty
        })
    })
})

// A faire ultérieurement
// it("should return a random product", () => {
//  })
//     it("should return one product by its id", () => {
//          })