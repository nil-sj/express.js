# Express.js and NPM Packages Overview

## Introduction
Express.js is a minimalist, unopinionated web framework for building HTTP servers in Node.js. It allows for flexibility and extensibility through third-party middleware like `morgan` (logging) and built-in middleware such as `express.json` (for parsing JSON requests) and `express.static` (for serving static files).

## NPM (Node Package Manager)
NPM is responsible for managing external Node.js modules. The `package.json` file contains essential details such as project metadata and dependencies.

### Semantic Versioning in NPM
- **Major version**: Introduces breaking changes.
- **Minor version**: Adds features without breaking changes.
- **Patch version**: Bug fixes with no breaking changes.
- `~` (tilde) and `^` (caret) allow flexible dependency versioning.

### Important Files:
- `package.json`: Manages dependencies.
- `package-lock.json`: Locks exact dependency versions for consistency.

## Setting Up an Express Server

### Step 1: Create a New Express Project
```sh
mkdir node-express
cd node-express
npm init -y
```

### Step 2: Install Express
```sh
npm install express
```

### Step 3: Create `server.js`
```js
const express = require('express');
const hostname = 'localhost';
const port = 3000;

const app = express();

app.use((req, res) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
```

### Step 4: Start the Server
```sh
npm start
```

## Middleware and Static Files

### Using `morgan` for Logging
```sh
npm install morgan
```
Modify `server.js`:
```js
const morgan = require('morgan');
app.use(morgan('dev'));
```

### Serving Static Files
```js
app.use(express.static(__dirname + '/public'));
```

## REST API Overview
### HTTP Methods:
| Method  | Description  |
|---------|-------------|
| `GET`   | Retrieve data |
| `POST`  | Create new data |
| `PUT`   | Update existing data |
| `DELETE`| Remove data |

### Example Routes in Express
```js
app.get('/campsites', (req, res) => {
    res.end('Will send all the campsites to you');
});

app.post('/campsites', (req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
});

app.delete('/campsites', (req, res) => {
    res.end('Deleting all campsites');
});
```

## Modularizing with Express Router
To keep the codebase clean, we move routes to `campsiteRouter.js`.

### Step 1: Create `routes/campsiteRouter.js`
```js
const express = require('express');
const campsiteRouter = express.Router();

campsiteRouter.route('/')
.get((req, res) => {
    res.end('Will send all the campsites to you');
})
.post((req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
})
.delete((req, res) => {
    res.end('Deleting all campsites');
});

module.exports = campsiteRouter;
```

### Step 2: Modify `server.js`
```js
const campsiteRouter = require('./routes/campsiteRouter');
app.use('/campsites', campsiteRouter);
```

## Using Controllers for Better Structure
### Step 1: Create `controllers/campsiteController.js`
```js
exports.getAllCampsites = (req, res) => {
    res.end('Will send all the campsites to you');
};

exports.addCampsite = (req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
};

exports.deleteAllCampsites = (req, res) => {
    res.end('Deleting all campsites');
};
```

### Step 2: Update `campsiteRouter.js`
```js
const campsiteController = require('../controllers/campsiteController');
campsiteRouter.route('/')
.get(campsiteController.getAllCampsites)
.post(campsiteController.addCampsite)
.delete(campsiteController.deleteAllCampsites);
```

### Step 3: Start and Test the API
```sh
npm start
```
Use **Postman** to test API endpoints.

## Conclusion
This setup allows for a **modular**, **scalable**, and **maintainable** Express.js application using **routers and controllers**. Happy coding! 

## Final Note
Subfolder have been added for branches with alternative code.
