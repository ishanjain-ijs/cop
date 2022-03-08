const sequelize = require('../db/conn')
const Sequelize = require("sequelize");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync({force:false,match:/COF$/})
.then(()=>{
  console.log('yes re-sync')
})
db.users = require("./users")
db.forms = require("./forms")
db.users.hasMany(db.forms, {foreignKey: 'user_id'});
db.forms.belongsTo(db.users, {foreignKey: 'user_id'})
module.exports = db;