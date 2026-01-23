describe("Cart - prevent adding out-of-stock product", () => {
    const apiUrl = Cypress.env("apiUrl")

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

    it("should NOT add out-of-stock product to cart", () => {
        const productId = 4

        login()

        cy.intercept('GET', '**/products/4').as('getProduct')
        cy.intercept('PUT', '**/orders/add').as('addToCart')

        getToken().then((token) => {
            cy.visit(`/#/products/${productId}`)

            cy.wait('@getProduct')

            cy.get("[data-cy='detail-product-name']").should('be.visible')

            cy.get("[data-cy='detail-product-quantity']")
                .should("be.visible")
                .clear()
                .type("2")

            cy.get("[data-cy='detail-product-add']")
                .should('be.visible')
                .click()

            cy.wait('@addToCart')

            cy.request({
                method: "GET",
                url: `${apiUrl}orders`,
                headers: { Authorization: `Bearer ${token}` },
            }).then((res) => {
                const line = res.body.orderLines?.find(
                    (l) => l.product.id === productId
                )

                expect(line).to.not.exist
            })
        })
    })
})