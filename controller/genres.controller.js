const { Genre, validateGenre } = require("../models/model.genres");
// const mongoose = require("mongoose");


exports.getGenres = async (req, res) => {
  try {
    const genres = await Genre.find().sort("name");
    res.send(genres);
  } catch (error) {
    res.status(500).send("Something failed..");
  }
};
exports.createGenre = async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
};

exports.updateGenre = async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
};
exports.deleteGenre = async (req, res) => {
  const genre = await Genre.findOneAndDelete({ _id: req.params.id });

  if (!genre) {
    return res.status(404).send("The genre with the given ID was not found.");
  }

  res.send(genre);
};