import { DataTable } from "@cucumber/cucumber";
import { Ensure, equals, includes } from "@serenity-js/assertions";
import { List, notes, Task } from "@serenity-js/core";
import { By, Text, Navigate, PageElement, Click, Page } from "@serenity-js/web";
import { Data } from "./Data";
import { GetRequest, LastResponse, Send } from "@serenity-js/rest";

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
  
  fetchSLAData: () =>
    Task.where(
      `#actor fetches SLA data`,
      Send.a(GetRequest.to('/api/sla-vertices')),
      Ensure.that(LastResponse.status(), equals(200)),
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
    // this would need access to the data used to create the SLA zones chart
    // then determine whether the current and projected points lie within the expected zones
    // // Returns true if (x, y) is inside the polygon defined by vertices
    // export function pointInPolygon(x: number, y: number, vertices: Array<{x: number, y: number}>): boolean {
    //   let inside = false;
    //   for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
    //     const xi = vertices[i].x, yi = vertices[i].y;
    //     const xj = vertices[j].x, yj = vertices[j].y;
    //     const intersect =
    //       ((yi > y) !== (yj > y)) &&
    //       (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi);
    //     if (intersect) inside = !inside;
    //   }
    //   return inside;
    // }
};
