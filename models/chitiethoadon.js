const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chitiethoadon', {
    SOHD: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'hoadon',
        key: 'SOHD'
      }
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
    SOLUONG: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DONGIA: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    THANHTIEN: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'chitiethoadon',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "SOHD" },
          { name: "MASACH" },
        ]
      },
      {
        name: "fk_chitiethoadon_sach",
        using: "BTREE",
        fields: [
          { name: "MASACH" },
        ]
      },
    ]
  });
};
