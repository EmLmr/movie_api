const express = require('express')
morgan = require('morgan');

const app = express();

const movies = [{
    title: 'The Grand Budapest Hotel',
    imageURL: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fa4.mzstatic.com%2Fus%2Fr30%2FVideo%2Fv4%2F7c%2Fb7%2F7f%2F7cb77f12-7ba5-9737-4cd6-80ea26ab27be%2Fmza_1938055799826039024.jpg&f=1&nofb=1',
    year: '2014',
    genres: ['Adventure', 'Comedy', 'Crime'],
    description: 'A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel\'s glorious years under an exceptional concierge.',
    director: {
      name: 'Wes Anderson',
      bio: 'Wesley Wales Anderson was born in Houston, Texas. His mother, Texas Ann (Burroughs), is an archaeologist turned real estate agent, and his father, Melver Leonard Anderson, worked in advertising and PR. He has two brothers, Eric and Mel. Anderson\'s parents divorced when he was a young child, an event that he described as the most crucial event of his brothers and his growing up. During childhood, Anderson also began writing plays and making super-8 movies. He was educated at Westchester High School and then St. John\'s, a private prep school in Houston, Texas, which was later to prove an inspiration for the film Rushmore (1998). Anderson attended the University of Texas in Austin, where he majored in philosophy. It was there that he met Owen Wilson. They became friends and began making short films, some of which aired on a local cable-access station. One of their shorts was Bottle Rocket (1994), which starred Owen and his brother Luke Wilson. The short was screened at the Sundance Film Festival, where it was successfully received, so much so that they received funding to make a feature-length version. Bottle Rocket (1996) was not a commercial hit, but it gained a cult audience and high-profile fans, which included Martin Scorsese. Success followed with films such as Rushmore (1998), The Life Aquatic with Steve Zissou (2004), The Royal Tenenbaums (2001) and an animated feature, Fantastic Mr. Fox (2009). The latter two films earned Anderson Oscar nominations.',
      born: '01.05.1969',
      died: '-'
    },
    featured: 'false'
  },

  {
    title: 'Death Proof',
    imageURL: 'https://filmeserialegratis.org/wp-content/uploads/2020/04/dovada-mortii-79984-poster.jpg',
    year: '2007',
    genres: ['Action', 'Adventure', 'Thriller'],
    description: 'Two separate sets of voluptuous women are stalked at different times by a scarred stuntman who uses his "death proof" cars to execute his murderous plans.',
    director: {
      name: 'Quentin Tarantino',
      bio: 'Quentin Jerome Tarantino was born in Knoxville, Tennessee. His father, Tony Tarantino, is an Italian-American actor and musician from New York, and his mother, Connie (McHugh), is a nurse from Tennessee. Quentin moved with his mother to Torrance, California, when he was four years old. In January of 1992, first-time writer-director Tarantino\'s Reservoir Dogs (1992) appeared at the Sundance Film Festival. The film garnered critical acclaim and the director became a legend immediately. Two years later, he followed up Dogs success with Pulp Fiction (1994) which premiered at the Cannes film festival, winning the coveted Palme D\'Or Award. At the 1995 Academy Awards, it was nominated for the best picture, best director and best original screenplay. Tarantino and writing partner Roger Avary came away with the award only for best original screenplay. In 1995, Tarantino directed one fourth of the anthology Four Rooms (1995) with friends and fellow auteurs Alexandre Rockwell, Robert Rodriguez and Allison Anders. The film opened December 25 in the United States to very weak reviews. Tarantino\'s next film was From Dusk Till Dawn (1996), a vampire/crime story which he wrote and co-starred with George Clooney. The film did fairly well theatrically. Since then, Tarantino has helmed several critically and financially successful films, including Jackie Brown (1997), Kill Bill: Vol. 1 (2003), Kill Bill: Vol. 2 (2004), Inglourious Basterds (2009), Django Unchained (2012) and The Hateful Eight (2015).',
      born: '27.03.1963',
      died: '-'
    },
    featured: 'false'
  },

  {
    title: 'The Lord of the Rings: the Return of the King',
    imageURL: 'https://image.tmdb.org/t/p/original/uexxR7Kw1qYbZk0RYaF9Rx5ykbj.jpg',
    year: '2003',
    genres: ['Action', 'Adventure', 'Drama'],
    description: 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.',
    director: {
      name: 'Peter Jackson',
      bio: 'Peter Jackson was born as an only child in a small coast-side town in New Zealand in 1961. When a friend of his parents bought him a super 8 movie camera (because she saw how much he enjoyed taking photos), the then eight-year-old Peter instantly grabbed the thing to start recording his own movies, which he made with his friends. They were usually short, but they already had the trademark that would make Jackson famous: impressive special effects, made at a very low cost. For example, for his film "World War Two" which he made as a teenager, he used to simulate a firing gun by punching little holes into the celluloid, so that, once projected, the gun gave the impression of displaying a small fire. Jackson\'s first step towards more serious film-making came with an entry in a local contest to stimulate amateur and children\'s films. For this film, he used stop-motion animation to create a monster that ruins a city in the style of Ray Harryhausen. Unfortunately, he didn\'t win. At twenty-two, he embarked on a movie-making adventure that would change his life. This film, Bad Taste (1987), was begun as any other Jackson film, in an amateur style, at a low budget and using friends and local people to star in his film. Jackson himself did nearly everything in the movie; he directed, produced, filmed and starred in it, in a number of roles, amongst them that of the hero, "Derek". And everything was filmed on a second-hand, $250 camera. It took Jackson and his friends four years to complete the movie. What had started as a joke in a group of friends, then became a cult classic. A friend of Jackson who was working in the movie industry convinced him the film had commercial prospects and arranged for it to be shown at the Cannes film festival, where it won a lot of acclaim, as well as a number of prizes. The movie soon became a hit because of its bizarre humor and overdose of special effects, some realistic, some comedically amateur. After the success of Bad Taste (1987), Jackson became recognized as a director and the door to fame and fortune was opened. He gave up his job at a local photographer\'s shop and became a well-known director of horror-movies, after the success of his first professionally made movie, Dead Alive (1992).',
      born: '31.10.1961',
      died: '-'
    },
    featured: 'false'
  },

  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    imageURL: 'https://movieswithaplottwist.com/wp-content/uploads/2019/01/starwarsposter.jpg',
    year: '1980',
    genres: ['Action', 'Adventure', 'Fantasy'],
    description: 'After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued across the galaxy by Darth Vader and bounty hunter Boba Fett.',
    director: {
      name: 'Irvin Kershner',
      bio: 'Irvin Kershner was born on April 29, 1923 in Philadelphia, Pennsylvania. A graduate of the University of Southern California film school, Kershner began his career in 1950, producing documentaries for the United States Information Service in the Middle East. He later turned to television, directing and photographing a series of documentaries called "Confidential File". Kershner was one of the directors given his first break by producer Roger Corman, for whom he shot Stakeout on Dope Street (1958). The main theme that runs through many of his films is social alienation and human weaknesses - although his biggest commercial success was the science fiction blockbuster Star Wars: Episode V - The Empire Strikes Back (1980). Irvin Kershner died at age 87 of lung cancer in his home in Los Angeles, California on November 27, 2010.',
      born: '29.04.1923',
      died: '27.11.2010'
    },
    featured: 'false'
  },

  {
    title: 'Edward Scissorhands',
    imageURL: 'http://img.auctiva.com/imgdata/1/1/7/9/1/0/1/webimg/559134323_o.jpg',
    year: '1990',
    genres: ['Drama', 'Fantasy', 'Romance'],
    description: 'An artificial man, who was incompletely constructed and has scissors for hands, leads a solitary life. Then one day, a suburban lady meets him and introduces him to her world.',
    director: {
      name: 'Tim Burton',
      bio: 'Timothy Walter Burton was born in Burbank, California, to Jean Rae (Erickson), who owned a cat-themed gift shop, and William Reed Burton, who worked for the Burbank Park and Recreation Department. He spent most of his childhood as a recluse, drawing cartoons, and watching old movies (he was especially fond of films with Vincent Price). When he was in the ninth grade, his artistic talent was recognized by a local garbage company, when he won a prize for an anti-litter poster he designed. The company placed this poster on all of their garbage trucks for a year. After graduating from high school, he attended California Institute of the Arts. Like so many others who graduated from that school, Burton\'s first job was as an animator for Disney. His early film career was fueled by almost unbelievable good luck, but it\'s his talent and originality that have kept him at the top of the Hollywood tree. He worked on such films as The Fox and the Hound (1981) and The Black Cauldron (1985), but had some creative differences with his colleagues. Nevertheless, Disney recognized his talent, and gave him the green light to make Vincent (1982), an animated short about a boy who wanted to be just like Vincent Price. Narrated by Price himself, the short was a critical success and won several awards. Burton made a few other short films, including his first live-action film, Frankenweenie (1984). A half-hour long twist on the tale of Frankenstein, it was deemed inappropriate for children and wasn\'t released. But actor Paul Reubens (aka Pee-Wee Herman) saw Frankenweenie (1984), and believed that Burton would be the right man to direct him in his first full-length feature film, Pee-wee\'s Big Adventure (1985). The film was a surprise success, and Burton instantly became popular. However, many of the scripts that were offered to him after this were essentially just spin-offs of the film, and Burton wanted to do something new. For three years, he made no more films, until he was presented with the script for Beetlejuice (1988). The script was wild and wasn\'t really about anything, but was filled with such artistic and quirky opportunities, Burton couldn\'t say no. Beetlejuice (1988) was another big hit, and Burton\'s name in Hollywood was solidified. It was also his first film with actor Michael Keaton. Warner Bros. then entrusted him with Batman (1989), a film based on the immensely popular comic book series of the same name. Starring Michael Keaton and Jack Nicholson, the film was the most financially successful film of the year and Burton\'s biggest box-office hit to date. Due to the fantastic success of his first three films, he was given the green light to make his next film, any kind of film he wanted. That film was Edward Scissorhands (1990), one of his most emotional, esteemed and artistic films to date. Edward Scissorhands (1990) was also Burton\'s first film with actor Johnny Depp. Burton\'s next film was Batman Returns (1992), and was darker and quirkier than the first one, and, while by no means a financial flop, many people felt somewhat disappointed by it. While working on Batman Returns (1992), he also produced the popular The Nightmare Before Christmas (1993), directed by former fellow Disney Animator Henry Selick. Burton reunited with Johnny Depp on the film Ed Wood (1994), a film showered with critical acclaim, Martin Landau won an academy award for his performance in it, and it is very popular now, but flopped during its initial release. Burton\'s subsequent film, Mars Attacks! (1996), had much more vibrant colors than his other films. Despite being directed by Burton and featuring all-star actors including Jack Nicholson, Glenn Close, Pierce Brosnan and Michael J. Fox, it received mediocre reviews and wasn\'t immensely popular at the box office, either. Burton returned to his darker and more artistic form with the film Sleepy Hollow (1999), starring Johnny Depp, Christina Ricci and Casper Van Dien. The film was praised for its art direction and was financially successful, redeeming Burton of the disappointment many had felt by Mars Attacks! (1996). His next film was Planet of the Apes (2001), a remake of the classic of the same name. The film was panned by many critics but was still financially successful. While on the set of Planet of the Apes (2001), Burton met Helena Bonham Carter, with whom he has two children. Burton directed the film Big Fish (2003) - a much more conventional film than most of his others, it received a good deal of critical praise, although it disappointed some of his long-time fans who preferred the quirkiness of his other, earlier films. Despite the fluctuations in his career, Burton proved himself to be one of the most popular directors of the late 20th century. He directed Johnny Depp once again in Charlie and the Chocolate Factory (2005), a film as quirky anything he\'s ever done.',
      born: '25.08.1958',
      died: '-'
    },
    featured: 'false'
  },

  {
    title: 'Django Unchained',
    imageURL: 'https://vignette2.wikia.nocookie.net/filmguide/images/b/bb/Django-unchained-final-american-movie-poster.jpg/revision/latest?cb=20150109055254',
    year: '2012',
    genres: ['Drama', 'Western'],
    description: 'With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal plantation-owner in Mississippi.',
    director: {
      name: 'Quentin Tarantino',
      bio: 'Quentin Jerome Tarantino was born in Knoxville, Tennessee. His father, Tony Tarantino, is an Italian-American actor and musician from New York, and his mother, Connie (McHugh), is a nurse from Tennessee. Quentin moved with his mother to Torrance, California, when he was four years old. In January of 1992, first-time writer-director Tarantino\'s Reservoir Dogs (1992) appeared at the Sundance Film Festival. The film garnered critical acclaim and the director became a legend immediately. Two years later, he followed up Dogs success with Pulp Fiction (1994) which premiered at the Cannes film festival, winning the coveted Palme D\'Or Award. At the 1995 Academy Awards, it was nominated for the best picture, best director and best original screenplay. Tarantino and writing partner Roger Avary came away with the award only for best original screenplay. In 1995, Tarantino directed one fourth of the anthology Four Rooms (1995) with friends and fellow auteurs Alexandre Rockwell, Robert Rodriguez and Allison Anders. The film opened December 25 in the United States to very weak reviews. Tarantino\'s next film was From Dusk Till Dawn (1996), a vampire/crime story which he wrote and co-starred with George Clooney. The film did fairly well theatrically. Since then, Tarantino has helmed several critically and financially successful films, including Jackie Brown (1997), Kill Bill: Vol. 1 (2003), Kill Bill: Vol. 2 (2004), Inglourious Basterds (2009), Django Unchained (2012) and The Hateful Eight (2015).',
      born: '27.03.1963',
      died: '-'
    },
    featured: 'false'
  },

  {
    title: 'Get Out',
    imageURL: 'https://image.tmdb.org/t/p/original/mE24wUCfjK8AoBBjaMjho7Rczr7.jpg',
    year: '2017',
    genres: ['Horror', 'Mystery', 'Thriller'],
    description: 'A young African-American visits his white girlfriend\'s parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.',
    director: {
      name: 'Jordan Peele',
      bio: 'Jordan Haworth Peele attended Sarah Lawrence College as a member of the class of 2001. His mother is white and his father is black. Jordan is married to comedian Chelsea Peretti, with whom he has a son. He is known for co-writing and starring in the comedy Keanu (2016), opposite his close friend Keegan-Michael Key, for writing and directing the horror film Get Out (2017), which was nominated for Best Picture, lead Actor, Screenplay (winning the prize), and Director at the Academy Awards, and for writing-directing-plus duties on Us (2019), a horror film that had one of the highest live action non-franchise openings of all time.',
      born: '21.02.1979',
      died: '-'
    },
    featured: 'false'
  },

  {
    title: 'Shrek 2',
    imageURL: 'https://image.tmdb.org/t/p/w1280/oljiDFPyMY437BRRV69AzVDSiKy.jpg',
    year: '2004',
    genres: ['Animation', 'Adventure', 'Comedy'],
    description: 'Shrek and Fiona travel to the Kingdom of Far Far Away, where Fiona\'s parents are King and Queen, to celebrate their marriage. When they arrive, they find they are not as welcome as they thought they would be.',
    director: [
      {
        name: 'Andrew Adamson',
        bio: 'Andrew Adamson was born on December 1, 1966 in Auckland, New Zealand. He is a producer and director, known for Shrek 2 (2004), Shrek (2001) and The Chronicles of Narnia: The Lion, the Witch and the Wardrobe (2005). He has been married to Gyulnara Karaeva since January 16, 2016. He was previously married to Nikki Donald.',
        born: '01.12.1966',
        died: '-'
      },
      {
        name: 'Kelly Asbury',
        bio: 'Among Kelly Asbury\'s many achievements, he directed UglyDolls (2019) and Smurfs: The Lost Village (2017). He also co-wrote the 3D computer-animated feature film Gnomeo & Juliet (2011). Asbury\'s other past directorial efforts include the Oscar-nominated films, Shrek 2 (2004) and Spirit: Stallion of the Cimarron (2002). During his over thirty-year career as an animation artist, Kelly Asbury had served many creative capacities on some of Hollywood\'s most popular animated films, including Frozen (2013), Wreck-It Ralph (2012), Shrek (2001), Toy Story (1995), Tim Burton\'s The Nightmare Before Christmas (1993), "Beauty and the Beast" (Disney 1992) and "The Little Mermaid" (Disney 1989). Asbury also provided a variety of character voices on Gnomeo & Juliet (2011) and Shrek 2 (2004). In addition to films, Asbury was a noted author and illustrator of several published children\'s books, as well as having written and compiled the offbeat, non-fiction book, "Dummy Days - America\'s Favorite Ventriloquists from Radio and Early TV" (Angel City Press - 2003) He sadly passed away on June 26, 2020. He is survived by his wife, Jacquie, two step-sons, a sister, and a niece',
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
    featured: 'false'
  },

  {
    title: 'Moonrise Kingdom',
    imageURL: 'https://is5-ssl.mzstatic.com/image/thumb/Video/v4/e8/14/c6/e814c6aa-6ff1-99f2-4d2b-45b045f4aff9/mza_901933579579271147.jpg/268x0w.jpg',
    year: '2012',
    genres: ['Comedy', 'Drama', 'Romance'],
    description: 'A pair of young lovers flee their New England town, which causes a local search party to fan out to find them.',
    director: {
      name: 'Wes Anderson',
      bio: 'Wesley Wales Anderson was born in Houston, Texas. His mother, Texas Ann (Burroughs), is an archaeologist turned real estate agent, and his father, Melver Leonard Anderson, worked in advertising and PR. He has two brothers, Eric and Mel. Anderson\'s parents divorced when he was a young child, an event that he described as the most crucial event of his brothers and his growing up. During childhood, Anderson also began writing plays and making super-8 movies. He was educated at Westchester High School and then St. John\'s, a private prep school in Houston, Texas, which was later to prove an inspiration for the film Rushmore (1998). Anderson attended the University of Texas in Austin, where he majored in philosophy. It was there that he met Owen Wilson. They became friends and began making short films, some of which aired on a local cable-access station. One of their shorts was Bottle Rocket (1994), which starred Owen and his brother Luke Wilson. The short was screened at the Sundance Film Festival, where it was successfully received, so much so that they received funding to make a feature-length version. Bottle Rocket (1996) was not a commercial hit, but it gained a cult audience and high-profile fans, which included Martin Scorsese. Success followed with films such as Rushmore (1998), The Life Aquatic with Steve Zissou (2004), The Royal Tenenbaums (2001) and an animated feature, Fantastic Mr. Fox (2009). The latter two films earned Anderson Oscar nominations.',
      born: '01.05.1969',
      died: '-'
    },
    featured: 'false'
  },

  {
    title: 'Moana',
    imageURL: 'https://thedisneyblog.com/wp-content/uploads/2016/09/moana-poster-new.jpg',
    year: '2016',
    genres: ['Animation', 'Adventure', 'Comedy'],
    description: 'In Ancient Polynesia, when a terrible curse incurred by the Demigod Maui reaches Moana\'s island, she answers the Ocean\'s call to seek out the Demigod to set things right.',
    directors: [
      {
        name: 'Ron Clements',
        bio: 'Ron Clements was born on April 25, 1953 in Sioux City, Iowa, USA as Ronald Francis Clements. He is a writer and director, known for Hercules (1997), Aladdin (1992) and The Princess and the Frog (2009). He has been married to Tamara Lee Glumace since February 25, 1989.',
        born: '25.04.1953',
        died: '-'
      },
      {
        name: 'John Musker',
        bio: 'John Musker was born on November 8, 1953 in Chicago, Illinois, USA as John Edward Musker. He is a writer and director, known for Hercules (1997), Aladdin (1992) and Moana (2016). He has been married to Gale Warren since September 22, 1979. They have three children.',
        born: '08.11.1953',
        died: '-'
      }
    ],
    featured: 'false'
  }
];

const user = {
  id: 1,
  username: 'JohnDoe',
  password: 'myPassword123!',
  email: 'johnDoe@gmail.com',
  dob: '2000-06-21'
}

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
