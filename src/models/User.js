const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    }, { sequelize });
  }

  static associate (models) {
    this.hasMany(models.Post, { foreignKey: 'id_user', as: 'posts' })
  }
}

module.exports = User;