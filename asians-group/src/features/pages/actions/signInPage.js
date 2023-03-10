import click_utility from '../../../utilities/clicking';
import signInPageLocators from "../../locators/asiansGroup.json";
import {expect} from "chai";
import input from "../../../utilities/input";


class SignInPage {

    async verifyDashboard(page,header) {
        let headerValue = await input.getElementTextUsingXpath(page,signInPageLocators.asiansGroup.navigation.dashBoardHeader);
        expect(headerValue).to.be.equal(header);
    }

    async verifyPage(page, header) {
        await page.waitForTimeout(3000);
        let headerValue = await input.getElementTextUsingXpath(page,signInPageLocators.asiansGroup.navigation.header);
        expect(headerValue.trim()).to.be.equal(header);
    }

    async userLoggedIn(page) {
        await page.waitForNavigation({waitUntil: 'networkidle2'})
        let elementExist = await input.getElementExist(page,signInPageLocators.asiansGroup.dashboard.loginLogo)
        expect(elementExist).to.be.true;
    }

    async inputEmail(page,emailValue) {
        await input.enterTextXpath(page,signInPageLocators.asiansGroup.loginPage.usernameField,emailValue);
    }

    async inputPassword(page,passwordValue) {
        await input.enterTextXpath(page,signInPageLocators.asiansGroup.loginPage.passwordField,passwordValue);
    }

    async clickLoginButton(page,buttonValue) {
        let buttonXpath = "//input[@value='"+buttonValue+"']";
        await click_utility.clickElementByXpath(page,buttonXpath);
    }

    async loginErrorVerification(page,errorMessage) {
        let elementExist = await input.getElementTextUsingXpath(page,signInPageLocators.asiansGroup.loginPage.invalidCredsError);
        expect(elementExist.trim()).to.be.equal(errorMessage);
    }

    async clickRegisterIcon(page) {
        await click_utility.clickElementByXpath(page,signInPageLocators.asiansGroup.loginPage.registerButton);
    }
}

export default new SignInPage()
