const express = require("express");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const mongoose = require("mongoose");
const Models = require("./models.js");
const { check, validationResult } = require("express-validator");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const cors = require("cors");
let allowedOrigins = [
  "http://localhost:8080",
  "https://flickspicks.herokuapp.com/",
  "http://localhost:1234",
  "https://flickspicks.netlify.app/",
  "http://localhost:4200"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        // If a specific origin isn’t found on the list of allowed origins
        let message = "The CORS policy for this application doesn’t allow access from origin " + origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);

const passport = require("passport");
require("./passport");

app.use(express.static("public"));
app.use(morgan("common"));

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

let auth = require("./auth")(app);

// GET request to default textual response.
app.get("/", (req, res) => {
  res.send("Welcome to my (small-for-now) movie library!");
});

// Return "documentation" page.
app.get("/documentation", (req, res) => {
  res.sendFile(path.join(__dirname, "public/documentation.html"));
});

// Movie request - Return all movies.
app.get("/movies", passport.authenticate("jwt", { session: false }), (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Movie request - Return data about a single movie, by title.
app.get("/movies/:Title", passport.authenticate("jwt", { session: false }), (req, res) => {
  Movies.findOne({
    Title: req.params.Title,
  })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Movie request - Return all genres.
app.get("/genres", passport.authenticate("jwt", { session: false }), (req, res) => {
  Genres.find()
    .then((genres) => {
      res.status(201).json(genres);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Movie request - Return data about a genre, by genre name.
app.get("/genres/:Gname", passport.authenticate("jwt", { session: false }), (req, res) => {
  Genres.findOne({
    Gname: req.params.Gname,
  })
    .then((genre) => {
      res.json(genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Director request - Return all directors.
app.get("/directors", passport.authenticate("jwt", { session: false }), (req, res) => {
  Directors.find()
    .then((directors) => {
      res.status(201).json(directors);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Director request - Return data about a director, by name.
app.get("/directors/:Name", passport.authenticate("jwt", { session: false }), (req, res) => {
  Directors.findOne({
    Name: req.params.Name,
  })
    .then((director) => {
      res.json(director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// User request - Return all users.
app.get("/users", passport.authenticate("jwt", { session: false }), (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// User request - Return user by username.
app.get("/users/:Username", passport.authenticate("jwt", { session: false }), (req, res) => {
  Users.findOne({
    Username: req.params.Username,
  })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// User request - Allow new users to register.
app.post(
  "/users",
  [
    // user input validation logic
    check("Username", "Username is required").isLength({ min: 5 }),
    check("Username", "Username contains non alphanumeric characters - not allowed.").isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
    //     check("Birthday", "Invalid date format. Please use YYYY-MM-DD format.").isISO8601().toDate(),
  ],
  (req, res) => {
    // check validation object for errors
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password); // stores the hashed password

    Users.findOne({
      Username: req.body.Username,
    })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + "already exists. Please choose another username.");
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword, // creates hashed password
            Email: req.body.Email,
            Birthday: req.body.Birthday,
          })
            .then((user) => {
              res.status(201).json(user);
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send("Error: " + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

// User request - Allow users to update their user info (username, password, email, dob).
app.put(
  "/users/:Username",
  [
    // user input validation logic
    check("Username", "Username is required").isLength({ min: 5 }),
    check("Username", "Username contains non alphanumeric characters - not allowed.").isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
    //     check("Birthday", "Invalid date format. Please use YYYY-MM-DD format.").isISO8601().toDate(),
  ],
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // check validation object for errors
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password); // stores the hashed password

    Users.findOneAndUpdate(
      {
        Username: req.params.Username,
      },
      {
        $set: {
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        }, // updates all the user info
      },
      {
        new: true,
      },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

// User request - Allow existing users to deregister, by username.
app.delete("/users/:Username", passport.authenticate("jwt", { session: false }), (req, res) => {
  Users.findOneAndDelete({
    Username: req.params.Username,
  })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + " could not be found.");
      } else {
        res.status(200).send(req.params.Username + " has been successfully deleted!");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// User request - Allow users to add a movie to their favorites.
app.post("/users/:Username/movies/:MovieID", passport.authenticate("jwt", { session: false }), (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $push: { FavoriteMovies: req.params.MovieID },
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// User request - Allow users to remove a movie from their favorites.
app.delete("/users/:Username/movies/:MovieID", passport.authenticate("jwt", { session: false }), (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $pull: { FavoriteMovies: req.params.MovieID },
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// error-handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log("Listening on port" + port);
});
