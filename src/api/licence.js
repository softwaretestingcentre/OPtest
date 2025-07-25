const express = require("express");
const router = express.Router();

const licences = {
  Acme: { customer: "Acme", status: "valid", aceVersion: "none", aceActive: false },
  DC: { customer: "DC", status: "valid", aceVersion: "previous", aceActive: true },
  OL: { customer: "OL", status: "expired", aceVersion: "latest", aceActive: true },
};

router.get("/:customer", (req, res) => {
  const customer = req.params.customer;
  const licence = licences[customer];
  if (!licence) return res.status(404).json({ error: "Customer not found" });
  res.json(licence);
});

router.post("/:customer/deploy", (req, res) => {
  const customer = req.params.customer;
  const status = req.body.status || "valid";
  licences[customer] = {
    customer,
    status,
    aceVersion: "latest",
    aceActive: status === "valid",
  };
  res.json({ message: "ACE deployed", licence: licences[customer] });
});

router.post("/:customer/deactivate", (req, res) => {
  const customer = req.params.customer;
  const status = req.body.status || "expired";
  if (!licences[customer]) return res.status(404).json({ error: "Customer not found" });
  licences[customer].status = status;
  licences[customer].aceVersion = "none";
  licences[customer].aceActive = false;
  res.json({ message: "ACE deactivated", licence: licences[customer] });
});

module.exports = router;