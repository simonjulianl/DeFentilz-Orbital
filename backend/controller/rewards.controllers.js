const db = require("../models");
const Reward = db.rewards;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.issueDate) {
    return res.status(400).send({
      message: "issueDate cannot be empty",
    });
  }

  if (!req.body.expiryDate) {
    return res.status(400).send({
      message: "expiryDate cannot be empty",
    });
  }

  if (!req.body.value) {
    return res.status(400).send({
      message: "value cannot be empty",
    });
  }

  const reward = {
    issueDate: req.body.issueDate,
    expiryDate: req.body.expiryDate,
    value: req.body.value,
    description: req.body.description,
  };

  Reward.create(reward)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating the Reward",
      });
    });
};

exports.findAll = (req, res) => {
  Reward.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving the Reward",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Reward.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occured while retrieving the Reward of id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Reward.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Reward was updated successfully !",
        });
      } else {
        res.send({
          message: `Cannot update Reward with id=${id}. `,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating reward with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Reward.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Reward was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete Reward with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting reward with id=" + id,
      });
    });
};
