import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
const { LoginPage } = require ('../pages/LoginPage')
const { CartPage } = require ('../pages/CartPage')
const { CheckoutPage } = require ('../pages/CheckoutPage')


test('Checkout', async({page}) => {

    const login = new LoginPage(page)
    
    await login.goto()
    await login.login('standard_user','secret_sauce')

    const cartPage = new CartPage(page)
    const checkout = new CheckoutPage(page)
    
    await cartPage.addItem('Sauce Labs Backpack')
    await cartPage.goToCart()
    await cartPage.expectItemInCart('Sauce Labs Backpack')
    await checkout.proceedToCheckout()
    
    const fakeFirstName = faker.person.firstName();
    const fakeLastName = faker.person.lastName();
    const fakeZip = faker.location.zipCode();

    await checkout.fillCustomerInfo(fakeFirstName, fakeLastName, fakeZip)
    await checkout.validateOrderSummary()
    await checkout.finishOrder()
    await checkout.validateSuccessMessage()
    await checkout.returnToHome()

})