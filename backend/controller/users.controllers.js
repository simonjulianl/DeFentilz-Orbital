const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const { uploadFile } = require("../S3/index");

exports.create = (req, res) => {
  if (!req.body.email) {
    return res.status(400).send({
      message: "Email cannot be empty",
    });
  }

  if (!req.body.name) {
    return res.status(400).send({
      message: "Name cannot be empty",
    });
  }

  const user = {
    email: req.body.email,
    name: req.body.name,
    profilePictureUrl: req.body.profilePictureUrl,
    admin: req.body.isAdmin,
  };

  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating the User",
      });
    });
};

exports.findAll = (req, res) => {
  User.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving the User",
      });
    });
};

exports.findByEmail = (req, res) => {
  const email = req.params.email;

  User.findByPk(email)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occured while retrieving the User of email=" + email,
      });
    });
};

exports.findByName = (req, res) => {
  const name = req.params.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  User.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving user with name=" + name,
      });
    });
};

exports.update = (req, res) => {
  const email = req.params.email;

  User.update(req.body, {
    where: { email: email },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully !",
        });
      } else {
        res.send({
          message: `Cannot update user with email=${email}. `,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user with email=" + email,
      });
    });
};

exports.topUpWallet = (req, res) => {
  const email = req.params.email;

  User.findByPk(email)
    .then((user) => {
      const newWalletValue = user.dataValues.walletValue + req.body.value;
      User.update(
        {
          email: email,
          walletValue: newWalletValue,
        },
        {
          where: { email: email },
        }
      ).then((num) => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully !",
          });
        } else {
          res.send({
            message: `Cannot update user with email=${email}. `,
          });
        }
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user with email=" + email,
      });
    });
};

exports.delete = (req, res) => {
  const email = req.params.email;

  User.destroy({
    where: { email: email },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete User with email=${email}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting user with email=" + email,
      });
    });
};

exports.postImage = async (req, res) => {
  const file = req.file;
  const base64Image = file.buffer.toString("base64");

  try {
    const result = await uploadFile(file, base64Image);
    res.send({
      imageUrl: `${result.Location}`,
    });
  } catch (err) {
    res.status(500).send({ message: "Error posting user image, " + err });
  }
};
