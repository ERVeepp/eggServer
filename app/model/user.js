'use strict';
const model = require('../models/users.js');
module.exports = app => {
  const sequelize = app.Sequelize;
  const DataTypes = sequelize.DataTypes;
  return model(app.model, DataTypes);
};