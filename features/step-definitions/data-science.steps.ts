import { DataTable, Given, Then, When } from "@cucumber/cucumber";
import { LLM_Explainer } from "../../test/ace-api/LLM_Explainer";
import { Actor } from "@serenity-js/core";

Given('{actor} updates the base model', async (actor: Actor, versions: DataTable) => 
    actor.attemptsTo(
        LLM_Explainer.updateBaseModel(versions.hashes()[0]["Old"], versions.hashes()[0]["New"])
    )
)

When('{actor} generates recommendations for {string}', async (actor: Actor, siteName: string) => 
    actor.attemptsTo(LLM_Explainer.getAdvice({"name": siteName}))    
)

Then('{actor} sees that the advice for Zone {string} is for {string} to be {string}', async (actor: Actor, zone: string, setPoint: string, recommendation: string) => 
    actor.attemptsTo(LLM_Explainer.compareAdvice(zone, setPoint, recommendation))    
)



