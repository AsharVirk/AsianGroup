import {Then} from "@cucumber/cucumber";
import registerPage from "../pages/actions/registerPage";


Then('user inputs random email on register page',{timeout: 360 * 1000},async function () {
    await registerPage.inputRandomEmail(this.page);
})

Then('user inputs password {string} on register page',{timeout: 360 * 1000},async function (passwordValue) {
    await registerPage.inputPassword(this.page,passwordValue);
})

Then('user inputs confirm password {string} on register page',{timeout: 360 * 1000},async function (passwordValue) {
    await registerPage.inputConfirmPassword(this.page,passwordValue);
})

Then('user inputs email {string} on register page',{timeout: 360 * 1000},async function (emailValue) {
    await registerPage.inputEmail(this.page,emailValue);
})
Then('verify the error {string}',{timeout: 360 * 1000},async function (errorValue) {
    await registerPage.verifyError(this.page,errorValue);
})