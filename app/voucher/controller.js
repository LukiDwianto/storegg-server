const { findOneAndUpdate, findOne } = require("./model");

const Voucher = require("./model");
const Category = require("../category/model");
const Nominal = require("../nominal/model");

const path = require("path");
const fs = require("fs");
const config = require("../../config");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      let voucher = await Voucher.find()
        .populate("category")
        .populate("nominals");

      console.log(voucher);
      console.log(alertStatus);

      const alert = { alertMessage, alertStatus };
      console.log(alert);
      res.render("admin/voucher/view_voucher", {
        voucher,
        name: req.session.user.name,
        title: "Halaman Voucher",
        alert,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
      console.log(error);
    }
  },
  create: async (req, res) => {
    try {
      const category = await Category.find();
      let nominal = await Nominal.find();
      console.log(category);
      res.render("admin/voucher/create", {
        category,
        nominal,
        name: req.session.user.name,
        title: "Halaman buat voucher",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
      console.log(error);
    }
  },
  edit: async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await Voucher.findOne({ _id: id })
        .populate("category")
        .populate("nominals");
      const category = await Category.find();

      let nominal = await Nominal.find();
      console.log(category);
      console.log(voucher);
      res.render("admin/voucher/edit", {
        voucher,
        category,
        nominal,
        name: req.session.user.name,
        title: "Ubah voucher",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
      console.log(error);
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, category, nominals } = req.body;

      console.log(req.file);
      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];

        let filename = req.file.filename + "." + originalExt;

        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`
        );
        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);
        src.pipe(dest);
        src.on("end", async () => {
          try {
            let voucher = await Voucher({
              name,
              category,
              nominals,
              thumbnail: filename,
            });
            await voucher.save();
          } catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/voucher");
            console.log(error);
          }
        });
      } else {
        let voucher = await Voucher({
          name,
          category,
          nominals,
        });
        await voucher.save();
      }

      req.flash("alertMessage", "Sukses Tambah voucher");
      req.flash("alertStatus", "success");

      res.redirect("/voucher");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
      console.log(error);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, category, nominals } = req.body;

      console.log(id);
      console.log(req.file);
      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];

        let filename = req.file.filename + "." + originalExt;

        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`
        );
        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);
        src.pipe(dest);
        src.on("end", async () => {
          try {
            const voucher = await Voucher.findOne({ _id: id });
            let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
            if (fs.existsSync(currentImage)) {
              fs.unlinkSync(currentImage);
            }
            await Voucher.findOneAndUpdate(
              { _id: id },
              {
                name,
                category,
                nominals,
                thumbnail: filename,
              }
            );
          } catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/voucher");
            console.log(error);
          }
        });
      } else {
        await Voucher.findOneAndUpdate(
          { _id: id },
          {
            name,
            category,
            nominals,
          }
        );
      }

      req.flash("alertMessage", "Sukses Ubah voucher");
      req.flash("alertStatus", "success");

      res.redirect("/voucher");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");

      console.log(error);
    }
  },
  deleteAction: async (req, res) => {
    try {
      const { id } = req.params;

      const voucher = await Voucher.findOne({ _id: id });
      let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
      if (fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage);
      }
      await Voucher.findOneAndRemove({ _id: id });
      req.flash("alertMessage", "Sukses Hapus voucher");
      req.flash("alertStatus", "success");
      res.redirect("/voucher");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
      console.log(error);
      console.log(error);
    }
  },
  updateStatus: async (req, res) => {
    try {
      const { id } = req.params;
      let status = "";

      const voucher = await Voucher.findOne({ _id: id });

      if (voucher.status === "Y") {
        status = "N";
      } else {
        status = "Y";
      }

      console.log(status);
      console.log(voucher);

      await Voucher.findOneAndUpdate(
        { _id: id },
        {
          status,
        }
      );

      req.flash("alertMessage", "Sukses update status voucher");
      req.flash("alertStatus", "success");
      res.redirect("/voucher");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
      console.log(error);
    }
  },
};
