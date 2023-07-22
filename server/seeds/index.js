const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose
  .connect('mongodb+srv://takato:takato131211@cluster0.iap4uzp.mongodb.net/')
  .then(() => console.log('Connected!'))
  .catch((err) => {
    console.log('MongoDBコネクションエラー');
    console.log(err);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const randomCityIndex = Math.floor(Math.random() * cities.length);
    const price = Math.floor(Math.random() * 2000) + 1000;
    const camp = new Campground({
      author: '64b66040aae0493dcdd2cce2',
      location: `${cities[randomCityIndex].prefecture}${cities[randomCityIndex].city}`,
      title: `${sample(descriptors)}・${sample(places)}`,
      description:
        'つれづれなるまゝに、日暮らし、硯にむかひて、心にうつりゆくよしなし事を、そこはかとなく書きつくれば、あやしうこそものぐるほしけれ。（Wikipediaより）つれづれなるまゝに、日暮らし、硯にむかひて、心にうつりゆくよしなし事を、そこはかとなく書きつくれば、あやしうこそものぐるほしけれ。（Wikipediaより）つれづれなるまゝに、日暮らし、硯にむかひて、心にうつりゆくよしなし事を、そこはかとなく書きつくれば、あやしうこそものぐるほしけれ。（Wikipediaより）つれづれなるまゝに、日暮らし、硯にむかひて、心にうつりゆくよしなし事を、そこはかとなく書きつくれば、あやしうこそものぐるほしけれ。',
      price,
      image: [
        {
          path: 'https://res.cloudinary.com/ddgt8knuy/image/upload/v1689943777/Yelp/mwfl4lnysijtue2blfyv.jpg',
          filename: 'Yelp/mwfl4lnysijtue2blfyv',
        },
        {
          path: 'https://res.cloudinary.com/ddgt8knuy/image/upload/v1689944849/Yelp/xzjtn5fmenogtqthk0oo.jpg',
          filename: 'Yelp/xzjtn5fmenogtqthk0oo',
        },
      ],
    });
    camp.save();
  }
};

seedDB();
