const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 8081;
const controller = require('../controllers/index.js');
const compression = require('compression')

app.use(express.json());
app.use(compression({ filter: shouldCompress }))

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}

app.use(morgan('dev'));
app.use('/', express.static('public'));
app.use('/api/homes/:id/', express.static('public'));

app.use('/api/homes/:id/scheduleTour', controller.scheduleTour);

app.use('/api/homes/:id/requestInfo', controller.requestInfo);

app.use('/api/homes/:id/bookings', controller.retrieveBookings);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
