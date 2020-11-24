const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 8081;
const controller = require('../controllers/index.js');

app.use(express.json());
app.use(morgan('dev'));
app.use('/', express.static('public'));
app.use('/api/homes/:id/', express.static('public'));

app.use('/api/homes/:id/scheduleTour', controller.scheduleTour);

app.use('/api/homes/:id/requestInfo', controller.requestInfo);

app.use('/api/homes/:id/bookings', controller.retrieveBookings);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
