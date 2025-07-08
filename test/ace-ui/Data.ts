import { Question } from "@serenity-js/core";
import { By, Text, PageElements } from "@serenity-js/web";

export const Data = {
    fromTable: (column: string, row: number) =>
        Question.about(`data in table at ${column} ${row}`, async actor => {
            let colIndex = (await actor.answer(Table.columnNames())).indexOf(column);
            return (await actor.answer(Table.values()))[colIndex];
        }),
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

}