describe("Product page - cart functionality", () => {
    beforeEach(() => {
        cy.clearLocalStorage()
    })
    it("should disable add button when stock is zero or negative", () => {
        cy.visit('/#/products/3')
        cy.get("[data-cy='detail-product-stock']")
            .should('be.visible')
            .should(($el) => {
                const text = $el.text()
                expect(text).to.match(/-?\d+/)
            })
            .invoke('text')
            .then((text) => {
                const stock = parseInt(text.match(/-?\d+/)[0])
                expect(stock).to.be.lte(0)
            })

        cy.get("[data-cy='detail-product-add']").should('be.disabled')
    })

    it("should add product to cart when stock is available", () => {
        cy.visit('/#/login')
        cy.get("[data-cy='login-input-username']").type('test2@test.fr')
        cy.get("[data-cy='login-input-password']").type('testtest')
        cy.get("[data-cy='login-submit']").click()
        cy.url().should('not.include', '/login')
        cy.visit('/#/products/10')
        cy.get("[data-cy='detail-product-stock']")
            .should('be.visible')
            .should(($el) => {
                const text = $el.text()
                expect(text).to.match(/\d+/)
            })
            .invoke('text')
            .then((text) => {
                const stock = parseInt(text.match(/\d+/)[0])
                expect(stock).to.be.gt(0)
            })
        cy.get("[data-cy='detail-product-add']").click()
        cy.get("[data-cy='nav-link-cart']").click()
        cy.get("[data-cy='cart-line']").should('have.length.at.least', 1)
    })

    it("should decrease stock after adding product to cart", () => {
        cy.visit('/#/login')
        cy.get("[data-cy='login-input-username']").type('test2@test.fr')
        cy.get("[data-cy='login-input-password']").type('testtest')
        cy.get("[data-cy='login-submit']").click()
        cy.url().should('not.include', '/login')
        cy.visit('/#/products/10')
        cy.get("[data-cy='detail-product-stock']")
            .should('be.visible')
            .should(($el) => {
                const text = $el.text()
                expect(text).to.match(/\d+/)
            })
            .invoke('text')
            .then((text) => {
                const initialStock = parseInt(text.match(/\d+/)[0])
                cy.log('Stock initial:', initialStock)

                cy.get("[data-cy='detail-product-add']").click()

                cy.reload()
                cy.get("[data-cy='detail-product-stock']")
                    .should('be.visible')
                    .should(($el) => {
                        const text = $el.text()
                        expect(text).to.match(/\d+/)
                    })
                    .invoke('text')
                    .then((newText) => {
                        const newStock = parseInt(newText.match(/\d+/)[0])
                        cy.log('Nouveau stock:', newStock)
                        expect(newStock).to.equal(initialStock - 1)
                    })
            })
    })
    it("should not add to cart with negative quantity", () => {
        cy.visit('/#/login')
        cy.get("[data-cy='login-input-username']").type('test2@test.fr')
        cy.get("[data-cy='login-input-password']").type('testtest')
        cy.get("[data-cy='login-submit']").click()
        cy.url().should('not.include', '/login')
        cy.visit('/#/products/10')
        cy.get("[data-cy='detail-product-stock']")
            .should('be.visible')
            .should(($el) => {
                const text = $el.text()
                expect(text).to.match(/\d+/)
            })
            .invoke('text')
            .then((text) => {
                const initialStock = parseInt(text.match(/\d+/)[0])
                cy.log('Stock initial:', initialStock)
                cy.get("[data-cy='detail-product-quantity']").clear().type('-5')
                cy.get("[data-cy='detail-product-add']").click({ force: true })
                cy.reload()
                cy.get("[data-cy='detail-product-stock']")
                    .should('be.visible')
                    .should(($el) => {
                        const text = $el.text()
                        expect(text).to.match(/\d+/)
                    })
                    .invoke('text')
                    .then((newText) => {
                        const newStock = parseInt(newText.match(/\d+/)[0])
                        cy.log('Nouveau stock:', newStock)
                        expect(newStock).to.equal(initialStock)
                    })
            })
    })
    it("should add product to cart and verify via API", () => {
        const apiUrl = Cypress.env('apiUrl')
        cy.visit('/#/login')
        cy.get("[data-cy='login-input-username']").type('test2@test.fr')
        cy.get("[data-cy='login-input-password']").type('testtest')
        cy.get("[data-cy='login-submit']").click()
        cy.url().should('not.include', '/login')
        cy.window().then((win) => {
            const token = win.localStorage.getItem('user')
            cy.visit('/#/products/10')
            cy.get("[data-cy='detail-product-add']").click()
            cy.request({
                method: 'GET',
                url: `${apiUrl}orders`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.orderLines).to.have.length.at.least(1)
                cy.log('Produits dans le panier:', response.body.orderLines.length)
            })
        })
    })
})