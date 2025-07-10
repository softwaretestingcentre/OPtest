import { DataTable, Given, Then, When } from "@cucumber/cucumber";
import { Actor } from "@serenity-js/core";
import { Navigate } from "@serenity-js/web";
import { User } from "../../test/ace-ui/User";
import { Data } from "../../test/ace-ui/Data";
import { Explainer } from "../../test/ace-ui/Explainer";




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
        Data.compareToTable(data, 'KPI')
    )
)

When('{actor} views the {string} Explainer', async (actor: Actor, sectionName: string) => 
    actor.attemptsTo(
        Explainer.getAdvice(sectionName)
    )
)

Then('{actor} sees that the advice includes:', async (actor: Actor, advicePoints: DataTable) => 
    actor.attemptsTo(
        Explainer.checkAdviceContainsAllSalientPoints(advicePoints)
    )
)

When('{actor} views the SLA Boundaries', async (actor: Actor) => 
    actor.attemptsTo(
        Navigate.to('/explainer')
    )
)

Then('{actor} sees that the SLA Zones match:', async (actor: Actor, zoneData: DataTable) => 
    actor.attemptsTo(
        Explainer.checkSLAZonesMatch(zoneData)
    )
)
