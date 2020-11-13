const db = require('../db/index.js')

module.exports = {

  retrieveBookings: (req, res) => {
    console.log('request for home number' + req.params.id)
    db.findbyParameters({propertyId: req.params.id}, null, (err, data) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.header("Content-Type",'application/json').send(JSON.stringify(data, 0, 2))
      }
    })
  },

//need to update scheduleTour and RequestInfo

  scheduleTour:  (req, res) => {
    console.log('request for home number' + req.body)
    db.findOneAndUpdate({propertyId: req.params.id}, null, (err, data) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.header("Content-Type",'application/json').send(JSON.stringify(data, 0, 2))
      }
    })
  },

  requestInfo: (req, res) => {
    console.log('request for home number' + req.body)
    db.findOneAndUpdate({propertyId: req.params.id}, null, (err, data) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.header("Content-Type",'application/json').send(JSON.stringify(data, 0, 2))
      }
    })
  }

}