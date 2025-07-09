import { DataTable } from "@cucumber/cucumber";
import { Ensure, includes } from "@serenity-js/assertions";
import { List, Log, notes, Task } from "@serenity-js/core";

const sampleAdvice = "HI CHRIS, ZONE 1 TEMPERATURES ARE WELL BELOW SLA BOUNDARIES AND THE IT LOAD FOR THIS ZONE IS PREDICTED TO DECLINE OVER THE COMING HOURS. ADJUSTING THE SAT SET POINT IS EXPECTED TO DELIVER SAVINGS. CLICK TO ACCEPT THE RECOMMENDATION OR “SEE OUR LOGIC” FOR A MORE DETAILED ANALYSIS";

export const Explainer = {
  getAdvice: () =>
    Task.where(`#actor views advice`,
      notes().set('current_advice', sampleAdvice),
      Log.the(notes().get('current_advice'))
    ),

  checkAdviceContains: (phrase: string) =>
    Task.where(`#actor checks that advice matches the phrase`,
      Ensure.that(notes().get('current_advice'), includes(phrase))
    ),


  checkAdviceContainsAllSalientPoints: (dataPoints: DataTable) =>
    Task.where(`#actor checks that the advice covers all salient points`,
      List.of(dataPoints.rows()[0]).forEach(({ actor, item }) => actor.attemptsTo(
          Ensure.that(notes().get('current_advice'), includes(item.toLocaleUpperCase())
        )
      ))
    ),

  };
