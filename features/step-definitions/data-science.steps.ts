import { Given, Then, When } from "@cucumber/cucumber";
import { LLM_Explainer } from "../../test/ace-api/LLM_Explainer";
import { Actor } from "@serenity-js/core";

Given('{actor} updates the base model from {string} to {string}', async (actor: Actor, oldVersion: string, newVersion: string) => 
    actor.attemptsTo(
        LLM_Explainer.updateBaseModel(oldVersion, newVersion)
    )
)

When('{actor} generates recommendations for {string}', async (actor: Actor, siteName: string) => 
    actor.attemptsTo(LLM_Explainer.getAdvice({"name": siteName}))    
)

Then('{actor} sees that the advice for {string} is for {string} to be {string}', async (actor: Actor, zone: string, setPoint: string, recommendation: string) => 
    actor.attemptsTo(LLM_Explainer.compareAdvice(zone, setPoint, recommendation))    
)



