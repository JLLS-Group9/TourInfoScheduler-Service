# Home Sweet Home

 Tour scheduling component for a home/rental listing property website

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

**`POST` /api/homes/:id/scheduleTour**
- This endpoint allows you to create a new tour reservation for a house

- `POST` request to tour a single listing
- Success status code: `201` on successful save
- Request object should be a valid JSON object with following fields:

```sh
{}
```

- Response Object:
```sh
{ }
```

**`GET` /api/homes/:id/requestInfo**
- `GET` request for a single listing
- Success status code: `200`
- Request parameter of  `:id` from API endpoint will be used. No request object is required.
- Successful response will be HTTP status code `200` and a JSON object that contains property, agent, booking information
```sh
{ }
```

**`GET` /api/homes/:id/bookings**
- `GET` request for a single listing
- Success status code: `200`
- Request parameter of  `:id` from API endpoint will be used. No request object is required.
- Successful response will be HTTP status code `200` and a JSON object that contains booking information
```sh
{ }
```


