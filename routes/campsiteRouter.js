const express = require('express');
const campsiteRouter = express.Router();
const campsiteController = require('../controllers/campsiteController');

// Routes using the Controller methods
campsiteRouter.route('/')
    .get(campsiteController.getAllCampsites)
    .post(campsiteController.addCampsite)
    .put((req, res) => res.status(403).end('PUT operation not supported on /campsites'))
    .delete(campsiteController.deleteAllCampsites);

campsiteRouter.route('/:campsiteId')
    .get(campsiteController.getCampsiteById)
    .post((req, res) => res.status(403).end(`POST operation not supported on /campsites/${req.params.campsiteId}`))
    .put(campsiteController.updateCampsite)
    .delete(campsiteController.deleteCampsite);

module.exports = campsiteRouter;