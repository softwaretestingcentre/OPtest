import { Ensure, includes } from "@serenity-js/assertions";
import { Answerable, notes, Task } from "@serenity-js/core";

const sampleAdvice = "HI CHRIS, ZONE 1 TEMPERATURES ARE WELL BELOW SLA BOUNDARIES AND THE IT LOAD FOR THIS ZONE IS PREDICTED TO DECLINE OVER THE COMING HOURS. ADJUSTING THE SAT SET POINT IS EXPECTED TO DELIVER SAVINGS. CLICK TO ACCEPT THE RECOMMENDATION OR “SEE OUR LOGIC” FOR A MORE DETAILED ANALYSIS";

export const Explainer = {
  getAdvice: () =>
    Task.where(
      `#actor views advice`,
      notes().set("current_advice", sampleAdvice),
    ),

  checkAdviceContains: (phrase: Answerable<string>) =>
    Task.where(
      `#actor checks that advice matches the phrase`,
      Ensure.that(sampleAdvice, includes(phrase))
    ),
};
