const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const role = new Schema(
   {
      roleUser: String,
      roleValue: Number,
   },
   {
      collection: 'role',
   },
   { timestamps: true },
);
const RoleModle = mongoose.model('role', role);
module.exports = RoleModle;
