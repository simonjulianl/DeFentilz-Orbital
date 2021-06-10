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

  if (!(req.body.type in types)) {
    res.status(400).send({
      message: "types must be of SPORT, MEETING, STUDY, or OTHER ",
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
