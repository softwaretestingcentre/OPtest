import { DataTable, Given, Then, When } from "@cucumber/cucumber";
import { Actor } from "@serenity-js/core";
import { Authenticate } from "../../test/authentication";
import { Navigate } from "@serenity-js/web";
import { Ensure, equals } from "@serenity-js/assertions";



Given('{actor} has logged into ACE', (actor: Actor) => {
    actor.attemptsTo(
        Authenticate.using("tomsmith", "SuperSecretPassword!"),
    )
})

When('{actor} views their portal', (actor: Actor) => {
      actor.attemptsTo(
          Navigate.to('/'),
      )
})

Then('{pronoun} sees KPIs based on recent data', (actor: Actor, data: DataTable, expectedValue: number) => {
    actor.attemptsTo(
        Ensure.that(
            data.hashes()[0]["Expected Value"], equals('1.3')
        )
    )
})
