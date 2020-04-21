const { Model, DataTypes } = require('sequelize');

class Post extends Model {
  static init(sequelize) {
    super.init({
      title: DataTypes.STRING,
      date: DataTypes.DATE,
      description: DataTypes.STRING,
      content: DataTypes.STRING
    }, { sequelize });
  }

  static associate (models) {
    this.belongsTo(models.Category, { foreignKey: 'id_category', as: 'categories' })
  }
}

module.exports = Post;