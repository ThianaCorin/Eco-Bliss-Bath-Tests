describe("Checks if API doesn't let a visitor add a product", () => {
    const apiUrl = Cypress.env('apiUrl')
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
                Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3Njg1MDUxMzIsImV4cCI6MTc2ODUwODczMiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidGVzdDJAdGVzdC5mciJ9.L9wm5o7cei_yDPld40Et3eUoVDqUYgfbuowMWQc7Wo6iTROpNmG6UiByQDXgfmY6glrw3wG2lmLkqoiJ7mUPeoihHOJ8K-hYP-lw5enIime3bdaaE87DAMP1Y1UCoJ1_R0WooHSgiYe1FIwFeBUeZPxNGs0j2TnW0_xJ9ooJNKnzjxFREkTG3bHmz9jaZNneyvlMvKeF82_RMC_vmnVOt8jj7jX1UxJdCjLZYvASzYOxZTAQFcb68u9dqUZ3SL8kVK3y7rr_on69GEfFhUCapmtZURFy_SQMmq4I2-jVo0h_dmAGbUNoj5o49EDXjFdloI7bfsPMyLYyUb0aHKi6ow"
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