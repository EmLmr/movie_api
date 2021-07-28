const express = require('express')
  morgan = require('morgan');

const app = express();

// let topMovies = [
//     {
//         title: 'The Grand Budapest Hotel',
//         year: ,
//         genre: ,
//         description: ,
//         director: {
//             fullName: 'Wes Anderson',
//             image:
//         }
//     },
//
//     {
//         title: 'Death Proof',
//         year: ,
//         genre: ,
//         description: ,
//         director: {
//             fullName: 'Quentin Tarantino',
//             image:
//         }
//     },
//
//     {
//         title: 'The Lord of the Rings: the Return of the King',
//         year: ,
//         genre: ,
//         description: ,
//         director: {
//             fullName: 'Peter Jackson',
//             image:
//         }
//     },
//
//     {
//         title: 'Star Wars: Episode V - The Empire Strikes Back',
//         year: ,
//         genre: ,
//         description: ,
//         director: {
//             fullName: 'Irvin Kershner',
//             image:
//         }
//     },
//
//     {
//         title: 'Edward Scissorhands',
//         year: ,
//         genre: ,
//         description: ,
//         director: {
//             fullName: 'Tim Burton',
//             image:
//         }
//     },
//
//     {
//         title: 'Django Unchained',
//         year: ,
//         genre: ,
//         description: ,
//         director: {
//             fullName: 'Quentin Tarentino',
//             image:
//         }
//     },
//
//     {
//         title: 'Get Out',
//         year: ,
//         genre: ,
//         description: ,
//         director: {
//             fullName: 'Jordan Peele',
//             image:
//         }
//     },
//
//     {
//         title: 'Shrek 2',
//         year: ,
//         genre: ,
//         description: ,
//         directors: {
//             fullName: 'Andrew Adamson',
//             image:
//         },
//         {
//           fullName: 'Kelly Asbury',
//           image:
//       },
//       {
//         fullName: 'Conrad Vernon',
//         image:
//       }
//     },
//
//     {
//         title: 'Moonrise Kingdom',
//         year: ,
//         genre: ,
//         description: ,
//         director: {
//             fullName: 'Wes Anderson',
//             image:
//         }
//     },
//
//     {
//         title: 'Moana',
//         year: ,
//         genre: ,
//         description: ,
//         directors: {
//             fullName: 'Ron Clements',
//             image:
//         },
//         {
//           fullName: 'John Musker',
//           image:
//       }
//     }
// ];

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
