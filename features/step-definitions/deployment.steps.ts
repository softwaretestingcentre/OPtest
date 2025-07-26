import { Given, When, Then } from "@cucumber/cucumber";
import { Actor } from "@serenity-js/core";
import { Navigate } from "@serenity-js/web";
import { Table } from "../../test/ace-ui/Table";
import { Ensure, equals } from "@serenity-js/assertions";

Given('{actor} sees that {string} has a(n) {string} licence', (actor: Actor, customer: string, licenceStatus: string) => {
  actor.attemptsTo(
    Navigate.to(`/deployment.html`),
    Ensure.that(Table.valueFromRow(customer, "Licence Status"), equals(licenceStatus))
  );
})
Then('{actor} sees that {string} has the {string} version of Ace installed', (actor: Actor, customer: string, version: string) => {
  actor.attemptsTo(
    Ensure.that(Table.valueFromRow(customer, "Ace Version"), equals(version))
  );
})

Then('{actor} can see that Ace is {string} for {string}', (actor: Actor, status: string, customer: string) => {
  actor.attemptsTo(
    Ensure.that(Table.valueFromRow(customer, "Ace Active"), equals(status))
  );
})
