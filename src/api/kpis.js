const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const kpis = [
    { name: 'PUE', value: 1.33 },
    { name: 'WUE', value: 1.56 }
  ];
  res.json({ kpis });
});

module.exports = router;