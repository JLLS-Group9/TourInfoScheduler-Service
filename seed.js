const db = require('./db/index.js')
const faker = require('faker')

const s3BaseURL = 'https://s3-us-west-1.amazonaws.com/trulia.tour.scheduler/'
const availTimes = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
'2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM','9:00 PM']

var createBookingInfo = function() {
  let bookingType = Math.random() <= 0.5 ? "In-person" : "Video Chat";
  let dateObj = faker.date.between('2020-11-13', '2020-12-01').toISOString().split('T')[0];
  let finBool = (Math.random() <= 0.5)
  var booking = {
    type: bookingType,
    date: dateObj,
    time: availTimes[Math.floor(Math.random() * 24)],
    booking: { name: faker.name.findName(), email: faker.internet.email(), phone: faker.phone.phoneNumberFormat(), financing: finBool}
  }
  return booking;
}


var createRequestInfo = function() {
  let finBool = (Math.random() <= 0.5);
  var request = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumberFormat(),
    message: faker.lorem.sentences(),
    financing: finBool
    }
  return request;
}

var createAgentInfo = function () {
  var agentPicture = Math.floor( 1 + Math.random() * 12);
  var agent = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumberFormat(),
    reviewsScore: (Math.random() * 5).toFixed(1),
    reviewsCount: Math.floor(Math.random() * 20),
    recentSales: Math.floor(Math.random() * 20),
    Picture: `${s3BaseURL}${agentPicture}.jpg`,
    }
  return agent;
}

var createList = (type) => {
  let list = [];
  let total = type === 'agents' ? 4
              : type === 'bookings' ? Math.floor(Math.random() * 25)
              : Math.floor(Math.random() * 25)
  for (let i = 0; i < total; i++) {
    if (type === 'agents') {
      list.push(createAgentInfo())
    } else if (type === 'bookings') {
      list.push(createBookingInfo())
    } else {
      list.push(createRequestInfo())
    }
  }
  return list;
}

var createRecord = function(id) {
  let propertyType = Math.random() <= 0.1 ? "New Construction"
                    :  Math.random() <= 0.5 ? "For Sale"
                    : "Pending";
  let dataStr = {
    propertyId: id,
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zipCode: faker.address.zipCode(),
    listingAgent: faker.name.findName(),
    propertyType: propertyType,
    bookings: createList('bookings'),
    requestInfo: createList('requests'),
    agentsInfo: createList('agents'),
  };
  return dataStr;
}

var seedData = (num) => {
  let created = 1;
  let entries = [];
  while (created <= num) {
    entries.push(createRecord(created));
    created++;
  }

  db.insertMany(entries, (err, data) => {
    if (err) {
      throw err;
    } else {
      console.log('insertion complete!', data)
    }
  })

}

seedData(100)


