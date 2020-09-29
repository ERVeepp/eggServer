/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('posts', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'posts'
  });
};
