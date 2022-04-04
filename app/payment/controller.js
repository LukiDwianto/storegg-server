Payment = require("./model");
const Bank = require("../bank/model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      let payment = await Payment.find().populate("banks");

      const alert = { alertMessage, alertStatus };
      console.log(alert);
      res.render("admin/payment/view_payment", {
        payment,
        alert,
        name: req.session.user.name,
        title: "Halaman pembayaran",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
      console.log(error);
    }
  },
  create: async (req, res) => {
    try {
      const bank = await Bank.find();
      res.render("admin/payment/create", { bank });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
      console.log(error);
    }
  },
  edit: async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await Payment.findOne({ _id: id });
      const bank = await Bank.find();
      console.log(payment);
      res.render("admin/payment/edit", {
        payment,
        bank,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
      console.log(error);
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { type, banks } = req.body;

      let payment = await Payment({ type, banks, status: "Y" });
      await payment.save();

      req.flash("alertMessage", "Sukses Tambah payment");
      req.flash("alertStatus", "success");

      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
      console.log(error);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { type, bank } = req.body;

      console.log(id);

      req.flash("alertMessage", "Sukses Ubah payment");
      req.flash("alertStatus", "success");
      const payment = await Payment.findOneAndUpdate(
        { _id: id },
        { type, bank }
      );
      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
      console.log(error);
      console.log(error);
    }
  },
  deleteAction: async (req, res) => {
    try {
      const { id } = req.params;
      req.flash("alertMessage", "Sukses Hapus payment");
      req.flash("alertStatus", "success");
      const payment = await Payment.findOneAndRemove({ _id: id });
      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
      console.log(error);
    }
  },
  updateStatus: async (req, res) => {
    try {
      const { id } = req.params;
      let status = "";

      const payment = await Payment.findOne({ _id: id });

      if (payment.status === "Y") {
        status = "N";
      } else {
        status = "Y";
      }

      console.log(status);
      console.log(payment);

      await Payment.findOneAndUpdate(
        { _id: id },
        {
          status,
        }
      );

      req.flash("alertMessage", "Sukses update status payment");
      req.flash("alertStatus", "success");
      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
      console.log(error);
    }
  },
};
