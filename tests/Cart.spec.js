import { test, expect } from '@playwright/test'
const { LoginPage } = require('../pages/LoginPage')
const { CartPage } = require('../pages/CartPage')


test('User adds and removes item from cart', async ({page}) => {
    
  const login = new LoginPage(page)
    
  await login.goto()
  await login.login('standard_user','secret_sauce')
 
  const cartPage = new CartPage(page)
  
  await cartPage.addItem('Sauce Labs Backpack')
  await cartPage.goToCart()
  await cartPage.expectItemInCart('Sauce Labs Backpack')
  await cartPage.removeItem('Sauce Labs Backpack')
  await cartPage.expectCartIsEmpty()
})