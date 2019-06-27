/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dawa', {
    name: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    number: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'dawa'
  });
};
