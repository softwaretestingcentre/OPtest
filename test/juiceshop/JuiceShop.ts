import { Task, Wait } from '@serenity-js/core';
import { By, Click, Cookie,Enter,isVisible,Key,ModalDialog,Navigate, PageElement, Press } from '@serenity-js/web';

const pages = {
    "Privacy Policy": "/#/privacy-security/privacy-policy",
    "Score Board": "/#/score-board"
}

export const JuiceShop = {
    open: () => 
        Task.where(
            '#actor opens the Juice Shop',
            Navigate.to('/'),
            Cookie.set({
                name: 'cookieconsent_status', 
                value: 'dismiss'
            }),
            Cookie.set({
                name: 'welcomebanner_status', 
                value: 'dismiss'
            }),
            Cookie.set({
                name: 'language', 
                value: 'en'
            }),
            Navigate.reloadPage()
        ),
        
    searchFor: (searchTerm: string) =>
        Task.where(
            `#actor searches for ${searchTerm}`,
            Navigate.to('/'),
            Wait.until(Search.button(), isVisible()),
            Click.on(Search.button()),
            Wait.until(Search.input(), isVisible()),
            Enter.theValue(searchTerm).into(Search.input()),
            ModalDialog.dismissNext(),
            Press.the(Key.Enter).in(Search.input()),
            Wait.until(Search.result(), isVisible()),            
        ),

    goto: (pageName) => 
        Task.where(
            `#actor opens ${pageName}`,
            Navigate.to(pages[pageName])
        )

}

const Search = {
    button: () =>
        PageElement.located(By.css('#searchQuery')).describedAs('Search button'),

    input: () =>
        PageElement.located(By.css('app-mat-search-bar input')).describedAs('Search input'),

    result: () =>
        PageElement.located(By.css('app-search-result')).describedAs("'Search results"),

}
