const express = require('express');
const CategoryController = require('./controllers/CategoryController');
const PostController = require('./controllers/PostController');

const routes = express.Router();

routes.post('/categories', CategoryController.store);
routes.post('/posts', PostController.store);

module.exports = routes;