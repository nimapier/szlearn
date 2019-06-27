/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('items', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    detail: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    pic: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    createtime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'items'
  });
};
