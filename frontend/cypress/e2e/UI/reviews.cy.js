describe("XSS protection on reviews", () => {

    const apiUrl = Cypress.env("apiUrl")

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

    it("should not execute XSS script in review comment", () => {
        login()

        cy.intercept("POST", "**/reviews").as("postReview")
        cy.intercept("GET", "**/reviews").as("getReviews")

        cy.on("window:alert", () => {
            throw new Error("XSS detected: alert was triggered")
        })

        cy.visit("/#/reviews")

        cy.wait("@getReviews")

        cy.get("[data-cy='review-input-rating-images'] img", { timeout: 10000 })
            .eq(4)
            .click()

        cy.get("[data-cy='review-input-title']").type("Parfum de vacances")
        cy.get("[data-cy='review-input-comment']")
            .type('<script>alert("faille XSS");</script>')

        cy.get("[data-cy='review-submit']").click()

        cy.wait("@postReview")
    })

    it("should not execute XSS script in review title", () => {
        login()

        cy.intercept("POST", "**/reviews").as("postReview")
        cy.intercept("GET", "**/reviews").as("getReviews")

        cy.on("window:alert", () => {
            throw new Error("XSS detected: alert was triggered")
        })

        cy.visit("/#/reviews")

        cy.wait("@getReviews")

        cy.get("[data-cy='review-input-rating-images'] img", { timeout: 10000 })
            .eq(4)
            .click()

        cy.get("[data-cy='review-input-title']")
            .type('<script>alert("faille XSS");</script>')
        cy.get("[data-cy='review-input-comment']").type("Bonne odeur de pluie")

        cy.get("[data-cy='review-submit']").click()

        cy.wait("@postReview")

        cy.visit("/#/reviews")

        cy.wait("@getReviews")

        cy.get("[data-cy='review-title']")
            .should("not.contain.text", "script")
    })
})
