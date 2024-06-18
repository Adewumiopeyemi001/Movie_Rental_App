const mongoose = require('mongoose');
const dotenv = require('dotenv');
const genres = require('./routers/genres');
const customers = require('./routers/customer');
const movies = require('./routers/movie.router');
const rentals = require('./routers/rental.js');
const users = require('./routers/user.js');
const auth = require('./routers/auth.js');
const express = require('express');
const app = express();

dotenv.config();

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.get("/", async (req, res) => {
  res.send("Welcome to Our Movie Rental App")
});
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));