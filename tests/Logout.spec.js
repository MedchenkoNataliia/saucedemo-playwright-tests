import { test, expect} from '@playwright/test'
const { LoginPage } = require('../pages/LoginPage')
const { MenuPage } = require('../pages/MenuPage')

test('@LOT-0003 Logout', async({page}) => {

    const login = new LoginPage(page)
    const menu = new MenuPage(page)

    await login.goto()
    await login.login('standard_user','secret_sauce')
    await login.validate()

    await menu.logoutFromSystem()
    await expect(page).toHaveURL('https://www.saucedemo.com/')



})

