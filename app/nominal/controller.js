const { findOneAndUpdate } = require("./model");

Nominal = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      let nominal = await Nominal.find();

      console.log(alertMessage);
      console.log(alertStatus);

      const alert = { alertMessage, alertStatus };
      console.log(alert);
      res.render("admin/nominal/view_nominal", {
        nominal,
        alert,
        name: req.session.user.name,
        title: "Halaman Nominal",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
      console.log(error);
    }
  },
  create: async (req, res) => {
    try {
      res.render("admin/nominal/create", {
        name: req.session.user.name,
        title: "Buat nominal",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
      console.log(error);
    }
  },
  edit: async (req, res) => {
    try {
      const { id } = req.params;
      const nominal = await Nominal.findOne({ _id: id });
      console.log(nominal);
      res.render("admin/nominal/edit", {
        nominal,
        name: req.session.user.name,
        title: "Halaman ubah nominal",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
      console.log(error);
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { coinName, coinQuantity, price } = req.body;

      let nominal = await Nominal({ coinName, coinQuantity, price });
      await nominal.save();

      req.flash("alertMessage", "Sukses Tambah nominal");
      req.flash("alertStatus", "success");

      res.redirect("/nominal");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
      console.log(error);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { coinName, coinQuantity, price } = req.body;

      console.log(id);

      req.flash("alertMessage", "Sukses Ubah nominal");
      req.flash("alertStatus", "success");
      const nominal = await Nominal.findOneAndUpdate(
        { _id: id },
        { coinName, coinQuantity, price }
      );
      res.redirect("/nominal");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
      console.log(error);
      console.log(error);
    }
  },
  deleteAction: async (req, res) => {
    try {
      const { id } = req.params;
      req.flash("alertMessage", "Sukses Hapus nominal");
      req.flash("alertStatus", "success");
      const nominal = await Nominal.findOneAndRemove({ _id: id });
      res.redirect("/nominal");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
      console.log(error);
      console.log(error);
    }
  },
};
