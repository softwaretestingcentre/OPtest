import { DataTable } from "@cucumber/cucumber";
import { Ensure, equals } from "@serenity-js/assertions";
import { List, Question, Task } from "@serenity-js/core";
import { By, Text, PageElements, PageElement } from "@serenity-js/web";

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

    SLAzone: (zone: string) =>
        Question.about(`Which SLA boundary is ${zone} in`, async actor => {
            return await actor.answer(Psychrometric.SLAzone()[zone]);
        })

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

const Psychrometric = {

    SLAzone: () => {
        // TODO: enhance by locating points in regions
        return {"Current": "Comfortable", "Projected": "Comfortable"}
    }

}