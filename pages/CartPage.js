const { expect } = require('@playwright/test')
exports.CartPage = class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page){
    this.page = page,
    this.cartButton = page.locator('.shopping_cart_link'),
    this.cartItems = page.locator('.cart_item'),
    this.emptyCartMessage = page.locator('.cart_item')
  }

  async addItem(itemName) {
    
    const itemCard = this.page.locator('.inventory_item').filter({ hasText: itemName })
    await itemCard.locator('button').click()
  }

  async goToCart() {
    await this.cartButton.click()
    await this.page.waitForURL('**/cart.html')
  }

  async expectItemInCart(itemName) {
    await expect(this.cartItems.filter({ hasText: itemName })).toBeVisible()
  }

  async removeItem(itemName) {
    const itemCard = this.page.locator('.cart_item').filter({ hasText: itemName })
    await itemCard.locator('button').click()
  }

  async expectCartIsEmpty() {
    await expect(this.cartItems).toHaveCount(0)
  }
}
