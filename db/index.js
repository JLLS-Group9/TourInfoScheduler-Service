const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/trulia', {useNewUrlParser: true});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`we're connected!`)
});


const booking = new Booking({ name: 'fluffy' });