import { DataTable, Given, Then, When } from "@cucumber/cucumber";
import { Actor } from "@serenity-js/core";
import { Authenticate } from "../../test/authentication";
import { Navigate } from "@serenity-js/web";
import { Ensure, equals } from "@serenity-js/assertions";
import { PickExample } from "../../test/examples";




// make sure step functions are async and do not wrap the actor clause in {}




Given('{actor} has logged into ACE', async (actor: Actor) => 
    actor.attemptsTo(
        Navigate.to('/'),
        PickExample.called("Form Authentication"),
        Authenticate.using("tomsmith", "SuperSecretPassword!"),
    )
)

When('{actor} views their portal', async (actor: Actor) => 
      actor.attemptsTo(
          Navigate.to('/'),
      )
)

Then('{pronoun} sees KPIs based on recent data', async (actor: Actor, data: DataTable) => 
    actor.attemptsTo(
        Ensure.that(
            data.hashes()[0]["Expected Value"], equals('1.3')
        )
    )
)
