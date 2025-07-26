import { DataTable } from "@cucumber/cucumber";
import { Ensure, equals } from "@serenity-js/assertions";
import { List, Question, Task } from "@serenity-js/core";
import { By, Text, PageElements } from "@serenity-js/web";

export const Table = {
  valuesFromRow: (metric: string) =>
    Question.about(`data in table for ${metric}`, async (actor) => {
      let rowIndex = (await actor.answer(RenderedTable.rowNames()))
      .indexOf(metric);
      return (await actor.answer(RenderedTable.values()))
      [rowIndex * await actor.answer(RenderedTable.columnCount()) + 1];
    }),

  valueFromRow: (row: string, column: string) =>
    Question.about(`data in table for ${row} in column ${column}`, async (actor) => {
        let rowIndex = (await actor.answer(RenderedTable.rowNames()))
        .indexOf(row);
        let columnIndex = (await actor.answer(RenderedTable.columnNames()))
        .indexOf(column);
        let columnCount = await actor.answer(RenderedTable.columnCount());
        let values = await actor.answer(RenderedTable.values());
        return await actor.answer(values[rowIndex * columnCount + columnIndex]);
      }
    ),

  filter: (filterValue: string) =>
    Task.where(
      `#actor filters data`
      // TODO
    ),

  sort: (sortColumn: string, sortDirection: string) =>
    Task.where(
      `#actor sorts data`
      // TODO
    ),

  export: (exportAs: string) =>
    Task.where(
      `# actor downloads or prints data`
      // TODO
    ),

  compareToMetric: (expectedData: DataTable, metric: string) =>
    Task.where(
      `#actor compares data to expectations`,
      List.of(expectedData.hashes()).forEach(({ actor, item }) =>
        actor.attemptsTo(
          Ensure.that(
            item["Expected Value"],
            equals(Table.valuesFromRow(item[metric]))
          )
        )
      )
    ),
};

const RenderedTable = {
  columnHeaders: () =>
    PageElements.located(By.css(`table th`)).describedAs("column headers"),

  columnNames: () => RenderedTable.columnHeaders().eachMappedTo(Text),

  columnCount: () => RenderedTable.columnHeaders().count(),

  rowHeaders: () =>
    PageElements.located(By.css(`table tbody tr td:nth-child(1)`)).describedAs(
      "row headers"
    ),

  rowNames: () => RenderedTable.rowHeaders().eachMappedTo(Text),

  cells: () =>
    PageElements.located(By.css(`table tbody td`)).describedAs("table cells"),

  values: () => RenderedTable.cells().eachMappedTo(Text),
};
