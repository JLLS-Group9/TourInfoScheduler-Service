/* eslint-disable no-plusplus */
const faker = require('faker');
const db = require('./db/index.js');
const seedURL = require('./seed_URL.js');

const availTimes = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM'];

const createBookingInfo = () => {
  const bookingType = Math.random() <= 0.5 ? 'In-Person' : 'Video Chat';
  const dateObj = faker.date.between('2020-11-13', '2020-12-01').toISOString().split('T')[0];
  const finBool = (Math.random() <= 0.5);
  const booking = {
    type: bookingType,
    date: dateObj,
    time: availTimes[Math.floor(Math.random() * 24)],
    booking: {
      name: faker.name.findName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumberFormat(),
      financing: finBool,
    },
  };
  return booking;
};

const createRequestInfo = () => {
  const finBool = (Math.random() <= 0.5);
  const request = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumberFormat(),
    message: faker.lorem.sentences(),
    financing: finBool,
  };
  return request;
};

const createAgentInfo = () => {
  const agentPicture = Math.floor(1 + Math.random() * 12);
  const agent = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumberFormat(),
    reviewsScore: (Math.random() * 2 + 3).toFixed(0),
    reviewsCount: Math.floor(Math.random() * 100),
    recentSales: Math.floor(Math.random() * 20),
    picture: `${seedURL}${agentPicture}.jpg`,
  };
  return agent;
};

const createList = (type) => {
  const list = [];
  const total = type === 'agents' ? 4
    : type === 'bookings' ? Math.floor(Math.random() * 25)
      : Math.floor(Math.random() * 25);
  for (let i = 0; i < total; i++) {
    if (type === 'agents') {
      list.push(createAgentInfo());
    } else if (type === 'bookings') {
      list.push(createBookingInfo());
    } else {
      list.push(createRequestInfo());
    }
  }
  return list;
};

const createRecord = (id) => {
  const propertyType = Math.random() <= 0.1 ? 'New Construction'
    : Math.random() <= 0.5 ? 'For Sale'
      : 'Pending';
  const dataStr = {
    propertyId: id,
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zipCode: faker.address.zipCode(),
    listingAgent: faker.name.findName(),
    propertyType,
    bookings: createList('bookings'),
    requestInfo: createList('requests'),
    agentsInfo: createList('agents'),
  };
  return dataStr;
};

const seedData = (num) => {
  let created = 1;
  const entries = [];
  while (created <= num) {
    entries.push(createRecord(created));
    created++;
  }

  db.insertMany(entries, (err, data) => {
    if (err) {
      throw err;
    } else {
      console.log('insertion complete!', data);
    }
  });
};

seedData(100);
