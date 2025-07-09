import { Ensure, equals, includes } from "@serenity-js/assertions";
import { Question, Task } from "@serenity-js/core";
import { LastResponse, PostRequest, Send } from "@serenity-js/rest";

export const LLM_Explainer = {
    getAdvice: (siteData: object) => 
        Task.where(`#actor requests advice for site`,
            Send.a(PostRequest.to('/explain.json').with(
                siteData
            )),
            Ensure.that(LastResponse.status(), equals(200)),
        ),

    compareAdvice: (zone: string, setPoint: string, recommendation: string) => 
        Task.where(`#actor checks that advice matches expectations`, 
            Ensure.that(LastResponse.body<adviceText>().advice, includes(zone)),
            Ensure.that(LastResponse.body<adviceText>().advice, includes(setPoint)),
            Ensure.that(LastResponse.body<adviceText>().advice, includes(recommendation)),
        )
}

interface adviceText {
    advice: string
}