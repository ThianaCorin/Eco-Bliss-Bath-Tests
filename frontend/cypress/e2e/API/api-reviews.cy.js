describe("Checks if API returns reviews", () => {
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

    it("should return all reviews", () => {
        cy.request("GET", `${apiUrl}reviews`).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).not.to.be.empty
        })
    })

    it("should let a user add a review", () => {
        cy.request({
            method: "POST",
            url: `${apiUrl}reviews`,
            headers: {
                Authorization: `Bearer ${authToken}`
            },
            body: {
                "title": "Très bon produit",
                "comment": "J'adore son parfum",
                "rating": 5
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.rating).to.eq(5)
        })
    })
})