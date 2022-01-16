const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('unknowcart', {
    UNID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    IDCART: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'unknowcart',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "UNID" },
        ]
      },
    ]
  });
};
