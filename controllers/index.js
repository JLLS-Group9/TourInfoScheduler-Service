/* eslint-disable no-console */
const db = require('../db/index.js');

module.exports = {

  retrieveBookings: (req, res) => {
    console.log(`request for home number${req.params.id}`);
    db.findbyParameters({ propertyId: req.params.id }, null, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        console.log(data)
        res.header('Content-Type', 'application/json').send(JSON.stringify(data, 0, 2));
      }
    });
  },

  // need to update scheduleTour and RequestInfo

  scheduleTour: (req, res) => {
    console.log(`request for tour schedule ${JSON.stringify(req.body)}`);
    db.findOneAndUpdate({ propertyId: req.params.id }, { $push: { bookings: req.body.input } },
      null, (err, data) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.header('Content-Type', 'application/json').send(JSON.stringify(data, 0, 2));
        }
      });
  },

  requestInfo: (req, res) => {
    console.log(`request for info home number ${JSON.stringify(req.body)}`);
    db.findOneAndUpdate({ propertyId: req.params.id }, { $push: { requestInfo: req.body.input } },
      null, (err, data) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.header('Content-Type', 'application/json').send(JSON.stringify(data, 0, 2));
        }
      });
  },

};
