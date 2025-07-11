const express = require("express");

const app = express ();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

app.use(express.static(__dirname + '/pages/'));


app.post("/advice", (request, response) => {
    const ADVICE = {
        "advice": "The SAT set point in Zone 1 should be set to 0.85. In Zone 2, the PAT set point can be below 1.74."
    }
    response.send(ADVICE);
})