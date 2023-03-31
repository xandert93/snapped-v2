import { Product, User } from '../models';

const dummyProducts = [
  {
    name: 'Tangerine',
    description: 'Bright orange and thin-skinned citrus fruit',
    imageURL: 'https://cdn108.picsart.com/202851565004202.jpg?type=webp&to=crop&r=256',
    rating: 3,
    price: 0.49,
  },
  {
    name: 'Banana',
    description: 'Curved, yellow, thick skin and soft sweet flesh',
    imageURL: 'http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/banana.png',
    rating: 4,
    price: 0.79,
  },
  {
    name: 'Papaya',
    description: 'Fleshy berry with smooth green skin',
    imageURL: 'https://i.stack.imgur.com/GIm9N.jpg?s=256&g=1',
    rating: 5,
    price: 0.99,
  },
];

export default async () => {
  try {
    await Product.insertMany(dummyProducts); // native mongoDB driver method - doesn't use schema, so no validation applied
    console.log('🌱Products added to database');
  } catch (err) {
    console.log(err.message);
  }
};

const dummyUsers = [
  {
    firstName: 'Barry',
    lastName: 'White',
    username: 'barry_white',
    email: 'b@w.com',
    avatarId:
      'avatar-images/MV5BOTUyYTYwZTAtOGI2Yi00YzU1LWJmMjktMWU5MGViNGI1M2UzL2ltYWdlXkEyXkFqcGdeQXVyMjU5OTg5NDc_._V1_FMjpg_UX1000__wwhojd',
  },
];

dummyUsers.forEach((user) => {
  user.password = '123456';
  user.passwordConfirm = '123456';
  user.isVerified = true;
});

// User.create(dummyUsers).then(console.log);
