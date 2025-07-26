import { Ensure, equals } from "@serenity-js/assertions";
import { Question, Task } from "@serenity-js/core";
import { GetRequest, LastResponse, Send } from "@serenity-js/rest";
import { Maths, Polygon, Vertex } from "../utility/Maths";

const enum Zone {
  Comfortable = "Comfortable",
  Allowable = "Allowable",
  Close = "Close",
  Alarm = "Alarm",
}

interface SLAdata {
  polygons: Array<Polygon>;
  points: {
    Current: Vertex;
    Projected: Vertex;
  };
}

export const SLA = {
  fetchData: () =>
    Task.where(
      `#actor fetches SLA data`,
      Send.a(GetRequest.to("/api/sla-vertices")),
      Ensure.that(LastResponse.status(), equals(200))
    ),

  isMetricInZone: (metric: string, zone: string) =>
    Question.about(`is ${metric} in ${zone} zone`, async (actor) => {
      const metricPoint = await actor.answer(
        LastResponse.body<SLAdata>().points[metric]
      );
      const SLAzoneData = await actor.answer(
        LastResponse.body<SLAdata>().polygons.filter(
          (polygon) => polygon.name === zone
        )[0]
      );
      return await actor.answer(
        Maths.pointInPolygon(metricPoint, SLAzoneData.vertices)
      );
    }),

  whichZoneIsMetricIn: (metric: string) =>
    Question.about(`which zone is ${metric} in`, async (actor) => {
      const zones = [Zone.Comfortable, Zone.Allowable, Zone.Close];
      for (const zone of zones) {
        if (await actor.answer(SLA.isMetricInZone(metric, zone))) {
          return zone;
        }
      }
      return Zone.Alarm;
    }),
};
