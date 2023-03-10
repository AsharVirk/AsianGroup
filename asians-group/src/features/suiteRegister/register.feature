@registerFunctionality @e2e
Feature: To Check and Verify the Register Functionality

  @TS_Register_01_01 @smoke
  Scenario: Verify the user can register with correct credentials
    Given user lands on "Asians User System" page
    Then verify user is on "Sign in to your account" page
    Then user clicks on register button
    Then verify user is on "Register" page
    Then user inputs random email on register page
    Then user inputs password "12345" on register page
    Then user inputs confirm password "12345" on register page
    Then user clicks on "Register" button
    Then verify the user is logged in

  @TS_Register_02_01
  Scenario: Verify the user cannot register again with the same credentials
    Given user lands on "Asians User System" page
    Then verify user is on "Sign in to your account" page
    Then user clicks on register button
    Then verify user is on "Register" page
    Then user inputs email "abc@xyz.com" on register page
    Then user inputs password "12345" on register page
    Then user inputs confirm password "12345" on register page
    Then user clicks on "Register" button
    Then verify the error "Email already exists."

  @TS_Register_02_02
  Scenario: Verify the user cannot register with the existing email but no password credentials
    Given user lands on "Asians User System" page
    Then verify user is on "Sign in to your account" page
    Then user clicks on register button
    Then verify user is on "Register" page
    Then user inputs email "abc@xyz.com" on register page
    Then user inputs password "" on register page
    Then user inputs confirm password "" on register page
    Then user clicks on "Register" button
    Then verify the error "Email already exists."
    Then verify the error "Please specify password."

  @TS_Register_02_03
  Scenario: Verify the user cannot register again with the existing email but different password credentials
    Given user lands on "Asians User System" page
    Then verify user is on "Sign in to your account" page
    Then user clicks on register button
    Then verify user is on "Register" page
    Then user inputs email "abc@xyz.com" on register page
    Then user inputs password "12345" on register page
    Then user inputs confirm password "54321" on register page
    Then user clicks on "Register" button
    Then verify the error "Email already exists."
    Then verify the error "Password confirmation doesn't match."

  @TS_Register_03_01
  Scenario: Verify the user cannot register valid email but no password credentials
    Given user lands on "Asians User System" page
    Then verify user is on "Sign in to your account" page
    Then user clicks on register button
    Then verify user is on "Register" page
    Then user inputs random email on register page
    Then user inputs password "" on register page
    Then user inputs confirm password "" on register page
    Then user clicks on "Register" button
    Then verify the error "Please specify password."

  @TS_Register_03_02
  Scenario: Verify the user cannot register valid email but different password credentials
    Given user lands on "Asians User System" page
    Then verify user is on "Sign in to your account" page
    Then user clicks on register button
    Then verify user is on "Register" page
    Then user inputs random email on register page
    Then user inputs password "12345" on register page
    Then user inputs confirm password "54321" on register page
    Then user clicks on "Register" button
    Then verify the error "Password confirmation doesn't match."


