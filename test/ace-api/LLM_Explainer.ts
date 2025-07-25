import { Ensure, equals, includes } from "@serenity-js/assertions";
import { Log, Task } from "@serenity-js/core";
import { LastResponse, PostRequest, Send } from "@serenity-js/rest";

export const LLM_Explainer = {
    getAdvice: (siteData: object) => 
        Task.where(`#actor requests advice for site`,
            Send.a(PostRequest.to('/api/advice').with(
                siteData
            )),
            Ensure.that(LastResponse.status(), equals(200)),
        ),

    compareAdvice: (zone: string, setPoint: string, recommendation: string) => {
        const advice = LastResponse.body<adviceText>().advice;
        // TODO: enhance by measuring semantic similarity
        return Task.where(`#actor checks that advice matches expectations`, 
            Ensure.that(advice, includes(`Zone ${zone}`)),
            Ensure.that(advice, includes(setPoint)),
            Ensure.that(advice, includes(recommendation)),
        )
    },
    
    updateBaseModel: (oldVersion: string, newVersion: string) =>
        Task.where(`#actor updates the base model`,
            Log.the("updating base model")
        )
}

interface adviceText {
    advice: string
}