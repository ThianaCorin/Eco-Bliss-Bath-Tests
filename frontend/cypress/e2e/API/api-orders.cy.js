describe("Checks if API doesn't let a visitor add a product", () => {
    const apiUrl = Cypress.env('apiUrl')
    let authToken
    before(() => {
        cy.request({
            method: "POST",
            url: `${apiUrl}login`,
            body: {
                username: "test2@test.fr",
                password: "testtest"
            }
        }).then((response) => {
            authToken = response.body.token
        })
    })
    it("should prevent a visitor to add a product", () => {
        cy.request({
            method: "PUT",
            url: `${apiUrl}orders/add`,
            body: {
                "product": 2,
                "quantity": 1
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401)

        })
    })


    it("should let a connected user add a product", () => {
        cy.request({
            method: "PUT",
            url: `${apiUrl}orders/add`,
            headers: {
                Authorization: `Bearer ${authToken}`
            },
            body: {
                "product": 5,
                "quantity": 1
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.id).to.exist
        })
    })


})