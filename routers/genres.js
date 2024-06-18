
const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {
  getGenres,
  createGenre,
  updateGenre,
  deleteGenre,
} = require("../controller/genres.controller");
const router = express.Router();

router.get("/", getGenres);
router.post("/", auth, createGenre);
router.put("/:id", auth, updateGenre);
router.delete("/:id", [auth, admin], deleteGenre);

module.exports = router;