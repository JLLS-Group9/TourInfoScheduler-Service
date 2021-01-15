# Home Sweet Home

 Tour scheduling component for a home/rental listing property website
 
 <div align="center">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/JIsFDk55-_0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;   picture-in-picture" allowfullscreen></iframe>
</div>
<div align="center">

</div>

## Related Projects

  - https://git.io/JtvF7
  - https://git.io/JtvFd
  - https://git.io/JtvFb
  - https://git.io/JtvFN

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)
4. [Installing Dependencies](#installing-dependencies) 
5. [API Endpoints](#api-endpoints)

## Usage

- Access the individual component through client/src/index.js
- Change listings by modifying the numerical value after the site, e.g. from /api/homes/15 to /api/homes/20

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

**`POST` /api/homes/:id/scheduleTour**
- This endpoint allows you to create a new tour reservation for a house

- `POST` request to tour a single listing
- Success status code: `201` on successful save
- Request object should be a valid JSON object with following fields:

```sh
{ email: String,
  financing: boolean,
  name: String,
  phone: numeric,
  date: Date object,
  type: String,
  time: String}
```

- Response Object:
```sh
[ { bookings: [],
    requestInfo: [], 
    agentsInfo: [{
      email: String,
      name: String,
      phone: String,
      picture: String of URL,
      recentSales: Integer,
      reviewScore: Integer,
      reviewCount: String,
    }],
    propertyId: Integer,
    addres: String,
    city: String,
    state: String,
    zipCode: String,
    listingAgent: String,
    propertyType: String of 'Pending' or 'For Sale',
} ]
```

**`GET` /api/homes/:id/requestInfo**
- `GET` request for a single listing
- Success status code: `200`
- Request parameter of  `:id` from API endpoint will be used. No request object is required.
- Successful response will be HTTP status code `200` and a JSON object that contains property, agent, booking information
- Response Object:
```sh
[ { bookings: [],
    requestInfo: [], 
    agentsInfo: [{
      email: String,
      name: String,
      phone: String,
      picture: String of URL,
      recentSales: Integer,
      reviewScore: Integer,
      reviewCount: String,
    }],
    propertyId: Integer,
    addres: String,
    city: String,
    state: String,
    zipCode: String,
    listingAgent: String,
    propertyType: String of 'Pending' or 'For Sale',
} ]
```

**`GET` /api/homes/:id/bookings**
- `GET` request for a single listing
- Success status code: `200`
- Request parameter of  `:id` from API endpoint will be used. No request object is required.
- Successful response will be HTTP status code `200` and a JSON object that contains booking information
```sh
{ name: String,
  email: String,
  financing: boolean,
  phone: numeric,
  message: Varchar,
  agent: String
}
```


