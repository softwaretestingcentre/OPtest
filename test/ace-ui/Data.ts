import { DataTable } from "@cucumber/cucumber";
import { Ensure, equals } from "@serenity-js/assertions";
import { Check, List, Question, Task } from "@serenity-js/core";
import { GetRequest, LastResponse, Send } from "@serenity-js/rest";
import { By, Text, PageElements } from "@serenity-js/web";

export const Data = {

    fromTable: (metric: string) =>
        Question.about(`data in table for ${metric}`, async actor => {
            let rowIndex = (await actor.answer(Table.rowNames())).indexOf(metric);
            return (await actor.answer(Table.values()))[rowIndex * 2 + 1];
        }),
    
    filter: (filterValue: string) =>
        Task.where(`#actor filters data`,
           // TODO 
        ),
    
    sort: (sortColumn: string, sortDirection: string) =>
        Task.where(`#actor sorts data`,
            // TODO
        ),

    export: (exportAs: string) =>
        Task.where(`# actor downloads or prints data`,
            // TODO
        ),

    compareToTable: (expectedData: DataTable, metric: string) =>
        Task.where(`#actor compares data to expectations`,
            List.of(expectedData.hashes()).forEach(({actor, item}) => 
                actor.attemptsTo(
                    Ensure.that(
                        item["Expected Value"], 
                        equals(
                            Data.fromTable(item[metric])
                        )
                    )
                )
            )
        ),
  
    fetchSLAData: () =>
        Task.where(`#actor fetches SLA data`,
            Send.a(GetRequest.to('/api/sla-vertices')),
            Ensure.that(LastResponse.status(), equals(200)),
        ),
    
    metricIsInZone: (metric: string, zone: string) => {
        const SLAzoneData = List.of(LastResponse.body<SLAdata>().polygons);
        
        return Task.where(`#actor checks that ${metric} is in ${zone} zone`,
            SLAzoneData.forEach(async ({actor, item}) => {
                const metricPoint = await actor.answer(LastResponse.body<SLAdata>().points[metric]);
                actor.attemptsTo(
                    Check.whether(item.name, equals(zone))
                    .andIfSo(
                        Ensure.that(Data.pointInPolygon(metricPoint, item.vertices), 
                        equals(true))
                    )
                )
            })
        )            
    },

    // Returns true if (x, y) is inside the polygon defined by vertices
    pointInPolygon: (point: {x: number, y: number}, vertices: Array<{x: number, y: number}>): boolean => {
      const x = point.x, y = point.y;
      let inside = false;
      for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
        const xi = vertices[i].x, yi = vertices[i].y;
        const xj = vertices[j].x, yj = vertices[j].y;
        const intersect =
          ((yi > y) !== (yj > y)) &&
          (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi);
        if (intersect) inside = !inside;
      }
      return inside;
    }


}

const Table = {

    columnHeaders: () =>
        PageElements.located(By.css(`table th`)).describedAs('column headers'),

    columnNames: () =>
        Table.columnHeaders().eachMappedTo(Text),

    rows: () =>
        PageElements.located(By.css(`table tr td:nth-child(1)`)).describedAs('table rows'),

    rowNames: () =>
        Table.rows().eachMappedTo(Text),

    cells: () =>
        PageElements.located(By.css(`table td`)).describedAs('table cells'),

    values: () =>
        Table.cells().eachMappedTo(Text),


}


interface Polygon {
    name: string;
    vertices: Array<{ x: number, y: number }>;
}

interface SLAdata {
    polygons: Array<Polygon>;
    points: {
        Current: { x: number, y: number },
        Projected: { x: number, y: number }
    }
}