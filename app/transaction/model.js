const mongoose = require("mongoose");

let transactionSchema = mongoose.Schema(
  {
    historyVoucherTopup: {
      gameName: {
        type: String,
        require: [true, "nama game harus dissi"],
      },
      category: {
        type: String,
        require: [true, "Kategori game harus dissi"],
      },
      thumbnail: {
        type: String,
      },
      coinName: {
        type: String,
        require: [true, "nama koin harus dissi"],
      },
      coinQuantity: {
        type: String,
        require: [true, "jumlah koin harus dissi"],
      },
      price: {
        type: Number,
      },
    },
    historyPayment: {
      name: {
        type: String,
        require: [true, "nama harus dissi"],
      },
      type: {
        type: String,
        require: [true, "tipe pembayaran harus dissi"],
      },
      bankName: {
        type: String,
        require: [true, "nama bank  harus dissi"],
      },
      noRekening: {
        type: String,
        require: [true, "nomor rekening harus diisi"],
      },
    },
    name: {
      type: String,
      require: [true, "nama harus diisi"],
      maxLength: [225, "Maksimal nama 225 karakter"],
      minLength: [3, "minimal nama 3 karakter"],
    },
    accountUser: {
      type: String,
      require: [true, "nama akun harus diisi"],
      maxLength: [225, "Maksimal nama akun 225 karakter"],
      minLength: [3, "minimal nama akun 3 karakter"],
    },
    tax: {
      type: Number,
      default: 0,
    },
    value: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },

    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
    historyUser: {
      name: { type: String, require: [true, "nama player harus diisi"] },
      phoneNumber: {
        type: String,
        require: [true, "nomor telepon harus diisi"],
        maxLength: [13, "panjang nomor antara 9-13"],
        minLength: [9, "panjang nomor antara 9-13"],
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timetamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
