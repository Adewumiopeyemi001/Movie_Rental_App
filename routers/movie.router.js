const { getMovie, createMovie, updateMovie, deleteMovie, getMovieById } = require("../controller/movie.controller");

const express = require("express");
const router = express.Router();

router.get("/", getMovie);
router.post('/', createMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);
router.get('/:id', getMovieById);

module.exports = router;
