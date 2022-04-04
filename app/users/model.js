const mongoose = require("mongoose");

let userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "Email harus diisi"],
    },
    status: {
      type: String,
      enum: ["Y", "N"],
      default: ["Y"],
    },
    name: {
      type: String,
      require: [true, "Nama harus diisi"],
    },
    password: {
      type: String,
      require: [true, "password harus diisi"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "admin",
    },
    phoneNumber: {
      type: String,
      require: [true, "nomor telepon harus diisi"],
    },
  },
  { timetamps: true }
);

module.exports = mongoose.model("User", userSchema);
