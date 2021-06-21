const db = require("../models");
const Facility = db.facilities;
const Op = db.Sequelize.Op;
const { uploadFile } = require("../S3/index");

const types = ["SPORT", "MEETING", "STUDY", "OTHER"];

exports.create = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Name cannot be empty",
    });
  }

  if (!types.includes(req.body.type)) {
    return res.status(400).send({
      message: "types must be of SPORT, MEETING, STUDY, or OTHER ",
    });
  }

  if (req.body.rate && req.body.rate < 0) {
    return res.status(400).send({
      message: "rate cannot be negative ",
    });
  }

  const facility = {
    name: req.body.name,
    type: req.body.type,
    location: req.body.location,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
    rate: req.body.rate,
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
  const keywords = req.params.name.split(" ");

  // mysql regex is case insensitive
  const generateRegex = (keywords) =>
    keywords
      .map((key) => "(?=.*" + key + ".*)")
      .reduce((key, acc) => key + acc);

  var condition =
    keywords.length > 0
      ? { name: { [Op.regexp]: generateRegex(keywords) } }
      : null;

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

exports.findByLocation = (req, res) => {
  const location = req.params.location;
  var condition = location
    ? { location: { [Op.like]: `%${location}%` } }
    : null;

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

exports.findByType = (req, res) => {
  const type = req.params.type;

  if (!types.includes(type)) {
    res.status(400).send({
      message: "types must be of SPORT, MEETING, STUDY, or OTHER ",
    });
  }

  Facility.findAll({ where: { type: type } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some error occured while retrieving facility by type ",
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

exports.postImage = async (req, res) => {
  const file = req.file;
  const base64Image = file.buffer.toString("base64");

  try {
    const result = await uploadFile(file, base64Image);
    res.send({
      imageUrl: `${result.Location}`,
    });
  } catch (err) {
    res.status(500).send({ message: "Error posting facility image, " + err });
  }
};
