const { findOneAndUpdate } = require("./model");

Category = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      let category = await Category.find();

      console.log(alertMessage);
      console.log(alertStatus);

      const alert = { alertMessage, alertStatus };
      console.log(alert);
      res.render("admin/category/view_category", {
        category,
        alert,
        name: req.session.user.name,
        title: "Halaman Kategori",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
      console.log(error);
    }
  },
  create: async (req, res) => {
    try {
      res.render("admin/category/create", {
        name: req.session.user.name,
        title: "Halaman Buat kategori",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
      console.log(error);
    }
  },
  edit: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findOne({ _id: id });

      res.render("admin/category/edit", {
        category,
        name: req.session.user.name,
        title: "Ubah Category",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
      console.log(error);
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name } = req.body;
      let category = await Category({ name });
      await category.save();

      req.flash("alertMessage", "Sukses Tambah kategori");
      req.flash("alertStatus", "success");

      res.redirect("/category");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
      console.log(error);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      console.log(id);

      req.flash("alertMessage", "Sukses Ubah kategori");
      req.flash("alertStatus", "success");
      const category = await Category.findOneAndUpdate({ _id: id }, { name });
      res.redirect("/category");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
      console.log(error);
      console.log(error);
    }
  },
  deleteAction: async (req, res) => {
    try {
      const { id } = req.params;
      req.flash("alertMessage", "Sukses Hapus kategori");
      req.flash("alertStatus", "success");
      const category = await Category.findOneAndRemove({ _id: id });
      res.redirect("/category");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
      console.log(error);
      console.log(error);
    }
  },
};
