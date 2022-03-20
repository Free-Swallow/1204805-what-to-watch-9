import {MoviesData, CommentsData} from '../types/movies';

const Movies: MoviesData = [
  {
    id: 111,
    previewImage: '../img/orlando.jpg',
    posterImage: '../img/the-grand-budapest-hotel-poster.jpg',
    backgroundImage: '../img/bg-the-grand-budapest-hotel.jpg',
    backgroundColor: '../img/bg-header.jpg',
    previewVideoLink: '../img/player-poster.jpg',
    videoLink: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
    name: 'The Grand Budapest Hotel',
    released: 2014,
    runTime: 168,
    genre: 'Drama',
    rating: 8.9,
    scoresCount: 19,
    description: 'In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\'s friend and protege.\n' +
      '\n' +
      'Gustave prides himself on providing first-class service to the hotel\'s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave\'s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.',
    director: 'Wes Anderson',
    starring: ['Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe'],
    isFavorite: true,
  },
  {
    id: 112,
    previewImage: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    posterImage: '../img/the-grand-budapest-hotel-poster.jpg',
    backgroundImage: '../img/bg-the-grand-budapest-hotel.jpg',
    backgroundColor: '../img/bg-header.jpg',
    previewVideoLink: '../img/player-poster.jpg',
    videoLink: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm',
    name: 'Fantastic Beasts: The Crimes of Grindelwald',
    released: 1999,
    runTime: 168,
    genre: 'Funny-film',
    rating: 0.1,
    scoresCount: 99,
    description: 'Pum-purum-purum-purum-purum-ta-ta.',
    director: 'Putin',
    starring: ['Tom and Jerry'],
    isFavorite: false,
  },
  {
    id: 113,
    previewImage: 'img/bohemian-rhapsody.jpg',
    posterImage: '../img/the-grand-budapest-hotel-poster.jpg',
    backgroundImage: '../img/bg-the-grand-budapest-hotel.jpg',
    backgroundColor: '../img/bg-header.jpg',
    previewVideoLink: '../img/player-poster.jpg',
    videoLink: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
    name: 'Bohemian Rhapsody',
    released: 1111,
    runTime: 168,
    genre: 'Horror',
    rating: 5.0,
    scoresCount: 99,
    description: 'In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\'s friend and protege.\n' +
      '\n' +
      'Gustave prides himself on providing first-class service to the hotel\'s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave\'s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.',
    director: 'Nikita',
    starring: ['Someone'],
    isFavorite: true,
  },
  {
    id: 114,
    previewImage: 'img/macbeth.jpg',
    posterImage: '../img/the-grand-budapest-hotel-poster.jpg',
    backgroundImage: '../img/bg-the-grand-budapest-hotel.jpg',
    backgroundColor: '../img/bg-header.jpg',
    previewVideoLink: '../img/player-poster.jpg',
    videoLink: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
    name: 'Macbeth',
    released: 2020,
    runTime: 168,
    genre: 'musical',
    rating: 7.1,
    scoresCount: 99,
    description: 'In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\'s friend and protege.\n' +
      '\n' +
      'Gustave prides himself on providing first-class service to the hotel\'s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave\'s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.',
    director: 'Big Dog',
    starring: ['Peoples'],
    isFavorite: false,
  },
  {
    id: 115,
    previewImage: 'img/aviator.jpg',
    posterImage: '../img/the-grand-budapest-hotel-poster.jpg',
    backgroundImage: '../img/bg-the-grand-budapest-hotel.jpg',
    backgroundColor: '../img/bg-header.jpg',
    previewVideoLink: '../img/player-poster.jpg',
    videoLink: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm',
    name: 'Aviator',
    released: 2014,
    runTime: 168,
    genre: 'Drama',
    rating: 8.9,
    scoresCount: 99,
    description: 'In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\'s friend and protege.\n' +
      '\n' +
      'Gustave prides himself on providing first-class service to the hotel\'s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave\'s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.',
    director: 'Bazuzu',
    starring: ['Bazuzu 2'],
    isFavorite: false,
  },
  {
    id: 116,
    previewImage: 'img/we-need-to-talk-about-kevin.jpg',
    posterImage: '../img/the-grand-budapest-hotel-poster.jpg',
    backgroundImage: '../img/bg-the-grand-budapest-hotel.jpg',
    backgroundColor: '../img/bg-header.jpg',
    previewVideoLink: '../img/player-poster.jpg',
    videoLink: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
    name: 'We need to talk about Kevin',
    released: 1234,
    runTime: 168,
    genre: 'cat',
    rating: 10,
    scoresCount: 99,
    description: 'In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\'s friend and protege.\n' +
      '\n' +
      'Gustave prides himself on providing first-class service to the hotel\'s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave\'s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.',
    director: 'Wes Anderson',
    starring: ['Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe'],
    isFavorite: true,
  },
  {
    id: 117,
    previewImage: 'img/what-we-do-in-the-shadows.jpg',
    posterImage: '../img/the-grand-budapest-hotel-poster.jpg',
    backgroundImage: '../img/bg-the-grand-budapest-hotel.jpg',
    backgroundColor: '../img/bg-header.jpg',
    previewVideoLink: '../img/player-poster.jpg',
    videoLink: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
    name: 'What We Do in the Shadows',
    released: 9876,
    runTime: 168,
    genre: 'Drama',
    rating: 1.1,
    scoresCount: 99,
    description: 'In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\'s friend and protege.\n' +
      '\n' +
      'Gustave prides himself on providing first-class service to the hotel\'s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave\'s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.',
    director: 'director',
    starring: ['actors'],
    isFavorite: false,
  },
  {
    id: 118,
    previewImage: 'img/revenant.jpg',
    posterImage: '../img/the-grand-budapest-hotel-poster.jpg',
    backgroundImage: '../img/bg-the-grand-budapest-hotel.jpg',
    backgroundColor: '../img/bg-header.jpg',
    previewVideoLink: '../img/player-poster.jpg',
    videoLink: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
    name: 'Revenant',
    released: 2014,
    runTime: 168,
    genre: 'Drama',
    rating: 8.9,
    scoresCount: 99,
    description: 'In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\'s friend and protege.\n' +
      '\n' +
      'Gustave prides himself on providing first-class service to the hotel\'s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave\'s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.',
    director: 'Wes Anderson',
    starring: ['Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe'],
    isFavorite: true,
  },
  {
    id: 119,
    previewImage: 'img/johnny-english.jpg',
    posterImage: '../img/the-grand-budapest-hotel-poster.jpg',
    backgroundImage: '../img/bg-the-grand-budapest-hotel.jpg',
    backgroundColor: '../img/bg-header.jpg',
    previewVideoLink: '../img/player-poster.jpg',
    videoLink: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
    name: 'Johnny English',
    released: 2014,
    runTime: 168,
    genre: 'Drama',
    rating: 8.9,
    scoresCount: 99,
    description: 'In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\'s friend and protege.\n' +
      '\n' +
      'Gustave prides himself on providing first-class service to the hotel\'s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave\'s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.',
    director: 'Wes Anderson',
    starring: ['Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe'],
    isFavorite: true,
  },
];

const Comments: CommentsData = [
  {
    comment: 'Interesting setting and a good cast',
    date: '19.10.2020',
    id: 11,
    rating: 9,
    user: {
      id: 12,
      name: 'John Doe',
    },
  },
  {
    comment: 'Booooooooooring',
    date: '11.11.1991',
    id: 13,
    rating: 9,
    user: {
      id: 14,
      name: 'Tim Macoveev',
    },
  },
  {
    comment: 'Very very old. Meh',
    date: '30.12.2022',
    id: 15,
    rating: 9,
    user: {
      id: 16,
      name: 'Владимир Путин',
    },
  },
  {
    comment: 'Almost two hours? Seriously?',
    date: '12.1.2222',
    id: 17,
    rating: 2,
    user: {
      id: 18,
      name: 'Валера настало твоё время',
    },
  },
  {
    comment: 'Видали и лучше',
    date: '1.12.1234',
    id: 19,
    rating: 4,
    user: {
      id:20,
      name: 'Женька из 3-го подъезда',
    },
  },
  {
    comment: 'Шляпа',
    date: '20.10.1999',
    id: 21,
    rating: 1,
    user: {
      id: 22,
      name: 'Tim Macoveev',
    },
  },
];

export {Movies, Comments};
