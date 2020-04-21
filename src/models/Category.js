const { Model, DataTypes } = require('sequelize');

class Category extends Model {
  static init(sequelize) {
    super.init({
      description: DataTypes.STRING
    }, {
      sequelize 
    })
  }

  static associate (models) {
    this.hasMany(models.Post, { foreignKey: 'id_category', as: 'posts' })
  }
}

module.exports = Category;