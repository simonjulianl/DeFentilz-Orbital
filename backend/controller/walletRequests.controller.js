const db = require("../models");
const WalletRequest = db.walletRequests;
const User = db.users;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.userEmail) {
    return res.status(400).send({
      message: "user Email cannot be empty",
    });
  }

  if (!req.body.value || req.body.value < 0) {
    return res.status(400).send({
      message: "value cannot be empty / negative",
    });
  }

  const walletRequest = {
    userEmail: req.body.userEmail,
    value: req.body.value,
  };

  Promise.all(
    User.update(
      {
        email: email,
        lastTopUpRequest: new Date(),
      },
      {
        where: { email: email },
      }
    ),
    WalletRequest.create(walletRequest)
  )
    .then((values) => res.send(values))
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occured while creating the wallet top up request",
      });
    });
};

exports.findAll = (req, res) => {
  WalletRequest.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occured while retrieving the wallet top up request",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  WalletRequest.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occured while retrieving the wallet top up request of id=" +
            id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  WalletRequest.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Wallet top up request was updated successfully !",
        });
      } else {
        res.send({
          message: `Cannot update wallet top up request with id=${id}. `,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error updating wallet top up request with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  WalletRequest.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Wallet top up request was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete wallet top up request with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting wallet top up request with id=" + id,
      });
    });
};
