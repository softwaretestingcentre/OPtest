import { Ensure, equals } from "@serenity-js/assertions";
import { Question } from "@serenity-js/core";
import { LastResponse, PostRequest, Send } from "@serenity-js/rest";

export const LLM_Explainer = {
    getAdvice: (siteData: object) => 
        Question.about(`advice for site`, async actor => {
            Send.a(PostRequest.to('/explain.json').with(
                siteData
            )),
            Ensure.that(LastResponse.status(), equals(200)),
            return LastResponse.body<adviceText>().advice;
                
        })
}

interface adviceText {
    advice: string
}