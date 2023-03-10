import {Given,Then} from "@cucumber/cucumber";
import signInPage from "../pages/actions/signInPage";


Given('user lands on {string} page',  {timeout: 360 * 1000},async function (header) {
    await signInPage.verifyDashboard(this.page,header);
});

Then('verify user is on {string} page', {timeout: 360 * 1000},async function (header) {
    await signInPage.verifyPage(this.page,header);
});

Then('verify the user is logged in',{timeout: 360 * 1000},async function () {
    await signInPage.userLoggedIn(this.page);
});

Then('user inputs email {string}',{timeout: 360 * 1000},async function (emailValue) {
    await signInPage.inputEmail(this.page,emailValue);
})

Then('user inputs password {string}',{timeout: 360 * 1000},async function (emailValue) {
    await signInPage.inputPassword(this.page,emailValue);
});
Then('user clicks on {string} button', {timeout: 360 * 1000},async function (buttonValue) {
    await signInPage.clickLoginButton(this.page,buttonValue);
});

Then('verify the invalid username and passowrd error is shown {string}',{timeout: 360 * 1000},async function (errorMessage) {
    await signInPage.loginErrorVerification(this.page,errorMessage);
});

Then('user clicks on register button', {timeout: 360 * 1000},async function () {
    await signInPage.clickRegisterIcon(this.page);
});