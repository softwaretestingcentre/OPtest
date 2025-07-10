import { DataTable } from "@cucumber/cucumber";
import { Ensure, equals, includes } from "@serenity-js/assertions";
import { List, notes, Task } from "@serenity-js/core";
import { By, Text, Navigate, PageElement } from "@serenity-js/web";
import { Data } from "./Data";

export const Explainer = {
  adviceSection: (sectionName: string) =>
    PageElement.located(By.id(sectionName)).describedAs("advice section"),

  getAdvice: (sectionName: string) =>
    Task.where(
      `#actor views advice`,
      Navigate.to("/explainer"),
      notes().set(
        "current_advice",
        Text.of(Explainer.adviceSection(sectionName)).toLocaleUpperCase()
      )
    ),

  checkAdviceContainsAllSalientPoints: (dataPoints: DataTable) =>
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
      List.of(zoneData.hashes()).forEach(({ actor, item }) =>
        actor.attemptsTo(
          Ensure.that(
            Data.SLAzone(item["Zone"]), 
            equals(item["Expectation"])
          )
        )
      )
    ),
};
