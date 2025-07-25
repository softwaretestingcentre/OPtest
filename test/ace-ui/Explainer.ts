import { DataTable } from "@cucumber/cucumber";
import { Ensure, includes, isTrue } from "@serenity-js/assertions";
import { List, notes, Task } from "@serenity-js/core";
import { By, Text, Navigate, PageElement, Click } from "@serenity-js/web";
import { Data } from "./Data";

export const Explainer = {

  chooseAdvice: (sectionName: string) =>
    Task.where(`#actor chooses advice section ${sectionName}`,
      Navigate.to("/explainer.html"),
      Click.on(PageElement.located(By.css(`[data-tab="${sectionName}"]`)).describedAs(`${sectionName} tab`))
    ),

  adviceSection: (sectionName: string) =>
    PageElement.located(By.css(`section[id="${sectionName}"]`)).describedAs(`${sectionName} advice section`),

  getAdvice: (sectionName: string) =>
    Task.where(
      `#actor views advice from ${sectionName}`,
      Explainer.chooseAdvice(sectionName),
      notes().set(
        "current_advice",
        Text.of(Explainer.adviceSection(sectionName)).toLocaleUpperCase()
      )
    ),

  checkAdviceContainsAllSalientPoints: (dataPoints: DataTable) =>
    // TODO: enhance by measuring semantic similarity - complete, incomplete, contradictory
    Task.where(
      `#actor checks that the advice covers all salient points`,
      List.of(dataPoints.hashes()).forEach(({ actor, item }) =>
        actor.attemptsTo(
          Ensure.that(
            notes().get("current_advice"),
            includes(item["Expectation"].toLocaleUpperCase())
          )
        )
      )
    ),


  checkSLAZonesMatch: (zoneData: DataTable) =>
    Task.where(
      `#actor checks all zones match expectations`,
      List.of(zoneData.hashes()).forEach(async ({ actor, item }) =>
        actor.attemptsTo(
          Ensure.that(
              Data.isMetricInZone(item["Metric"], item["Zone"]),
              isTrue()
          )
      )
    )
  ),
};
