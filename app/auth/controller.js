const Player = require("../player/model");

const path = require("path");
const fs = require("fs");
const config = require("../../config");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  signUp: async (req, res, next) => {
    try {
      const payload = req.body;

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
            let player = await Player({
              ...payload,
              avatar: filename,
            });
            await player.save();
            delete player._doc.password;
            return res.status(201).json({ data: player });
          } catch (error) {
            if (error && error.name === "ValidationError") {
              return res.status(422).json({
                error: 1,
                message: error.message,
                fields: error.errors,
              });
            }
            next(error);
          }
        });
      } else {
        let player = new Player(payload);
        await player.save();

        delete player._doc.password;
        return res.status(201).json({ data: player });
      }
    } catch (error) {
      if (error && error.name === "ValidationError") {
        return res.status(422).json({
          error: 1,
          message: error.message,
          fields: error.errors,
        });
      }
      next(err);
    }
  },
  signIn: (req, res, next) => {
    const { email, password } = req.body;

    Player.findOne({ email: email })
      .then((data) => {
        if (data) {
          const checkPassword = bcrypt.compareSync(password, data.password);
          if (checkPassword) {
            const token = jwt.sign(
              {
                player: {
                  id: data._id,
                  username: data.username,
                  email: data.email,
                  nama: data.name,
                  phoneNumber: data.phoneNumber,
                  avatar: data.avatar,
                },
              },
              config.jwtKey
            );
            res.status(200).json({
              data: { token },
            });
          } else {
            res.status(403).json({
              message: "Password yang dimasukkan salah",
            });
          }
        } else {
          res.status(403).json({
            message: "Email yang anda masukkan belum terdaftar",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message || "internal server error",
        });
      });
  },
};
