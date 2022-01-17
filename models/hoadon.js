const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('hoadon', {
    SOHD: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    NGAYLAPHD: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    MAKH: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'khachhang',
        key: 'MAKH'
      }
    }
  }, {
    sequelize,
    tableName: 'hoadon',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "SOHD" },
        ]
      },
      {
        name: "fk_hoadon_khachhang1_idx",
        using: "BTREE",
        fields: [
          { name: "MAKH" },
        ]
      },
    ]
  });
};
