import { Given, Then, When } from '@cucumber/cucumber';
import { Actor } from '@serenity-js/core';

import { JuiceShop, ScoreBoard } from '../../test/juiceshop';
import { ModalDialog } from '@serenity-js/web';
import { Ensure, equals } from '@serenity-js/assertions';

Given('{actor} goes to the Juice Shop', async (actor: Actor) =>
    actor.attemptsTo(
        JuiceShop.open()
    )
);

When('{pronoun} searches for {}', async (actor: Actor, searchTerm: string) =>
    actor.attemptsTo(
        JuiceShop.searchFor(searchTerm),
    )
)

Then('{pronoun} sees he/she/they has/have solved the {string} challenge', async (actor: Actor, challengeName: string) => {
    actor.attemptsTo(
        ScoreBoard.confirmChallengeSolved(challengeName)
    );
})

When('{pronoun} opens the {}', async (actor: Actor, hiddenPage: string) => {
    actor.attemptsTo(
        JuiceShop.goto(hiddenPage)
    )
})

Then('{pronoun} should see no alert message', (actor: Actor) => {
    actor.attemptsTo(
        Ensure.that(ModalDialog.lastDialogState(), equals('absent'))
    )
})

