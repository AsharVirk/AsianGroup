@loginFunctionality @e2e
Feature: To Check and Verify the Login Functionality

  @TC_Login_01_01 @smoke
  Scenario: Verify the login of user with correct credentials
    Given user lands on "Asians User System" page
    Then verify user is on "Sign in to your account" page
    Then user inputs email "abc@xyz.com"
    Then user inputs password "12345"
    Then user clicks on "Sign In" button
    Then verify the user is logged in

  @TC_Login_02 @TC_Login_02_01 @TC_Login_02_02 @TC_Login_02_03 @TC_Login_02_04 @TC_Login_02_05 @TC_Login_02_06
  Scenario Outline: Verify the login of user with incorrect credentials
    Given user lands on "Asians User System" page
    Then verify user is on "Sign in to your account" page
    Then user inputs email "<email>"
    Then user inputs password "<password>"
    Then user clicks on "Sign In" button
    Then verify the invalid username and passowrd error is shown "Invalid username or password."
    Examples:
    |email|password|
    |abc@xyz.com|54321|
    |xyz@abc.com|12345|
    |xyz@abc.com|54321|
    ||12345|
    |abc@xyz.com||
    |||


