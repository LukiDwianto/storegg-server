const User = require("./model");
const bcrypt = require("bcryptjs");
const e = require("connect-flash");

module.exports = {
  loginPage: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { alertMessage, alertStatus };
      if (req.session.user === null || req.session.user === undefined) {
        res.render("admin/users/login", {
          alert,
          title: "Login",
        });
      } else {
        res.redirect("/dashboard");
      }
    } catch (error) {
      res.redirect("/");
      console.log(error);
    }
  },

  actionSignIn: async (req, res) => {
    try {
      const { email, password } = req.body;

      const check = await User.findOne({ email: email });

      if (check) {
        if (check.status === "Y") {
          const checkPassword = await bcrypt.compare(password, check.password);

          if (checkPassword) {
            req.session.user = {
              id: check._id,
              email: check.email,
              status: check.status,
              name: check.name,
            };
            res.redirect("/dashboard");
          } else {
            req.flash("alertMessage", `Kata sandi tidak sesuai`);
            req.flash("alertStatus", "danger");
            res.redirect("/");
          }
        } else {
          req.flash("alertMessage", `User tidak aktif`);
          req.flash("alertStatus", "danger");
          res.redirect("/");
        }
      } else {
        req.flash("alertMessage", `User tidak dapat ditemukan`);
        req.flash("alertStatus", "danger");
        res.redirect("/");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
      console.log(error);
    }
  },
  actionLogout: (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
};
