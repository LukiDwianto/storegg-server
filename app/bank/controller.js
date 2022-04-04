Bank = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      let bank = await Bank.find();

      console.log(alertMessage);
      console.log(alertStatus);

      const alert = { alertMessage, alertStatus };
      console.log(alert);
      res.render("admin/bank/view_bank", {
        bank,
        alert,
        name: req.session.user.name,
        title: "Halaman dasbor",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
      console.log(error);
    }
  },
  create: async (req, res) => {
    try {
      res.render("admin/bank/create", {
        name: req.session.user.name,
        title: "Tambah  bank",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
      console.log(error);
    }
  },
  edit: async (req, res) => {
    try {
      const { id } = req.params;
      const bank = await Bank.findOne({ _id: id });
      console.log(bank);
      res.render("admin/bank/edit", {
        bank,
        name: req.session.user.name,
        title: "Ubah bank",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
      console.log(error);
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, nameBank, noRekening } = req.body;

      let bank = await Bank({ name, nameBank, noRekening });
      await bank.save();

      req.flash("alertMessage", "Sukses Tambah bank");
      req.flash("alertStatus", "success");

      res.redirect("/bank");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
      console.log(error);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, nameBank, noRekening } = req.body;

      console.log(id);

      req.flash("alertMessage", "Sukses Ubah bank");
      req.flash("alertStatus", "success");
      const bank = await Bank.findOneAndUpdate(
        { _id: id },
        { name, nameBank, noRekening }
      );
      res.redirect("/bank");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
      console.log(error);
      console.log(error);
    }
  },
  deleteAction: async (req, res) => {
    try {
      const { id } = req.params;
      req.flash("alertMessage", "Sukses Hapus bank");
      req.flash("alertStatus", "success");
      const bank = await Bank.findOneAndRemove({ _id: id });
      res.redirect("/bank");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
      console.log(error);
    }
  },
};
