const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('khachhang', {
    MAKH: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'account',
        key: 'ID'
      }
    },
    TENKH: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DIACHI: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    DIENTHOAI: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    NGAYSINH: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'khachhang',
    timestamps: false,
    indexes: [
      {
        name: "fk_khachhang_account_idx",
        using: "BTREE",
        fields: [
          { name: "MAKH" },
        ]
      },
    ]
  });
};
