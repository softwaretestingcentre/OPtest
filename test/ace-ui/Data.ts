import { DataTable } from "@cucumber/cucumber";
import { Ensure, equals } from "@serenity-js/assertions";
import { List, Question, Task } from "@serenity-js/core";
import { By, Text, PageElements, PageElement } from "@serenity-js/web";

export const Data = {

    fromTable: (column: string, row: number) =>
        Question.about(`data in table at ${column} (row ${row})`, async actor => {
            let colIndex = (await actor.answer(Table.columnNames())).indexOf(column);
            return (await actor.answer(Table.values()))[colIndex];
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
                            Data.fromTable(item[metric], 0)
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
        PageElements.located(By.css('table#table1 th>span')).describedAs('column headers'),

    columnNames: () =>
        Table.columnHeaders().eachMappedTo(Text),

    cells: () =>
        PageElements.located(By.css('table#table1 td')).describedAs('table cells'),

    values: () =>
        Table.cells().eachMappedTo(Text),

    filterButton: () =>
        PageElement.located(By.css('button[aria-label="Show filters"]')).describedAs('table filter'),

    exportButton: () =>
        PageElement.located(By.css('button[aria-label="Export"]')).describedAs('table filter'),

}

const Psychrometric = {

    SLAzone: () => {
        return {"Current": "Comfortable", "Projected": "Comfortable"}
    }

}