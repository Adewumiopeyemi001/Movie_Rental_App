const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { myself, register } = require("../controller/user.controller");

router.get("/me", auth, myself);
router.post("/", register);

module.exports = router;
