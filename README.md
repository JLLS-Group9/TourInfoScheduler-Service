# Home Sweet Home

> Tour scheduling component for a home/rental listing property website

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)
4. [Installing Dependencies](#installing) 
5. [API Endpoints](#API endpoints)

## Usage

- Access the individual component through client/src/index.js
- Change listings by modifying the numerical value after the site, e.g. from 

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0

## Development

Developed using Babel webpack and Node.js. To start a development bundle and server, run:

```sh
npm run build
npm run start
```

## Installing Dependencies

From within the root directory:

```sh
npm install
```

## API Endpoints

API endpoints conform to a RESTful API architecture to retrieve and modify database-hosted information. All responses will include HTTP response codes to indicate status and errors and data will come in JSON pretty format. All requests must include a Content-Type of application/json and the body must be valid JSON.

**POST /api/homes/:id/scheduleTour**
- POST request for a single listing
- This endpoint allows you to create a new listing for a house
- Takes a valid JSON object and will return 201 HTTP code if listing is saved successfully
- Request field will be accepted where dailyPrice, cleaningFee and taxes are required and other parameters are optional but highly recommended. Default values will be assigned to the other objects but this may not be the desired charges.
```{ owner: Integer, listings_name: String [dailyPrice: Number, cleaningFee: Number, serviceFee: Number, taxes: Number, max_guests: Number, min_stay: Number, max_stay: Number, monthlyDiscount: Number, weeklyDiscount: Number, holidayPremium: Number, weekendPremium: Number]}```

**GET /api/homes/:id/requestInfo**
- GET request for a single listing
- Request parameter of :listingid from API endpoint will be accepted. No request object is required.
- Response will be HTTP status code 200 and a JSON object that contains property at the given ID with respective fees and all booked reservation dates
```{ owner: String, listings_name: String, dailyPrice: Number, cleaningFee: Number, serviceFee: Number, taxes: Number, max_guests: Number, min_stay: Number, max_stay: Number, monthlyDiscount: Number, weeklyDiscount: Number, holidayPremium: Number, weekendPremium: Number, reserved: [{check-in: ISO Date, check out: ISO Date}]}```

**GET /api/homes/:id/bookings**



