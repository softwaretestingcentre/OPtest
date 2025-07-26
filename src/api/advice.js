const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const ADVICE = {
    advice: "The SAT set point in Zone 1 should be set to 0.85. In Zone 2, the PAT set point can be below 1.74."
  };
  res.send(ADVICE);
});

module.exports = router;