const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const mongoose = require('mongoose');
const Models = require('./models.js');
const { check, validationResult } = require('express-validator');

const app = express();
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

const cors = require('cors');
let allowedOrigins = [
    'http://localhost:8080',
    'https://flickspicks.herokuapp.com/',
    'https://flickspicks.herokuapp.com',
    'http://localhost:1234',
    'https://flickspicks.netlify.app',
    'http://localhost:4200',
    'https://emlmr.github.io/',
    'https://emlmr.github.io',
    'https://emlmr.github.io/FlicksPicks-Angular-client/'
    'https://emlmr.github.io/FlicksPicks-Angular-client',
    
  
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                // If a specific origin isn’t found on the list of allowed origins
                let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
                return callback(new Error(message), false);
            }
            return callback(null, true);
        },
    })
);

const passport = require('passport');
require('./passport');

app.use(express.static('public'));
app.use(morgan('common'));

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

// mongoose.connect('mongodb://localhost:27017/myFlixDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

mongoose.connect(process.env.CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let auth = require('./auth')(app);

/**
 * Get the welcome page
 * @method GET
 * @param {string} endpoint - endpoint to load the welcome page
 * @returns {object} - returns the welcome page
 */
app.get('/', (req, res) => {
    res.send('Welcome to my (small-for-now) movie library!');
});

/**
 * Get the documentation
 * @method GET
 * @param {string} endpoint - endpoint to load the documentation
 * @returns {object} - returns the documentation
 */
app.get('/documentation', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/documentation.html'));
});

//-----MOVIE REQUESTS-----//
/**
 * Get all movies
 * @method GET
 * @param {string} endpoint - endpoint to fetch all movies
 * @returns {object} - returns the movie object
 */
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.find()
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

/**
 * Get a single movie
 * @method GET
 * @param {string} endpoint - endpoint to fetch a single movie, by title
 * @returns {object} - returns a single movie object
 */
app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({
        Title: req.params.Title,
    })
        .then((movie) => {
            res.json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//-----GENRE REQUESTS-----//
/**
 * Get all genres
 * @method GET
 * @param {string} endpoint - endpoint to fetch all genres
 * @returns {object} - returns the genre object
 */
app.get('/genres', passport.authenticate('jwt', { session: false }), (req, res) => {
    Genres.find()
        .then((genres) => {
            res.status(201).json(genres);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

/**
 * Get a single genre
 * @method GET
 * @param {string} endpoint - endpoint to fetch a single genre, by genre name
 * @returns {object} - returns a single genre object
 */
app.get('/genres/:Gname', passport.authenticate('jwt', { session: false }), (req, res) => {
    Genres.findOne({
        Gname: req.params.Gname,
    })
        .then((genre) => {
            res.json(genre);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//-----DIRECTOR REQUESTS-----//
/**
 * Get all directors
 * @method GET
 * @param {string} endpoint - endpoint to fetch all directors
 * @returns {object} - returns the director object
 */
app.get('/directors', passport.authenticate('jwt', { session: false }), (req, res) => {
    Directors.find()
        .then((directors) => {
            res.status(201).json(directors);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

/**
 * Get a single director
 * @method GET
 * @param {string} endpoint - endpoint to fetch a single director, by director name
 * @returns {object} - returns a single director object
 */
app.get('/directors/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
    Directors.findOne({
        Name: req.params.Name,
    })
        .then((director) => {
            res.json(director);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//-----USER REQUESTS-----//
/**
 * Get all users
 * @method GET
 * @param {string} endpoint - endpoint to fetch all users
 * @returns {object} - returns the user object
 */ app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
    //search all users
    Users.find()
        .then((users) => {
            res.status(201).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

/**
 * Get a single user
 * @method GET
 * @param {string} endpoint - endpoint to fetch a single user, by username
 * @returns {object} - returns a single user object
 */
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    //search user by username
    Users.findOne({
        Username: req.params.Username,
    })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

/**
 * Add user
 * @method POST
 * @param {string} endpoint - endpoint to add user
 * @param {string} Username - user's username
 * @param {string} Password - user's password
 * @param {string} Email - user's e-mail address
 * @param {string} Birthday - user's date of birth
 * @returns {object} - new user
 */
app.post(
    '/users',
    [
        // user input validation logic
        check('Username', 'Username is required').isLength({ min: 5 }),
        check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
        check('Password', 'Password is required').not().isEmpty(),
        check('Email', 'Email does not appear to be valid').isEmail(),
        //     check("Birthday", "Invalid date format. Please use YYYY-MM-DD format.").isISO8601().toDate(),
    ],
    (req, res) => {
        // check validation object for errors
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        // store the hashed password
        let hashedPassword = Users.hashPassword(req.body.Password);

        //search user by username
        Users.findOne({
            Username: req.body.Username,
        })
            .then((user) => {
                if (user) {
                    return res.status(400).send(req.body.Username + 'already exists. Please choose another username.');
                } else {
                    Users.create({
                        Username: req.body.Username,
                        Password: hashedPassword,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday,
                    })
                        .then((user) => {
                            res.status(201).json(user);
                        })
                        .catch((error) => {
                            console.error(error);
                            res.status(500).send('Error: ' + error);
                        });
                }
            })
            .catch((error) => {
                console.error(error);
                res.status(500).send('Error: ' + error);
            });
    }
);

/**
 * Update user info by username
 * @method PUT
 * @param {string} endpoint - endpoint to update user info
 * @param {string} Username - user's new username
 * @param {string} Password - user's new password
 * @param {string} Email - user's new e-mail address
 * @param {string} Birthday - user's new date of birth
 * @returns {string} - returns success/error message
 */
app.put(
    '/users/:Username',
    [
        // user input validation logic
        check('Username', 'Username is required').isLength({ min: 5 }),
        check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
        check('Password', 'Password is required').not().isEmpty(),
        check('Email', 'Email does not appear to be valid').isEmail(),
        //     check("Birthday", "Invalid date format. Please use YYYY-MM-DD format.").isISO8601().toDate(),
    ],
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        // check validation object for errors
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        // store the hashed password
        let hashedPassword = Users.hashPassword(req.body.Password);

        //search user by username and update their data
        Users.findOneAndUpdate(
            {
                Username: req.params.Username,
            },
            {
                // updates all the user info
                $set: {
                    Username: req.body.Username,
                    Password: hashedPassword,
                    Email: req.body.Email,
                    Birthday: req.body.Birthday,
                },
            },
            //returns the updated document
            { new: true },
            (err, updatedUser) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error: ' + err);
                } else {
                    res.json(updatedUser);
                }
            }
        );
    }
);

/**
 * Delete user by username
 * @method DELETE
 * @param {string} endpoint - endpoint to delete user by username
 * @param {string} Username - is used to delete specific user, by username
 * @returns {string} - returns success/error message
 */
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    //search user by username and delete their data
    Users.findOneAndDelete({
        Username: req.params.Username,
    })
        .then((user) => {
            if (!user) {
                res.status(400).send(req.params.Username + ' could not be found.');
            } else {
                res.status(200).send(req.params.Username + ' has been successfully deleted!');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

/**
 * Add movie to favorites
 * @method POST
 * @param {string} endpoint - endpoint to add movies to favorites
 * @param {string} Username - is used to target the specific user, by username
 * @param {string} MovieID - is used to target the specific movie, by ID
 * @returns {string} - returns success/error message
 */
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
    //search user by username and update their data
    Users.findOneAndUpdate(
        { Username: req.params.Username },
        {
            $push: { FavoriteMovies: req.params.MovieID },
        },
        //returns the updated document
        { new: true },
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        }
    );
});

/**
 * Delete movie from favorites
 * @method DELETE
 * @param {string} endpoint - endpoint to remove movies from favorites
 * @param {string} Username - is used to target the specific user, by username
 * @param {string} MovieID - is used to target the specific movie, by ID
 * @returns {string} - returns success/error message
 */
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
    //search user by username and update their data
    Users.findOneAndUpdate(
        { Username: req.params.Username },
        {
            $pull: { FavoriteMovies: req.params.MovieID },
        },
        //returns the updated document
        { new: true },
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        }
    );
});

//error-handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//listen for requests on the specified port
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log('Listening on port' + port);
});
