# Movie API

## Project description

  The web application will provide users with access to information about different movies, directors, and genres.    
  Users will be able to sign up, update their personal information, and create a list of their favorite movies.

## Tech stack

-   Frontend: HTML, CSS, JavaScript
-   Backend: Node.js, Express, MongoDB, Mongoose

## What this app does
- The users of the myFlix application will be movie enthusiasts who enjoy reading information about different movies.

- The app will consist of a well-designed REST API and architected database built using JavaScript, Node.js, Express, and MongoDB. The REST API will be accessed via commonly used HTTP methods like GET and POST.

- Whenever users of myFlix are interacting with the application, the server-side of the application will be in use, processing their requests and performing operations against the data in the database. These users will be able to use the myFlix application whenever they like to read information about different movies or update their user information, for instance, their list of “Favorite Movies.”

- The application will be hosted online. The myFlix application itself is responsive and can therefore be used anywhere and on any device, giving all users the same experience.

- Movie enthusiasts want to be able to access information about different movies, directors, and genres. The server-side of the myFlix application will ensure they have access to this information, that their requests can be processed, and that all necessary data can be stored.

## Essential features

- Return a list of ALL movies to the user
- Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
- Return data about a genre (description) by name/title (e.g., “Thriller”)
- Return data about a director (bio, birth year, death year) by name
- Allow new users to register
- Allow users to update their user info (username, password, email, date of birth)
- Allow users to add a movie to their list of favorites
- Allow users to remove a movie from their list of favorites
- Allow existing users to deregister.

## Technical requirements

-   The API _must_ be a Node.js and Express application.
-   The API _must_ use REST architecture, with URL endpoints corresponding to the data operations listed above.
-   The API _must_ use at least three middleware modules, such as the body-parser package for reading data from requests and morgan for logging.
-   The API _must_ use a "package.json" file.
-   The database _must_ be built using MongoDB.
The business logic _must_ be modeled with Mongoose.
-   The API _must_ provide movie information in JSON format.
-   The JavaScript code _must_ be error-free.
-   The API _must_ be tested in Postman.
-   The API _must_ include user authentication and authorization code.
-   The API _must_ include data validation logic.
-   The API _must_ meet data security regulations.
-   The API source code _must_ be deployed to a publicly accessible platform like GitHub.
-   The API _must_ be deployed to Heroku.
