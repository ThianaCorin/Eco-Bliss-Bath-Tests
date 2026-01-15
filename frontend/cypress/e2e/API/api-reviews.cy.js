describe("Checks if API returns reviews", () => {
    const apiUrl = Cypress.env('apiUrl')
    it("should return all reviews", () => {
        cy.request("GET", `${apiUrl}reviews`).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).not.to.be.empty
        })
    })

    it("let a user add a review", () => {
        cy.request({
            method: "POST",
            url: `${apiUrl}reviews`,
            headers: {
                Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3Njg1MDUxMzIsImV4cCI6MTc2ODUwODczMiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidGVzdDJAdGVzdC5mciJ9.L9wm5o7cei_yDPld40Et3eUoVDqUYgfbuowMWQc7Wo6iTROpNmG6UiByQDXgfmY6glrw3wG2lmLkqoiJ7mUPeoihHOJ8K-hYP-lw5enIime3bdaaE87DAMP1Y1UCoJ1_R0WooHSgiYe1FIwFeBUeZPxNGs0j2TnW0_xJ9ooJNKnzjxFREkTG3bHmz9jaZNneyvlMvKeF82_RMC_vmnVOt8jj7jX1UxJdCjLZYvASzYOxZTAQFcb68u9dqUZ3SL8kVK3y7rr_on69GEfFhUCapmtZURFy_SQMmq4I2-jVo0h_dmAGbUNoj5o49EDXjFdloI7bfsPMyLYyUb0aHKi6ow"
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