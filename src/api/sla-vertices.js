const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
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

module.exports = router;