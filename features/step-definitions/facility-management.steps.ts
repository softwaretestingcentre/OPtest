import { DataTable, Given, Then, When } from "@cucumber/cucumber";
import { Actor } from "@serenity-js/core";
import { Navigate } from "@serenity-js/web";
import { User } from "../../test/ace-ui/User";
import { Table } from "../../test/ace-ui/Table";
import { Explainer } from "../../test/ace-ui/Explainer";
import { SLA } from "../../test/ace-api/SLA";

// make sure step functions are async and do not wrap the actor clause in {}

Given("{actor} has opened their portal", async (actor: Actor) =>
  actor.attemptsTo(User.login())
);

When("{pronoun} check their KPIs", async (actor: Actor) =>
  actor.attemptsTo(Navigate.to("/site-manager.html"))
);

Then(
  "{pronoun} see(s) that the KPI data is current",
  async (actor: Actor, data: DataTable) =>
    actor.attemptsTo(Table.compareToTable(data, "KPI"))
);

When(
  "{actor} views the {string} Explainer",
  async (actor: Actor, sectionName: string) =>
    actor.attemptsTo(Explainer.getAdvice(sectionName))
);

Then(
  "{actor} sees that the advice includes:",
  async (actor: Actor, advicePoints: DataTable) =>
    actor.attemptsTo(
      Explainer.checkAdviceContainsAllSalientPoints(advicePoints)
    )
);

When("{actor} views the SLA Boundaries", async (actor: Actor) =>
  actor.attemptsTo(SLA.fetchData())
);

Then(
  "{actor} sees that the SLA Zones match:",
  async (actor: Actor, zoneData: DataTable) =>
    actor.attemptsTo(Explainer.checkSLAZonesMatch(zoneData))
);

When('{actor} accepts the advice about {string}', async (actor: Actor, setPoint: string) => 
  actor.attemptsTo(
    Explainer.chooseAdvice("AgentRecommendation"),
    Explainer.acceptAdvice()
  )
);

Then(
  "{actor} sees that the {string} is set to the Recommended Value",
  async (actor: Actor, setPoint: string) =>
    actor.attemptsTo(
      Explainer.checkSetPointWasUpdated(setPoint)
    )
)
