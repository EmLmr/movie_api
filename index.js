const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const app = express();

const movies = [
  {
    title: 'The Grand Budapest Hotel',
    imageURL: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fa4.mzstatic.com%2Fus%2Fr30%2FVideo%2Fv4%2F7c%2Fb7%2F7f%2F7cb77f12-7ba5-9737-4cd6-80ea26ab27be%2Fmza_1938055799826039024.jpg&f=1&nofb=1',
    year: '2014',
    genre: {
      gname: 'Adventure',
      gdescription: 'Implies a narrative that is defined by a journey (often including some form of pursuit) and is usually located within a fantasy or exoticized setting. Typically, though not always, such stories include the quest narrative. The predominant emphasis on violence and fighting in action films is the typical difference between the two genres.'
    },
    description: 'A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel\'s glorious years under an exceptional concierge.',
    director: {
      name: 'Wes Anderson',
      bio: 'Wesley Wales Anderson is an American filmmaker. His films are known for their symmetry, eccentricity and distinctive visual and narrative styles, and he is cited by some critics as a modern-day example of the auteur. Three of his films – The Royal Tenenbaums, Moonrise Kingdom, and The Grand Budapest Hotel – appeared in BBC Culture\'s 2016 poll of the greatest films since 2000.',
      born: '01.05.1969',
      died: '-'
    },
    featured: 'yes'
  },

  {
    title: 'Death Proof',
    imageURL: 'https://filmeserialegratis.org/wp-content/uploads/2020/04/dovada-mortii-79984-poster.jpg',
    year: '2007',
    genre: {
      gname: 'Action',
      gdescription: 'Associated with particular types of spectacle (e.g., explosions, chases, combat).'
    },
    description: 'Two separate sets of voluptuous women are stalked at different times by a scarred stuntman who uses his "death proof" cars to execute his murderous plans.',
    director: {
      name: 'Quentin Tarantino',
      bio: 'Quentin Jerome Tarantino is an American film director, screenwriter, producer, author, film critic, and actor. His films are characterized by nonlinear storylines, dark humor, stylized violence, extended dialogue, ensemble casts, references to popular culture, alternate history, and neo-noir.',
      born: '27.03.1963',
      died: '-'
    },
    featured: 'yes'
  },

  {
    title: 'The Lord of the Rings: the Return of the King',
    imageURL: 'https://image.tmdb.org/t/p/original/uexxR7Kw1qYbZk0RYaF9Rx5ykbj.jpg',
    year: '2003',
    genre: {
      gname: 'Action',
      gdescription: 'Associated with particular types of spectacle (e.g., explosions, chases, combat).'
    },
    description: 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.',
    director: {
      name: 'Peter Jackson',
      bio: 'Sir Peter Robert Jackson is a New Zealand film director, producer, and screenwriter. He is best known as the director, writer, and producer of the Lord of the Rings trilogy (2001–03), a King Kong remake (2005) and the Hobbit trilogy (2012–14), both of trilogies are adapted from the novels of the same name by J. R. R. Tolkien. He is the third-highest-grossing film director of all time, his films having made over $6.5 billion worldwide.',
      born: '31.10.1961',
      died: '-'
    },
    featured: 'yes'
  },

  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    imageURL: 'https://movieswithaplottwist.com/wp-content/uploads/2019/01/starwarsposter.jpg',
    year: '1980',
    genre: {
      gname: 'Action',
      gdescription: 'Associated with particular types of spectacle (e.g., explosions, chases, combat).'
    },
    description: 'After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued across the galaxy by Darth Vader and bounty hunter Boba Fett.',
    director: {
      name: 'Irvin Kershner',
      bio: 'Irvin Kershner (born Isadore Kershner) was an American director, actor, and producer of film and television.',
      born: '29.04.1923',
      died: '27.11.2010'
    },
    featured: 'yes'
  },

  {
    title: 'Edward Scissorhands',
    imageURL: 'http://img.auctiva.com/imgdata/1/1/7/9/1/0/1/webimg/559134323_o.jpg',
    year: '1990',
    genre: {
      gname: 'Drama',
      gdescription: 'Focused on emotions and defined by conflict, often looking to reality rather than sensationalism.'
    },
    description: 'An artificial man, who was incompletely constructed and has scissors for hands, leads a solitary life. Then one day, a suburban lady meets him and introduces him to her world.',
    director: {
      name: 'Tim Burton',
      bio: 'Timothy Walter Burton is an American film director, producer, writer, and artist known for his gothic fantasy and horror films such as Beetlejuice (1988), Edward Scissorhands (1990), Ed Wood (1994), Sleepy Hollow (1999), Corpse Bride (2005), Sweeney Todd: The Demon Barber of Fleet Street (2007), and Frankenweenie (2012). Burton also directed the superhero films Batman (1989) and Batman Returns (1992), the sci-fi film Planet of the Apes (2001), the fantasy-drama Big Fish (2003), the musical adventure film Charlie and the Chocolate Factory (2005), and the fantasy films Alice in Wonderland (2010) and Miss Peregrine\'s Home for Peculiar Children (2016).',
      born: '25.08.1958',
      died: '-'
    },
    featured: 'yes'
  },

  {
    title: 'Django Unchained',
    imageURL: 'https://vignette2.wikia.nocookie.net/filmguide/images/b/bb/Django-unchained-final-american-movie-poster.jpg/revision/latest?cb=20150109055254',
    year: '2012',
    genre: {
      gname: 'Drama',
      gdescription: 'Focused on emotions and defined by conflict, often looking to reality rather than sensationalism.'
    },
    description: 'With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal plantation-owner in Mississippi.',
    director: {
      name: 'Quentin Tarantino',
      bio: 'Quentin Jerome Tarantino is an American film director, screenwriter, producer, author, film critic, and actor. His films are characterized by nonlinear storylines, dark humor, stylized violence, extended dialogue, ensemble casts, references to popular culture, alternate history, and neo-noir.',
      born: '27.03.1963',
      died: '-'
    },
    featured: 'yes'
  },

  {
    title: 'Get Out',
    imageURL: 'https://image.tmdb.org/t/p/original/mE24wUCfjK8AoBBjaMjho7Rczr7.jpg',
    year: '2017',
    genre: {
      gname: 'Horror',
      gdescription: 'A horror film is one that seeks to elicit fear or disgust in its audience for entertainment purposes. Horror films additionally aim to evoke viewers\' nightmares, revulsions and terror of the unknown or the macabre.'
    },
    description: 'A young African-American visits his white girlfriend\'s parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.',
    director: {
      name: 'Jordan Peele',
      bio: 'Jordan Haworth Peele is an American actor, comedian and filmmaker. He is best known for his film and television work in the comedy and horror genres.',
      born: '21.02.1979',
      died: '-'
    },
    featured: 'yes'
  },

  {
    title: 'Shrek 2',
    imageURL: 'https://image.tmdb.org/t/p/w1280/oljiDFPyMY437BRRV69AzVDSiKy.jpg',
    year: '2004',
    genre: {
      gname: 'Animation',
      gdescription: 'A film medium in which the film’s images are primarily created by computer or hand and the characters are voiced by actors.[17] Animation can otherwise incorporate any genre and subgenre[2] and is often confused as a genre itself.'
    },
    description: 'Shrek and Fiona travel to the Kingdom of Far Far Away, where Fiona\'s parents are King and Queen, to celebrate their marriage. When they arrive, they find they are not as welcome as they thought they would be.',
    director: [
      {
        name: 'Andrew Adamson',
        bio: 'Andrew Ralph Adamson MNZM (born 1 December 1966) is a New Zealander film director, producer, and screenwriter based in Los Angeles, where he directed the Academy Award-winning animated films Shrek and Shrek 2. He was director, executive producer, and scriptwriter for the 2005 production of The Chronicles of Narnia: The Lion, the Witch and the Wardrobe. He also worked on the movies Batman Forever and Batman & Robin as a visual effects supervisor.',
        born: '01.12.1966',
        died: '-'
      },
      {
        name: 'Kelly Asbury',
        bio: 'Kelly Adam Asbury was an American animated film director, screenwriter, voice actor, published children\'s book author/illustrator, and non-fiction author. He was best known for directing animated films, including Shrek 2, Spirit: Stallion of the Cimarron, Gnomeo & Juliet, Smurfs: The Lost Village, and UglyDolls.',
        born: '15.01.1960',
        died: '26.06.2020'
      },
      {
        name: 'Conrad Vernon',
        bio: 'Conrad Vernon was born on July 11, 1968 in Lubbock, Texas, USA as Conrad Vernon IV. He is an actor and producer, known for Shrek 2 (2004), Monsters vs. Aliens (2009) and Shrek (2001).',
        born: '11.07.1968',
        died: '-'
      }
    ],
    featured: 'yes'
  },

  {
    title: 'Moonrise Kingdom',
    imageURL: 'https://is5-ssl.mzstatic.com/image/thumb/Video/v4/e8/14/c6/e814c6aa-6ff1-99f2-4d2b-45b045f4aff9/mza_901933579579271147.jpg/268x0w.jpg',
    year: '2012',
    genre: {
      gname: 'Comedy',
      gdescription: 'Defined by events that are primarily intended to make the audience laugh.'
    },
    description: 'A pair of young lovers flee their New England town, which causes a local search party to fan out to find them.',
    director: {
      name: 'Wes Anderson',
      bio: 'Wesley Wales Anderson is an American filmmaker. His films are known for their symmetry, eccentricity and distinctive visual and narrative styles, and he is cited by some critics as a modern-day example of the auteur. Three of his films – The Royal Tenenbaums, Moonrise Kingdom, and The Grand Budapest Hotel – appeared in BBC Culture\'s 2016 poll of the greatest films since 2000.',
      born: '01.05.1969',
      died: '-'
    },
    featured: 'yes'
  },

  {
    title: 'Moana',
    imageURL: 'https://thedisneyblog.com/wp-content/uploads/2016/09/moana-poster-new.jpg',
    year: '2016',
    genre: {
      gname: 'Animation',
      gdescription: 'A film medium in which the film’s images are primarily created by computer or hand and the characters are voiced by actors.[17] Animation can otherwise incorporate any genre and subgenre[2] and is often confused as a genre itself.'
    },
    description: 'In Ancient Polynesia, when a terrible curse incurred by the Demigod Maui reaches Moana\'s island, she answers the Ocean\'s call to seek out the Demigod to set things right.',
    director: [
      {
        name: 'Ron Clements',
        bio: 'Ronald Francis Clements (born April 25, 1953) is an American animator, screenwriter, film director and producer. He often collaborates with fellow director John Musker.',
        born: '25.04.1953',
        died: '-'
      },
      {
        name: 'John Musker',
        bio: 'John Edward Musker (born November 8, 1953) is an American animator, film director, screenwriter, and film producer. He often collaborates with fellow director Ron Clements.',
        born: '08.11.1953',
        died: '-'
      }
    ],
    featured: 'yes'
  }
];

const users = [
  {
  username: 'JohnDoe',
  password: 'hisPassword123!',
  email: 'johnDoe@gmail.com',
  dob: '2000-06-21'
  },
  {
  username: 'JaneDoe',
  password: 'herPassword123!',
  email: 'janeDoe@gmail.com',
  dob: '1990-12-31'
  },
  {
  username: 'Martin88',
  password: 'S0m3Paswword',
  email: 'martin.h@outlook.com',
  dob: '1988-02-18'
  }
];

app.use(express.static('public'));
app.use(morgan('common'));
app.use(bodyParser.json());

// GET request to default textual response.
app.get('/', (req, res) => {
  res.send('Welcome to my (small-for-now) movie library!');
});

// Return "documentation" page.
app.get('/documentation', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/documentation.html'));
});

// Movie request - Return all movies.
app.get('/movies', (req, res) => {
  res.json(movies);
});

// Movie request - Return data about a single movie, by title.
app.get('/movies/:title', (req, res) => {
  res.json(movies.find((movie) => {
    return movie.title === req.params.title;
  }));
});

// Movie request - Return data about a genre, by movie title.
app.get('/movies/genres/:genre', (req, res) => {
  res.json(movies.find((movie) => {
    return movie.genre === req.params.genre;
  }));
});

// Movie request - Return data about a director, by name.
app.get('/movies/directors/:name', (req, res) => {
  res.json(movies.find((movie) => {
    return movie.director.name === req.params.name;
  }));
});

// User request - Return users data.
app.get('/users', (req, res) => {
  res.json(users);
});

// |||FIX - success msg not appearing||| User request - Allow new users to register.
app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.username) {
    const newUserFail = 'Please type a username.';
    res.status(400).send(newUserFail);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    const newUserSuccess = 'The new user has been created!';
    res.status(201).send(success);
  }
});

// User request - Allow users to update their username.
app.put('/users/:username', (req, res) => {
  let user = users.find((user) => user.username === req.params.username);

  if (!user) {
    res.status(404).send('User with the name' + ' "' + req.params.username + '" ' + 'was not found.');
  } else {
    user.username = req.body.username;
    res.status(201).send('User ' + ' "' + req.params.username + '" ' + ' changed their name to: ' + user.username);
  }
});

// |||TO FIX||| User request - Allow existing users to deregister, by ID.
app.delete('/users/:id', (req, res) => {
  let user = users.find((user) => { return user.id === req.params.id });

  if(user) {
    // users = users.filter((obj) => { return obj.id !== req.params.id });
    res.status(201).send('User' + ' "' + req.params.id + '" ' + 'has been successfully deregistered.');
  } else {
      res.status(404).send('User' + '" ' + req.params.id + '" ' + 'was not found.');
  }
});

// |||FIX - success msg not appearing||| User request - Allow users to add a movie to their favorites.
app.post('/users/:id/favorites/:title', (req, res) => {
  let newMovie = req.body;

  if (!newMovie.title) {
    const newMovFail = 'Missing title in request body.';
    res.status(400).send(newMovFail);
  } else {
    newMovie.id = uuid.v4();
    movies.push(newMovie);
    const newMovSuccess = 'Movie successfully added to favorites!';
    res.status(201).send(newMovie);
  }
});

// User request - Allow users to remove a movie from their favorites.
app.delete('/users/:id/favorites/:title', (req, res) => {
	let userFavorite = movies.find((movie) =>
	res.send('Movie deleted from favorites'));
});

// error-handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
