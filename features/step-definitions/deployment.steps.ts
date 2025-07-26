import { Given, When, Then } from "@cucumber/cucumber";
import { Actor } from "@serenity-js/core";
import { Navigate } from "@serenity-js/web";
import { Table } from "../../test/ace-ui/Table";
import { Ensure, equals } from "@serenity-js/assertions";
import { Deployer } from "../../test/ace-api/Deployer";

Given('{actor} sees that {string} has a(n) {string} licence and version {string}', async (actor: Actor, customer: string, licenceStatus: string, version: string) => 
  actor.attemptsTo(
    Navigate.to(`/deployment.html`),
    Ensure.that(Table.valueFromRow(customer, "Licence Status"), equals(licenceStatus)),
    Ensure.that(Table.valueFromRow(customer, "ACE Version"), equals(version))
  )
);

Then('{actor} sees that {string} has( the) {string} version of Ace installed', async (actor: Actor, customer: string, version: string) => 
  actor.attemptsTo(
    Navigate.to(`/deployment.html`),
    Ensure.that(Table.valueFromRow(customer, "ACE Version"), equals(version)),
  )
);

Then('{actor} can see that Ace is {string} for {string}', async (actor: Actor, status: string, customer: string) => 
  actor.attemptsTo(
    Navigate.to(`/deployment.html`),
    Ensure.that(Table.valueFromRow(customer, "ACE Active"), equals(status)),
  )
);

When('{actor} deploys Ace to {string}', async (actor: Actor, customer: string) => {
  actor.attemptsTo(
    Deployer.deployAce(customer),
  );
});

When('{actor} deactivates Ace for {string}', async (actor: Actor, customer: string) => {
  actor.attemptsTo(
    Deployer.deactivateAce(customer),
  );
})
