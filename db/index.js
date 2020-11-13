const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/trulia', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`we're connected!`)
});

const bookingSchema = new mongoose.Schema({
  propertyId: Number,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  listingAgent: String,
  propertyType: String,
  bookings: Object,
  requestInfo: Object,
  agentsInfo: Object,
});

const BookingModel = mongoose.model('Booking', bookingSchema);

function insertMany(stories, callback) {
  BookingModel.insertMany(stories, callback)
}

exports.insertMany = insertMany;