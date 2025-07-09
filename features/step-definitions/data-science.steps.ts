import { When } from "@cucumber/cucumber";
import { LLM_Explainer } from "../../test/ace-api/LLM_Explainer";

When('{actor} generates recommendations', async (actor: Actor) => 
    actor.attemptsTo(LLM_Explainer.getAdvice({"name": "site_1"}));
)
