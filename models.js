const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
  Title: {
    type: String,
    required: true
  },
  ImageURL: String,
  Year: String,
  Genre: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre'
  }],
  Description: {
    type: String,
    required: true
  },
  Director: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Director'
  }],
  Actors: [String],
  Featured: Boolean
});

let userSchema = mongoose.Schema({
  Username: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Birthday: Date,
  FavoriteMovies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'
  }]
});

let genreSchema = mongoose.Schema({
  Gname: {
    type: String,
    required: true
  },
  Gdescription: {
    type: String,
    required: true
  },
});

let directorSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Bio: {
    type: String,
    required: true
  },
  Born: {
    type: Date,
    required: true
  },
  Died: Date,
});

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);
let Genre = mongoose.model('Genre', genreSchema);
let Director = mongoose.model('Director', directorSchema);

module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Genre = Genre;
module.exports.Director = Director;
