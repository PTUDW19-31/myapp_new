const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('giohang', {
    IDCART: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    MASACH: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'sach',
        key: 'MASACH'
      }
    },
    MAKH: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'khachhang',
        key: 'MAKH'
      }
    },
    SOLUONG: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DONGIA: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'giohang',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IDCART" },
          { name: "MASACH" },
        ]
      },
      {
        name: "fk_giohang_khachhang",
        using: "BTREE",
        fields: [
          { name: "MAKH" },
        ]
      },
      {
        name: "fk_giohang_sach",
        using: "BTREE",
        fields: [
          { name: "MASACH" },
        ]
      },
    ]
  });
};
