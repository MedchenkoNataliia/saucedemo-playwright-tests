import { test, expect } from '@playwright/test'
const { LoginPage } = require('../pages/LoginPage')

test.describe('Login tests', () => {

   
    test('Valid login', async({page}) => {

        const login = new LoginPage(page)

        await login.goto()
        await login.login('standard_user','secret_sauce')
        await login.validate()
       
    })

    test('Invalid login', async({page}) => {
       
        const login = new LoginPage(page)
        await login.goto()
        await login.login('standard_user','secret_sauce1')
        await login.failLogin()



    })





})

