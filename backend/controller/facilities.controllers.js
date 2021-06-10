const db = require("../models");
const Facility = db.facilities;
const Op = db.Sequelize.Op;

const types = ["SPORT", "MEETING", "STUDY", "OTHER"];

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Name cannot be empty",
    });
  }

  if (!types.includes(req.body.type)) {
    res.status(400).send({
      message: "types must be of SPORT, MEETING, STUDY, or OTHER ",
    });
  }

  if (req.body.rate == undefined || req.body.rate < 0) {
    res.status(400).send({
      message: "rate cannot be empty or negative, if its free please input 0 ",
    });
  }

  const facility = {
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
    rate: req.body.rating,
  };

  Facility.create(facility)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the facility",
      });
    });
};

exports.findAll = (req, res) => {
  Facility.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving the facilities",
      });
    });
};

exports.findByName = (req, res) => {
  const name = req.params.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Facility.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving the facilities",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Facility.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Facility with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Facility.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Facility was updated successfully !",
        });
      } else {
        res.send({
          message: `Cannot update Facility with id=${id}. `,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Facility with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Facility.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Facility was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete Facility with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting facility with id=" + id,
      });
    });
};
