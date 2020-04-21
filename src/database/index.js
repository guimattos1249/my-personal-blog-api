const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Category = require('../models/Category');
const Post = require('../models/Post');

const connection = new Sequelize(dbConfig);

Category.init(connection);
Post.init(connection);

module.exports = connection;