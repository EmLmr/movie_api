const express = require('express')
  morgan = require('morgan');

const app = express();

let topMovies = [
    {
        title: 'The Grand Budapest Hotel',
        year: '2014',
        genres: ['Adventure', 'Comedy', 'Crime'],
        description: 'A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel\'s glorious years under an exceptional concierge.',
        director:'Wes Anderson'
    },

    {
        title: 'Death Proof',
        year: '2007',
        genres: ['Action', 'Adventure', 'Thriller'],
        description: 'Two separate sets of voluptuous women are stalked at different times by a scarred stuntman who uses his "death proof" cars to execute his murderous plans.',
        director: 'Quentin Tarantino'
    },

    {
        title: 'The Lord of the Rings: the Return of the King',
        year: '2003',
        genres: ['Action', 'Adventure', 'Drama'],
        description: 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.',
        director: 'Peter Jackson'
    },

    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        year: '1980',
        genres: ['Action', 'Adventure', 'Fantasy'],
        description: 'After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued across the galaxy by Darth Vader and bounty hunter Boba Fett.',
        director: 'Irvin Kershner'
    },

    {
        title: 'Edward Scissorhands',
        year: '1990',
        genres: ['Drama', 'Fantasy', 'Romance'],
        description: 'An artificial man, who was incompletely constructed and has scissors for hands, leads a solitary life. Then one day, a suburban lady meets him and introduces him to her world.',
        director: 'Tim Burton'
    },

    {
        title: 'Django Unchained',
        year: '2012',
        genres: ['Drama', 'Western'],
        description: 'With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal plantation-owner in Mississippi.',
        director: 'Quentin Tarentino'
    },

    {
        title: 'Get Out',
        year: '2017',
        genre: ['Horror', 'Mystery', 'Thriller'],
        description: 'A young African-American visits his white girlfriend\'s parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.',
        director: 'Jordan Peele'
    },

    {
        title: 'Shrek 2',
        year: '2004',
        genre: ['Animation', 'Adventure', 'Comedy'],
        description: 'Shrek and Fiona travel to the Kingdom of Far Far Away, where Fiona\'s parents are King and Queen, to celebrate their marriage. When they arrive, they find they are not as welcome as they thought they would be.',
        directors: ['Andrew Adamson','Kelly Asbury', 'Conrad Vernon']
    },

    {
        title: 'Moonrise Kingdom',
        year: '2012',
        genre: ['Comedy', 'Drama', 'Romance'],
        description: 'A pair of young lovers flee their New England town, which causes a local search party to fan out to find them.',
        director: 'Wes Anderson'
    },

    {
        title: 'Moana',
        year: '2016',
        genres: ['Animation', 'Adventure', 'Comedy'],
        description: 'In Ancient Polynesia, when a terrible curse incurred by the Demigod Maui reaches Moana\'s island, she answers the Ocean\'s call to seek out the Demigod to set things right.',
        directors: ['Ron Clements', 'John Musker']
    }
];

app.use(express.static('public'));
app.use(morgan('common'));

// GET request to default textual response
app.get('/', (req, res) => {
  res.send('Welcome to my (small-for-now) movie library!');
});

// GET to the /movies endpoint
app.get('/movies', (req, res) => {
    res.json(topMovies);
});

// error-handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
