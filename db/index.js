const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/trulia', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('we\'re connected!');
});

const bookingSchema = new mongoose.Schema({
  propertyId: Number,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  listingAgent: String,
  propertyType: String,
  bookings: Array,
  requestInfo: Array,
  agentsInfo: Array,
});

const BookingModel = mongoose.model('Booking', bookingSchema);

function insertMany(bookings, callback) {
  BookingModel.insertMany(bookings, callback);
}

function findbyParameters(filter, query, callback) {
  BookingModel.find(filter, null, query, callback);
}

function findOneAndUpdate(conditions, update, options, callback) {
  BookingModel.findOneAndUpdate(conditions, update, options, callback);
}

exports.insertMany = insertMany;
exports.findbyParameters = findbyParameters;
exports.findOneAndUpdate = findOneAndUpdate;
