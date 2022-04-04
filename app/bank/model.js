const mongoose = require("mongoose");

let bankSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Nama pemilik harus diisi"],
    },
    nameBank: {
      type: String,
      require: [true, "Nama Bank harus diisi"],
    },
    noRekening: {
      type: String,
      require: [true, "Nomor rekening harus diisi"],
    },
  },
  { timetamps: true }
);

module.exports = mongoose.model("Bank", bankSchema);
