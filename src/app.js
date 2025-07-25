
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

app.use(express.static(__dirname + '/'));

// --- KPI Table API endpoint ---
app.get('/api/kpis', (req, res) => {
  // Example KPI values (can be replaced with dynamic data)
  const kpis = [
    { name: 'PUE', value: 1.33 },
    { name: 'WUE', value: 1.56 }
  ];
  res.json({ kpis });
});

// --- SLA Vertices API endpoint (merged from sla-api-server.js) ---
app.get('/api/sla-vertices', (req, res) => {
  // Example polygon and point data (can be replaced with dynamic data)
  const polygons = [
    { name: 'Close', vertices: [ {x:40,y:220}, {x:60,y:60}, {x:280,y:40}, {x:300,y:180}, {x:200,y:240} ] },
    { name: 'Allowable', vertices: [ {x:60,y:200}, {x:80,y:80}, {x:260,y:60}, {x:280,y:160}, {x:180,y:220} ] },
    { name: 'Comfortable', vertices: [ {x:80,y:180}, {x:100,y:100}, {x:240,y:80}, {x:260,y:140}, {x:160,y:200} ] }
  ];
  const points = {
    Current: { x: 170, y: 120 },
    Projected: { x: 190, y: 70 }
  };
  res.json({ polygons, points });
});

app.post("/api/advice", (request, response) => {
    const ADVICE = {
        "advice": "The SAT set point in Zone 1 should be set to 0.85. In Zone 2, the PAT set point can be below 1.74."
    }
    response.send(ADVICE);
});