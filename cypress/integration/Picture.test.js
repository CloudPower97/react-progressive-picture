describe('Picture', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should fade in the image when it enters the viewport', () => {
    cy.get('#multiple-effects-image img').should('have.css', 'filter', 'none')
  })

  it('should render the placeholder if the src is broken', () => {
    cy.get('#broken-image img')
      .scrollIntoView()
      .should('have.css', 'filter', 'blur(10px) grayscale(1) opacity(1)')
  })

  it('should render the image after a custom delay', () => {
    cy.get('#delay-image img')
      .scrollIntoView()
      .should('have.css', 'filter', 'none')
  })

  it('should render the image only if the specified threshold is met', () => {
    const image = '#treshold-image img'

    cy.scrollTo(0, Cypress.config().viewportHeight * 5 + Cypress.config().viewportHeight / 2)
      .get(image)
      .should('have.css', 'filter', 'blur(10px) grayscale(0) opacity(1)')

    cy.scrollTo('bottom')
      .get(image)
      .should('have.css', 'filter', 'none')
  })
})
