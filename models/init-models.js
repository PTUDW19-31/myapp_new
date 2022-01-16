var DataTypes = require("sequelize").DataTypes;
var _account = require("./account");
var _chitiethoadon = require("./chitiethoadon");
var _chitietsach = require("./chitietsach");
var _comment = require("./comment");
var _giohang = require("./giohang");
var _hoadon = require("./hoadon");
var _khachhang = require("./khachhang");
var _sach = require("./sach");
var _unknowcart = require("./unknowcart");

function initModels(sequelize) {
  var account = _account(sequelize, DataTypes);
  var chitiethoadon = _chitiethoadon(sequelize, DataTypes);
  var chitietsach = _chitietsach(sequelize, DataTypes);
  var comment = _comment(sequelize, DataTypes);
  var giohang = _giohang(sequelize, DataTypes);
  var hoadon = _hoadon(sequelize, DataTypes);
  var khachhang = _khachhang(sequelize, DataTypes);
  var sach = _sach(sequelize, DataTypes);
  var unknowcart = _unknowcart(sequelize, DataTypes);

  hoadon.belongsToMany(sach, { as: 'MASACH_saches', through: chitiethoadon, foreignKey: "SOHD", otherKey: "MASACH" });
  sach.belongsToMany(hoadon, { as: 'SOHD_hoadons', through: chitiethoadon, foreignKey: "MASACH", otherKey: "SOHD" });
  chitiethoadon.belongsTo(hoadon, { as: "SOHD_hoadon", foreignKey: "SOHD"});
  hoadon.hasMany(chitiethoadon, { as: "chitiethoadons", foreignKey: "SOHD"});
  comment.belongsTo(khachhang, { as: "MAKH_khachhang", foreignKey: "MAKH"});
  khachhang.hasMany(comment, { as: "comments", foreignKey: "MAKH"});
  giohang.belongsTo(khachhang, { as: "MAKH_khachhang", foreignKey: "MAKH"});
  khachhang.hasMany(giohang, { as: "giohangs", foreignKey: "MAKH"});
  hoadon.belongsTo(khachhang, { as: "MAKH_khachhang", foreignKey: "MAKH"});
  khachhang.hasMany(hoadon, { as: "hoadons", foreignKey: "MAKH"});
  chitiethoadon.belongsTo(sach, { as: "MASACH_sach", foreignKey: "MASACH"});
  sach.hasMany(chitiethoadon, { as: "chitiethoadons", foreignKey: "MASACH"});
  chitietsach.belongsTo(sach, { as: "MASACH_sach", foreignKey: "MASACH"});
  sach.hasOne(chitietsach, { as: "chitietsach", foreignKey: "MASACH"});
  comment.belongsTo(sach, { as: "MASACH_sach", foreignKey: "MASACH"});
  sach.hasMany(comment, { as: "comments", foreignKey: "MASACH"});
  giohang.belongsTo(sach, { as: "MASACH_sach", foreignKey: "MASACH"});
  sach.hasMany(giohang, { as: "giohangs", foreignKey: "MASACH"});

  return {
    account,
    chitiethoadon,
    chitietsach,
    comment,
    giohang,
    hoadon,
    khachhang,
    sach,
    unknowcart,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
