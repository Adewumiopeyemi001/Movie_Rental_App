
const express = require("express");
const router = express.Router();
const {rentals, createRental, getRentalById} = require("../controller/rentals.controller")


router.get("/", rentals);
router.post("/", createRental);
router.get("/:id", getRentalById);


module.exports = router;