const { expect } = require ('@playwright/test')

exports.MenuPage = class MenuPage {
 /**
  * @param {import('@playwright/test').Page} page
  */  
  constructor(page){
    this.page = page,
    this.menuButton = page.locator('#react-burger-menu-btn'),
    this.allItems = page.locator('#inventory_sidebar_link'),
    this.about = page.locator('#about_sidebar_link'),
    this.logout = page.locator('#logout_sidebar_link'),
    this.resetAppState = page.locator('#reset_sidebar_link')

  }

  async openMenu(){
    await this.menuButton.click()
  }

  async logoutFromSystem(){
    await this.openMenu()
    await this.logout.click()
  }
}