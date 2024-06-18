const { Movie, validate } = require("../models/movie");


exports.getMovie = async (req, res) => {
  const movies = await Movie.find().sort('name');
  res.send(movies);
};

exports.createMovie = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');

  const newMovie = new Movie({
    title: req.body.title,
    movie: {
      _id: movie._id,
      name: movie.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  await movie.save();
  res.send(newMovie);
};

exports.updateMovie = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');

  const updatedMovie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      movie: {
        _id: movie._id,
        name: movie.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );

  if (!movie)
    return res.status(404).send('The movie with the given ID was not found.');

  res.send(updatedMovie);
};

exports.deleteMovie = async (req, res) => {
  const movie = await Movie.findOneAndDelete({ _id: req.params.id });

  if (!movie) {
    return res.status(404).send('The movie with the given ID was not found.');
  }

  res.send(movie);
};

exports.getMovieById = async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie)
    return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
};