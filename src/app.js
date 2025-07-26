const express = require("express");
const cors = require("cors");

const licenceRouter = require("./api/licence");
const kpiRouter = require("./api/kpis");
const slaRouter = require("./api/sla-vertices");
const adviceRouter = require("./api/advice");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/licence", licenceRouter);
app.use("/api/kpis", kpiRouter);
app.use("/api/sla-vertices", slaRouter);
app.use("/api/advice", adviceRouter);
app.use(express.static(__dirname + '/'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
