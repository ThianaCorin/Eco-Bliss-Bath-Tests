describe("API Orders", () => {
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

    it("should return 401 when accessing cart without authentication", () => {
        cy.request({
            method: "GET",
            url: `${apiUrl}orders`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401)
        })
    })

    it("should return cart contents for authenticated user", () => {
        cy.request({
            method: "GET",
            url: `${apiUrl}orders`,
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.exist
        })
    })

    it("should prevent a visitor from adding a product", () => {
        cy.request({
            method: "PUT",
            url: `${apiUrl}orders/add`,
            body: {
                "product": 6,
                "quantity": 1
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401)
        })
    })

    it("should let an authenticated user add a product", () => {
        cy.request({
            method: "PUT",
            url: `${apiUrl}orders/add`,
            headers: {
                Authorization: `Bearer ${authToken}`
            },
            body: {
                "product": 6,
                "quantity": 1
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.id).to.exist
        })
    })

})