import { Task } from "@serenity-js/core";
import { By, Click, Enter, Navigate, PageElement } from "@serenity-js/web";

export const User = {
    login: () =>
        Task.where(`#actor logs in`,
            Navigate.to('/login'),
            Enter.theValue('tomsmith').into(LoginForm.usernameField()),
            Enter.theValue('SuperSecretPassword!').into(LoginForm.passwordField()),
            Click.on(LoginForm.loginButton())
        ),
}



const LoginForm = {
    usernameField: () =>
        PageElement.located(By.id('username')).describedAs('username field'),

    passwordField: () =>
        PageElement.located(By.id('password')).describedAs('password field'),

    loginButton: () =>
        PageElement.located(By.css('button[type="submit"]')).describedAs('login button'),
}
