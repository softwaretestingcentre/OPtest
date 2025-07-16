import React from "react";

const kpis = [
  { name: "PUE", value: 1.33 },
  { name: "WUE", value: 1.56 },
];

const KPIList: React.FC = () => (
  <section>
    <h2>Current KPIs</h2>
    <table>
      <thead>
        <tr>
          <th>KPI</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {kpis.map((kpi) => (
          <tr key={kpi.name}>
            <td>{kpi.name}</td>
            <td>{kpi.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);

export default KPIList;