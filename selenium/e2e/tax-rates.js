const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('tax rates', () => {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('firefox').build();
  });

  after(async () => {
    await driver.quit();
  });

  beforeEach(async () => {
    driver.manage().deleteAllCookies();
    await driver.get('http://localhost:8080/admin');
    // await driver.get('http://150.165.75.99:8080/admin');
    await driver.findElement(By.id('_username')).sendKeys('sylius');
    await driver.findElement(By.id('_password')).sendKeys('sylius');
    await driver.findElement(By.css('.primary')).click();
    // await driver.sleep(1000);
  });

  // Remove .only and implement others test cases!
  it('validate filter applied through cancel button', async () => {
    // Click in tax rates in side menu
    await driver.findElement(By.linkText('Tax rates')).click();

    // Type in value input to search for specify tax rate
    await driver.findElement(By.id('criteria_search_value')).sendKeys('7');

    // Click in filter blue button
    await driver
      .findElement(By.css('*[class^="ui blue labeled icon button"]'))
      .click();

    // Click in edit of the last tax rate
    const buttons = await driver.findElements(
      By.css('*[class^="ui labeled icon button "]')
    );
    await buttons[buttons.length - 1].click();

    // Click on cancel button
    await driver
      .findElement(
        By.css('.admin-layout__content > .ui > .ui > .ui > .ui:nth-child(2)')
      )
      .click();

    // Assert that we are back to the listing page with the filter applied
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Clothing Sales Tax 7%'));
    assert(!bodyText.includes('Sales Tax 20%'));
  });

  it('validate if tax rate can be created through create button with only necessary fields', async () => {
    // Click in tax rates in side menu
    await driver.findElement(By.css('a[href="/admin/tax-rates/"]')).click();

    // Click in create button
    await driver
      .findElement(By.css('*[class^="ui labeled icon button  primary"]'))
      .click();

    // Type the code
    await driver.findElement(By.id('sylius_tax_rate_code')).sendKeys('1212');

    // Type the Name
    await driver
      .findElement(By.id('sylius_tax_rate_name'))
      .sendKeys('Everton Tax 19%');

    // Select Category Criteria
    await driver
      .findElement(By.id('sylius_tax_rate_category'))
      .sendKeys('clothing');

    // Select Zone
    await driver.findElement(By.id('sylius_tax_rate_zone')).sendKeys('US');

    // Select Calculator
    await driver
      .findElement(By.id('sylius_tax_rate_calculator'))
      .sendKeys('decimal');

    // Type the tax rate amount
    await driver.findElement(By.id('sylius_tax_rate_amount')).sendKeys('19');

    // Fill in the start date and time
    await driver
      .findElement(By.css('#sylius_tax_rate_startDate_date'))
      .sendKeys('2023-01-01');
    await driver
      .findElement(By.css('#sylius_tax_rate_startDate_time'))
      .sendKeys('09:00');

    // Fill in the end date and time
    await driver
      .findElement(By.css('#sylius_tax_rate_endDate_date'))
      .sendKeys('2023-12-31');
    await driver
      .findElement(By.css('#sylius_tax_rate_endDate_time'))
      .sendKeys('12:00');

    // Click in create button
    await driver
      .findElement(By.css('*[class^="ui labeled icon primary button"]'))
      .click();

    // Assert that success message is shown
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Success'));
  });

  it('validate if form fails if trying to create the same object', async () => {
    // Click in tax rates in side menu
    await driver.findElement(By.css('a[href="/admin/tax-rates/"]')).click();

    // Click in create button
    await driver
      .findElement(By.css('*[class^="ui labeled icon button  primary"]'))
      .click();

    // Type the code
    await driver.findElement(By.id('sylius_tax_rate_code')).sendKeys('1212');

    // Type the Name
    await driver
      .findElement(By.id('sylius_tax_rate_name'))
      .sendKeys('Everton Tax 19%');

    // Select Category Criteria
    await driver
      .findElement(By.id('sylius_tax_rate_category'))
      .sendKeys('clothing');

    // Select Zone
    await driver.findElement(By.id('sylius_tax_rate_zone')).sendKeys('US');

    // Select Calculator
    await driver
      .findElement(By.id('sylius_tax_rate_calculator'))
      .sendKeys('decimal');

    // Type the tax rate amount
    await driver.findElement(By.id('sylius_tax_rate_amount')).sendKeys('19');

    // Click in create button
    await driver
      .findElement(By.css('*[class^="ui labeled icon primary button"]'))
      .click();

    // Assert that error message is shown
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Error'));
  });

  it('validate if cancel button works when creating', async () => {
    // Click in tax rates in side menu
    await driver.findElement(By.css('a[href="/admin/tax-rates/"]')).click();

    // Click in create button
    await driver
      .findElement(By.css('*[class^="ui labeled icon button  primary"]'))
      .click();

    // Type the code
    await driver.findElement(By.id('sylius_tax_rate_code')).sendKeys('1212');

    // Type the Name
    await driver
      .findElement(By.id('sylius_tax_rate_name'))
      .sendKeys('Everton Tax 19%');

    // Select Category Criteria
    await driver
      .findElement(By.id('sylius_tax_rate_category'))
      .sendKeys('clothing');

    // Select Zone
    await driver.findElement(By.id('sylius_tax_rate_zone')).sendKeys('US');

    // Select Calculator
    await driver
      .findElement(By.id('sylius_tax_rate_calculator'))
      .sendKeys('decimal');

    // Type the tax rate amount
    await driver.findElement(By.id('sylius_tax_rate_amount')).sendKeys('19');

    // Click in Cancel button (procura por elemento que contenha 'Cancel' no texto)
    await driver
      .findElement(
        By.xpath("//*[self::button or self::a][contains(., 'Cancel')]")
      )
      .click();

    // Assert that we are back to the listing page with Tax Rates content visible
    const bodyText = await driver.findElement(By.css('.content')).getText();
    assert(bodyText.includes('Tax Rates'));
  });

  it('validate if an existing tax rate can be edited', async () => {
    // Click in tax rates in side menu
    await driver.findElement(By.css('a[href="/admin/tax-rates/"]')).click();

    // Type in value input to search for specific tax rate
    await driver.findElement(By.id('criteria_search_value')).sendKeys('7');

    // Click in filter blue button
    await driver
      .findElement(By.css('*[class^="ui blue labeled icon button"]'))
      .click();

    // Click in Edit button (localiza elemento com texto 'Edit')
    await driver
      .findElement(
        By.xpath("//*[self::button or self::a][contains(., 'Edit')]")
      )
      .click();

    // Change the tax rate name
    let nameInput = await driver.findElement(By.id('sylius_tax_rate_name'));
    await nameInput.clear();
    await nameInput.sendKeys('Updated Clothing Sales Tax 7%');

    // Click on save button
    await driver
      .findElement(By.css('*[class^="ui labeled icon primary button"]'))
      .click();

    // Assert that success message is shown
    let bodyText = await driver
      .findElement(
        By.css('*[class^="ui icon positive message sylius-flash-message"]')
      )
      .getText();
    assert(bodyText.includes('Success'));

    bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Updated Clothing Sales Tax 7%'));
  });

  it('validate filter by date range', async () => {
    // Click in tax rates in side menu
    await driver.findElement(By.css('a[href="/admin/tax-rates/"]')).click();

    // Set date range
    await driver
      .findElement(By.id('criteria_startDate_from_date'))
      .sendKeys('2023-01-01');
    await driver
      .findElement(By.id('criteria_startDate_to_date'))
      .sendKeys('2023-12-31');

    // Apply filter
    await driver
      .findElement(By.css('*[class^="ui blue labeled icon button"]'))
      .click();

    // Assert filtered results are within the specified date range
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Everton Tax 19%'));
  });

  it('edit tax rate and verify changes', async () => {
    // Click in tax rates in side menu
    await driver.findElement(By.css('a[href="/admin/tax-rates/"]')).click();

    // Search for specific tax rate
    await driver.findElement(By.id('criteria_search_value')).sendKeys('7');
    await driver
      .findElement(By.css('*[class^="ui blue labeled icon button"]'))
      .click();

    // Click Edit
    await driver
      .findElement(
        By.xpath("//*[self::button or self::a][contains(., 'Edit')]")
      )
      .click();

    // Update the tax rate name
    let nameInput = await driver.findElement(By.id('sylius_tax_rate_name'));
    await nameInput.clear();
    await nameInput.sendKeys('Updated Tax 9%');

    // Save changes
    await driver
      .findElement(By.css('*[class^="ui labeled icon primary button"]'))
      .click();

    // Assert that changes are reflected (atenção: o teste Cypress verificava 'Updated Tax 7%', verifique se este é o valor esperado)
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Updated Tax 9%'));
  });

  it('try to delete a tax rate and cancel', async () => {
    // Click in tax rates in side menu
    await driver.findElement(By.css('a[href="/admin/tax-rates/"]')).click();

    // Search for specific tax rate
    await driver.findElement(By.id('criteria_search_value')).sendKeys('7');
    await driver
      .findElement(By.css('*[class^="ui blue labeled icon button"]'))
      .click();

    // Click delete button (seleciona botão delete que não esteja disabled)
    await driver
      .findElement(By.css('button.ui.red.labeled.icon.button:not([disabled])'))
      .click();

    // Click cancel instead of confirm
    await driver.findElement(By.css('*[class^="ui red basic cancel inverted button"]')).click();

    // Assert that the tax rate is still visible
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Updated Tax 9%'));
  });

  it('validate filtering by invalid date range shows no results', async () => {
    // Click in tax rates in side menu
    await driver.findElement(By.css('a[href="/admin/tax-rates/"]')).click();

    // Set an invalid date range (end before start)
    await driver
      .findElement(By.id('criteria_startDate_from_date'))
      .sendKeys('2023-12-31');
    await driver
      .findElement(By.id('criteria_startDate_to_date'))
      .sendKeys('2023-01-01');

    // Apply filter
    await driver
      .findElement(By.css('*[class^="ui blue labeled icon button"]'))
      .click();

    // Assert no results are shown
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('There are no results to display'));
  });

  it('Validate if delete button is working', async () => {
    // Click in tax rates in side menu
    await driver.findElement(By.css('a[href="/admin/tax-rates/"]')).click();

    // Search for the specific tax rate
    await driver.findElement(By.id('criteria_search_value')).sendKeys('19');
    await driver
      .findElement(By.css('*[class^="ui blue labeled icon button"]'))
      .click();

    // Click in the delete button (botão que não está disabled)
    await driver
      .findElement(By.css('button.ui.red.labeled.icon.button:not([disabled])'))
      .click();

    // Click the confirmation
    await driver.findElement(By.id('confirmation-button')).click();

    // Search again to verify deletion
    await driver.findElement(By.id('criteria_search_value')).clear();
    await driver.findElement(By.id('criteria_search_value')).sendKeys('19');
    await driver
      .findElement(By.css('*[class^="ui blue labeled icon button"]'))
      .click();

    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(!bodyText.includes('Everton Tax 19%'));
  });

  // Implement the remaining test cases in a similar manner
});
