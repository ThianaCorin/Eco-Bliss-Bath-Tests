import { faker } from '@faker-js/faker'

describe("Checks register API", () => {
    it("should let a visitor create an account", () => {
        const apiUrl = Cypress.env('apiUrl')
        const user = {
            email: faker.internet.email(),
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            plainPassword: faker.internet.password({ length: 10 })
        }

        cy.request({
            method: "POST",
            url: `${apiUrl}register`,
            body: user
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.exist
        })
    })
})