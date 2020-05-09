const express = require('express');
const authMiddleware = require('./middlewares/auth');
const UserController = require('./controllers/UserController');
const CategoryController = require('./controllers/CategoryController');
const PostController = require('./controllers/PostController');
const PostCategoryController = require('./controllers/PostCategoryController');
const PostQueryController = require('./controllers/PostQueryController');

const routes = express.Router();


routes.post('/user', UserController.store);
routes.post('/singin', UserController.singin);

routes.use(authMiddleware);

routes.get('/categories', CategoryController.index);
routes.get('/category/:id', CategoryController.indexById);
routes.post('/category', CategoryController.store);
routes.put('/category/:id', CategoryController.update);
routes.delete('/category/:id', CategoryController.delete);

routes.get('/posts', PostController.index);
routes.get('/post/:id', PostQueryController.indexOne);
routes.get('/postsbydate/:date', PostQueryController.indexByDate);
routes.post('/post', PostController.store);
routes.put('/post/:id', PostController.update);
routes.delete('/post/:id', PostController.delete);

routes.get('/post/:id_category', PostCategoryController.index);

module.exports = routes;