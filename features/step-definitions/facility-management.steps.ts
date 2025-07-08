import { DataTable, Given, Then, When } from "@cucumber/cucumber";
import { Actor } from "@serenity-js/core";
import { Authenticate } from "../../test/authentication";
import { Navigate } from "@serenity-js/web";
import { Ensure, equals } from "@serenity-js/assertions";
import { PickExample } from "../../test/examples";
import { User } from "../../test/ace-ui/User";
import { Data } from "../../test/ace-ui/Data";




// make sure step functions are async and do not wrap the actor clause in {}



Given('{actor} has opened their portal', async (actor: Actor) => 
    actor.attemptsTo(
        User.login()
    )
)

When('{pronoun} check their KPIs', async (actor: Actor) => 
    actor.attemptsTo(
        Navigate.to('/tables')
    )
)

Then('{pronoun} see(s) that the KPI data is current', async (actor: Actor, data: DataTable) => 
    actor.attemptsTo(
        Ensure.that(
            data.hashes()[0]["Expected Value"], 
            equals(
                Data.fromTable(data.hashes()[0]["KPI"], 0)
            )
        )
    )
)
