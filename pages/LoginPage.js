const { expect } = require('@playwright/test')
exports.LoginPage = class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page){
    this.page = page,
    this.userName = page.locator('#user-name'),
    this.password = page.locator('#password'),
    this.loginButton = page.locator('#login-button')

  }

  async goto() {
    
    await this.page.goto('https://www.saucedemo.com/')

  }

  async login (username,password) {
    
    await this.userName.fill(username)
    await this.password.fill(password)
    await this.loginButton.click()
  }

  async validate(){
   
    await expect(this.page).toHaveTitle(/Swag Labs/)

  }

  async failLogin(){

    await expect(this.page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service')

  }
}