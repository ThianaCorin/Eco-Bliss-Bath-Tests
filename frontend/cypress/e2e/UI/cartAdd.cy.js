describe("Check stock decrease after adding product to cart", () => {
    const productId = 10

    const login = () => {
        cy.clearLocalStorage()
        cy.clearCookies()

        cy.intercept("POST", "**/login").as("login")

        cy.visit("/#/login")
        cy.get("[data-cy='login-input-username']").type("test2@test.fr")
        cy.get("[data-cy='login-input-password']").type("testtest")
        cy.get("[data-cy='login-submit']").click()

        cy.wait("@login")
        cy.url().should("not.include", "/login")
    }

    const emptyCart = () => {
        cy.intercept("DELETE", "**/orders/*/delete").as("deleteItem")

        cy.visit("/#/cart")

        cy.get("body").then(($body) => {
            if ($body.find("[data-cy='cart-line']").length > 0) {
                const deleteButtons = $body.find("[data-cy='cart-line-delete']")
                const count = deleteButtons.length

                for (let i = 0; i < count; i++) {
                    cy.get("[data-cy='cart-line-delete']").first().click()
                    cy.wait("@deleteItem")
                }

                cy.get("[data-cy='cart-line']").should("not.exist")
            }
        })
    }

    it("should decrease stock after adding product to cart", () => {
        cy.intercept("GET", `**/products/${productId}`).as("getProduct")
        cy.intercept("PUT", "**/orders/add").as("addToCart")

        login()
        emptyCart()

        cy.visit(`/#/products/${productId}`)
        cy.wait("@getProduct")
        cy.get("[data-cy='detail-product-name']").should("be.visible")

        cy.get("[data-cy='detail-product-stock']")
            .should("be.visible")
            .invoke("text")
            .should("match", /\d+/)
            .then((text) => {
                const initialStock = parseInt(text.match(/\d+/)[0])

                cy.get("[data-cy='detail-product-add']")
                    .should("be.visible")
                    .should("not.be.disabled")
                    .click()

                cy.wait("@addToCart")

                cy.visit(`/#/products/${productId}`)
                cy.wait("@getProduct")
                cy.get("[data-cy='detail-product-name']").should("be.visible")

                cy.get("[data-cy='detail-product-stock']")
                    .should("be.visible")
                    .invoke("text")
                    .should("match", /\d+/)
                    .then((newText) => {
                        const newStock = parseInt(newText.match(/\d+/)[0])
                        expect(newStock).to.eq(initialStock - 1)
                    })
            })
    })
})