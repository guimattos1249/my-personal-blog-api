const express = require('express');
const CategoryController = require('./controllers/CategoryController');
const PostController = require('./controllers/PostController');
const PostCategoryController = require('./controllers/PostCategoryController');
const PostQueryController = require('./controllers/PostQueryController');

const routes = express.Router();

routes.get('/categories', CategoryController.index);
routes.post('/categories', CategoryController.store);
routes.put('/categories/:id', CategoryController.update);
routes.delete('/categories/:id', CategoryController.delete);

routes.get('/posts', PostController.index);
routes.get('/post/:id', PostQueryController.indexOne);
routes.get('/postsbydate/:date', PostQueryController.indexByDate);
routes.post('/posts', PostController.store);
routes.put('/posts/:id', PostController.update);
routes.delete('/posts/:id', PostController.delete);

routes.get('/posts/:id_category', PostCategoryController.index);

module.exports = routes;