const { expect } = require ('@playwright/test')
exports.CheckoutPage = class CheckoutPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
  constructor(page) {
    this.page = page,
    this.checkoutButton = page.locator('#checkout'),
    this.firstName = page.locator('#first-name'),
    this.lastName = page.locator('#last-name'),
    this.zip = page.locator('#postal-code'),
    this.continueButton = page.locator('#continue'),
    this.finishButton= page.locator('#finish'),
    this.backHomeButton = page.locator('#back-to-products')
  } 

  async proceedToCheckout(){
    await this.checkoutButton.click()
  }

  async fillCustomerInfo (firstName, lastName, zip){
    await this.firstName.fill(firstName)
    await this.lastName.fill(lastName)
    await this.zip.fill(zip)
    await this.continueButton.click()
  }

  async validateOrderSummary() {
    await expect(this.page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack')
    await expect(this.page.locator('.inventory_item_price')).toHaveText('$29.99')
    await expect(this.page.locator('.summary_subtotal_label')).toHaveText('Item total: $29.99')
    await expect(this.page.locator('.summary_tax_label')).toHaveText('Tax: $2.40')
    await expect(this.page.locator('.summary_total_label')).toHaveText('Total: $32.39')
    await expect(this.page.locator('.summary_value_label').nth(0)).toHaveText('SauceCard #31337')
    await expect(this.page.locator('.summary_value_label').nth(1)).toHaveText('Free Pony Express Delivery!')
  }

  async finishOrder(){
    await this.finishButton.click()
  }

  async validateSuccessMessage() {
    await expect(this.page.locator('.complete-header')).toHaveText('Thank you for your order!')
    await expect(this.page.locator('.complete-text')).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!')
  }

  async returnToHome() {
    await this.backHomeButton.click()
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html')
  }
}