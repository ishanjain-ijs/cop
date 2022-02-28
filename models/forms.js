const Sequelize = require("sequelize");
const sequelize = require("../db/conn");

const Form = sequelize.define("Form", {
  PONo: {
    type: Sequelize.INTEGER,
    // allowNull: false
  },
  legalEntity: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  GST: {
    type: Sequelize.BOOLEAN,
  },
  image: {
    type: Sequelize.STRING
  },
  MSME: {
    type: Sequelize.BOOLEAN,
  },
  SEZ: {
    type: Sequelize.BOOLEAN,
  },
  bAddress: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  sAddress: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  PMName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  PMEmail: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  PMPhoneNo: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  FTName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  FTEmail: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  FTPhoneNo: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  user_id:{
    type: Sequelize.INTEGER
  }
});

module.exports = Form;