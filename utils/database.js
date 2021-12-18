const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const operatorsAliases = {
  $or: Op.or,
  $eq: Op.eq,
  $ne: Op.ne,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col,
  $and: Op.and,
  $like: Op.like,
};
//whatwethink

const sequelize = new Sequelize('testdb', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    operatorsAliases: operatorsAliases
});


// const sequelize = new Sequelize('wwt', 'root', 'Mysql@420.com', {
//   dialect: 'mysql',
//   host: 'localhost',
//   operatorsAliases: operatorsAliases
// });

module.exports = sequelize;



