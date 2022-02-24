const Sequelize = require('sequelize')
const sequelize = require("../db/conn");

const User = sequelize.define("User", {
  fullName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique:true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = User;