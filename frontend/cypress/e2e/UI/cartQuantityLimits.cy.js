describe("Cart - prevent adding more than 20 items", () => {
    const apiUrl = Cypress.env("apiUrl")
    const productId = 8

    const login = () => {
        cy.clearLocalStorage()
        cy.clearCookies()
        cy.visit("/#/login")
        cy.get("[data-cy='login-input-username']").type("test2@test.fr")
        cy.get("[data-cy='login-input-password']").type("testtest")
        cy.get("[data-cy='login-submit']").click()
        cy.url().should("not.include", "/login")
    }

    const getToken = () => {
        return cy.window().then((win) => win.localStorage.getItem("user"))
    }

    it("should NOT allow adding more than 20 items of the same product", () => {
        login()

        cy.intercept('GET', `**/products/${productId}`).as('getProduct')
        cy.intercept('PUT', '**/orders/add').as('addToCart')

        getToken().then((token) => {
            cy.request({
                method: "GET",
                url: `${apiUrl}orders`,
                headers: { Authorization: `Bearer ${token}` },
            }).then((res) => {
                if (res.body.orderLines?.length) {
                    res.body.orderLines.forEach((line) => {
                        cy.request({
                            method: "DELETE",
                            url: `${apiUrl}orders/${line.id}/delete`,
                            headers: { Authorization: `Bearer ${token}` },
                        })
                    })
                }
            })

            cy.visit(`/#/products/${productId}`)
            cy.wait('@getProduct')
            cy.get("[data-cy='detail-product-name']").should('be.visible')

            cy.get("[data-cy='detail-product-quantity']")
                .should("be.visible")
                .clear()
                .type("25")

            cy.get("[data-cy='detail-product-add']")
                .should("be.visible")
                .click()

            cy.wait('@addToCart')

            cy.request({
                method: "GET",
                url: `${apiUrl}orders`,
                headers: { Authorization: `Bearer ${token}` },
            }).then((finalRes) => {
                const line = finalRes.body.orderLines?.find(
                    (l) => l.product.id === productId
                )

                expect(line.quantity).to.be.at.most(20)
            })
        })
    })
})