describe('tax rates', () => {
  beforeEach(() => {
    cy.visit('/admin');
    cy.get('[id="_username"]').type('sylius');
    cy.get('[id="_password"]').type('sylius');
    cy.get('.primary').click();
  });

  it('validate filter applied through cancel button', () => {
    // Click in tax rates in side menu
    cy.clickInFirst('a[href="/admin/tax-rates/"]');
    // Type in value input to search for specify tax rate
    cy.get('[id="criteria_search_value"]').type('7');
    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();
    // Click in edit of the last tax rate
    cy.get('*[class^="ui labeled icon button "]').last().click();
    // Click on cancel button
    cy.get('.admin-layout__content > .ui > .ui > .ui > .ui:nth-child(2)').click();

    // Assert that we are back to the listing page with the filter applied
    cy.get('body').should('contain', 'Sales Tax 7%').and('not.contain', 'Sales Tax 20%');
  });

  it('validate if tax rate can be created through create button with only necessary fields', () => {
    // Click in tax rates in side menu
    cy.clickInFirst('a[href="/admin/tax-rates/"]');

    // Click in create button
    cy.get('*[class^="ui labeled icon button  primary"]').click();

    // Type the code
    cy.get('[id="sylius_tax_rate_code"]').type('1212');

    // Type the Name
    cy.get('[id="sylius_tax_rate_name"]').type('Everton Tax 19%');

    // Select Category Criteria
    cy.get('[id="sylius_tax_rate_category"]').select('clothing');

    // Select Zone
    cy.get('[id="sylius_tax_rate_zone"]').select('US');

    // Select Calculator
    cy.get('[id="sylius_tax_rate_calculator"]').select('decimal');

    // Type the tax rate amount
    cy.get('[id="sylius_tax_rate_amount"]').type('19');

    // Fill in the start date and time
    cy.get('#sylius_tax_rate_startDate_date').type('2023-01-01');
    cy.get('#sylius_tax_rate_startDate_time').type('09:00');

    // Fill in the end date and time
    cy.get('#sylius_tax_rate_endDate_date').type('2023-12-31');
    cy.get('#sylius_tax_rate_endDate_time').type('12:00');

    // Click in create button
    cy.get('*[class^="ui labeled icon primary button"]').click();

    // Assert that success message is shown
    cy.get('*[class^="ui icon positive message sylius-flash-message"]').should('contain', 'Success');
  });

  it('validate if form fails if trying to create the same object', () => {
    // Click in tax rates in side menu
    cy.clickInFirst('a[href="/admin/tax-rates/"]');

    // Click in create button
    cy.get('*[class^="ui labeled icon button  primary"]').click();

    // Type the code
    cy.get('[id="sylius_tax_rate_code"]').type('1212');

    // Type the Name
    cy.get('[id="sylius_tax_rate_name"]').type('Everton Tax 19%');

    // Select Category Criterea
    cy.get('[id="sylius_tax_rate_category"]').select('clothing');

    // Select Zone
    cy.get('[id="sylius_tax_rate_zone"]').select('US');

    // Select Calculator
    cy.get('[id="sylius_tax_rate_calculator"]').select('decimal');

    // Type the tax rate amount
    cy.get('[id="sylius_tax_rate_amount"]').type('19');

    // Click in create button
    cy.get('*[class^="ui labeled icon primary button"]').click();

    cy.get('*[class^="ui icon negative message"]').should('contain', 'Error');
  });

  it('validate if cancel button works when creating', () => {
    // Click in tax rates in side menu
    cy.clickInFirst('a[href="/admin/tax-rates/"]');

    // Click in create button
    cy.get('*[class^="ui labeled icon button  primary"]').click();

    // Type the code
    cy.get('[id="sylius_tax_rate_code"]').type('1212');

    // Type the Name
    cy.get('[id="sylius_tax_rate_name"]').type('Everton Tax 19%');

    // Select Category Criterea
    cy.get('[id="sylius_tax_rate_category"]').select('clothing');

    // Select Zone
    cy.get('[id="sylius_tax_rate_zone"]').select('US');

    // Select Calculator
    cy.get('[id="sylius_tax_rate_calculator"]').select('decimal');

    // Type the tax rate amount
    cy.get('[id="sylius_tax_rate_amount"]').type('19');

    // Click in Cancel button
    cy.contains('button, a', 'Cancel').click();

    cy.get('*[class^="content"]').should('contain', 'Tax Rates');
  });

  it('validate if an existing tax rate can be edited', () => {
    // Click in tax rates in side menu
    cy.clickInFirst('a[href="/admin/tax-rates/"]');

    // Type in value input to search for specific tax rate
    cy.get('[id="criteria_search_value"]').type('7');

    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();

    // Click in Edit button
    cy.contains('button, a', 'Edit').click();

    // Change the tax rate name
    cy.get('[id="sylius_tax_rate_name"]').clear().type('Updated Clothing Sales Tax 7%');

    // Click on save button
    cy.get('*[class^="ui labeled icon primary button"]').click();

    // Assert that success message is shown
    cy.get('*[class^="ui icon positive message sylius-flash-message"]').should('contain', 'Success');

    cy.get('body').should('contain', 'Updated Clothing Sales Tax 7%');
  });

  it('validate filter by date range', () => {
    cy.clickInFirst('a[href="/admin/tax-rates/"]');

    // Set date range
    cy.get('[id="criteria_startDate_from_date"]').type('2023-01-01');
    cy.get('[id="criteria_startDate_to_date"]').type('2023-12-31');

    // Apply filter
    cy.get('*[class^="ui blue labeled icon button"]').click();

    // Assert filtered results are within the specified date range
    cy.get('body').should('contain', 'Everton Tax 19%');
  });

  it('edit tax rate and verify changes', () => {
    cy.clickInFirst('a[href="/admin/tax-rates/"]');

    cy.get('[id="criteria_search_value"]').type('7');
    cy.get('*[class^="ui blue labeled icon button"]').click();

    // Click Edit
    cy.contains('button, a', 'Edit').click();

    // Update the tax rate name
    cy.get('[id="sylius_tax_rate_name"]').clear().type('Updated Tax 9%');

    // Save changes
    cy.get('*[class^="ui labeled icon primary button"]').click();

    cy.get('body').should('contain', 'Updated Tax 7%');
  });

  it('try to delete a tax rate and cancel', () => {
    cy.clickInFirst('a[href="/admin/tax-rates/"]');
    cy.get('[id="criteria_search_value"]').type('7');
    cy.get('*[class^="ui blue labeled icon button"]').click();

    // Click delete button
    cy.get('button.ui.red.labeled.icon.button').not('[disabled]').click();

    // Click cancel instead of confirm
    cy.get('*[class^="ui red basic cancel inverted button"]').click();

    // Assert that the tax rate is still visible
    cy.get('body').should('contain', 'Updated Tax 9%');
  });

  it('validate filtering by invalid date range shows no results', () => {
    cy.clickInFirst('a[href="/admin/tax-rates/"]');

    // Set an invalid date range (end before start)
    cy.get('[id="criteria_startDate_from_date"]').type('2023-12-31');
    cy.get('[id="criteria_startDate_to_date"]').type('2023-01-01');

    // Apply filter
    cy.get('*[class^="ui blue labeled icon button"]').click();

    // Assert no results are shown
    cy.get('body').should('contain', 'There are no results to display');
  });

  it('Validate if delete button is working', () => {
    // Click in tax rates in side menu
    cy.clickInFirst('a[href="/admin/tax-rates/"]');

    // Type in value input to search for specify tax rate
    cy.get('[id="criteria_search_value"]').type('19');

    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();

    // Click in the delete button
    cy.get('button.ui.red.labeled.icon.button').not('[disabled]').click();

    // Click the confirmation
    cy.get('[id="confirmation-button"]').click();

    // Type in value input to search for specify tax rate
    cy.get('[id="criteria_search_value"]').type('19');

    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();

    cy.get('body').should('not.contain', 'Everton Tax 19%');
  });
});