import { test, expect } from '@playwright/test'
const { CartPage } = require('../pages/CartPage')


test('User adds and removes item from cart', async ({page}) => {
    
  const cartPage = new CartPage(page);

  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await cartPage.addItem('Sauce Labs Backpack');
  await cartPage.goToCart();
  await cartPage.expectItemInCart('Sauce Labs Backpack');
  await cartPage.removeItem('Sauce Labs Backpack');
  await cartPage.expectCartIsEmpty();
})