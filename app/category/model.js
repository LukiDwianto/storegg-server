const mongoose = require("mongoose");

let categorySchema = mongoose.Schema(
  {
    name: {
      type: "string",
      require: [true, "nama kategori harus diisi"],
    },
  },
  { timetamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
