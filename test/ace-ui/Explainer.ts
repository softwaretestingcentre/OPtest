import { DataTable } from "@cucumber/cucumber";
import { Ensure, equals, includes } from "@serenity-js/assertions";
import { List, notes, Task } from "@serenity-js/core";
import { By, Text, Navigate, PageElement, Click } from "@serenity-js/web";
import { SLA } from "../ace-api/SLA";

export const Explainer = {
  chooseAdvice: (sectionName: string) =>
    Task.where(
      `#actor chooses advice section ${sectionName}`,
      Navigate.to("/explainer.html"),
      Click.on(advice.tab(sectionName))
    ),

  getAdvice: (sectionName: string) =>
    Task.where(
      `#actor views advice from ${sectionName}`,
      Explainer.chooseAdvice(sectionName),
      notes().set(
        "current_advice",
        Text.of(advice.section(sectionName)).toLocaleUpperCase()
      )
    ),

  acceptAdvice: () =>
    Task.where(
      `#actor accepts advice`,
      Click.on(agentRecommendation.acceptButton())
    ),
    
  checkSetPointWasUpdated: (setPoint: string) =>
    Task.where(
      `#actor checks that the ${setPoint} was updated to the Recommended Value`,
      Ensure.that(
        Text.of(agentRecommendation.setPointValue(setPoint, "Current")),
        equals(Text.of(agentRecommendation.setPointValue(setPoint, "Recommended")))
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
            SLA.whichZoneIsMetricIn(item["Metric"]),
            equals(item["Zone"])
          )
        )
      )
    ),
};

const advice = {
  tab: (sectionName: string) =>
    PageElement.located(By.css(`[data-tab="${sectionName}"]`)).describedAs(
      `${sectionName} tab`
    ),

  section: (sectionName: string) =>
    PageElement.located(By.css(`section[id="${sectionName}"]`)).describedAs(
      `${sectionName} advice section`
    ),  
};

const agentRecommendation = {
  acceptButton: () =>
    PageElement.located(By.css(`#acceptAdviceBtn`)).describedAs(
      `Accept button for agent recommendation`
    ),

  setPointValue: (setPoint: string, status: string) =>
    PageElement.located(By.css(`#${setPoint.toLocaleLowerCase()}${status}`)).
    describedAs(
      `${status} set point value for ${setPoint}`
    ),
};
