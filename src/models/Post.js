const { Model, DataTypes } = require('sequelize');

class Post extends Model {
  static init(sequelize) {
    super.init({
      title: DataTypes.STRING,
      date: DataTypes.DATE,
      description: DataTypes.STRING,
      content: DataTypes.STRING,
      id_category: {
        type: DataTypes.INTEGER,
        references: {
          model: 'categories', 
          key: 'id'
        }
      }
    }, { sequelize });
  }
}

module.exports = Post;