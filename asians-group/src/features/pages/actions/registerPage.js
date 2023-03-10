import click_utility from '../../../utilities/clicking';
import asiansGroupLocators from "../../locators/asiansGroup.json";
import {expect} from "chai";
import input from "../../../utilities/input";
import signInPageLocators from "../../locators/asiansGroup.json";


class RegisterPage {

    async inputRandomEmail(page) {
        let email = Math.random().toString(36).substring(2, 11)+"@xyz.com";
        await input.enterTextXpath(page,asiansGroupLocators.asiansGroup.registerPage.emailField,email);
    }

    async inputEmail(page,emailValue) {
        await input.enterTextXpath(page,asiansGroupLocators.asiansGroup.registerPage.emailField,emailValue);
    }
    async inputPassword(page,passwordValue) {
        await input.enterTextXpath(page,signInPageLocators.asiansGroup.registerPage.passwordField,passwordValue);
    }

    async inputConfirmPassword(page, passwordValue) {
        await input.enterTextXpath(page,signInPageLocators.asiansGroup.registerPage.passwordConfirmField,passwordValue);
    }

    async verifyError(page, errorValue) {
        await page.waitForTimeout(3000);
        let headerValues = await input.getElementTextUsingXpath(page,signInPageLocators.asiansGroup.registerPage.error);
        expect(headerValues).to.contains(errorValue);
    }
}

export default new RegisterPage()
