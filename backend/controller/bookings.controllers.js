const db = require("../models");
const Booking = db.bookings;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.facilityId) {
    res.status(400).send({
      message: "facilityId cannot be empty ",
    });
  }

  if (!req.body.userEmail) {
    res.status(400).send({
      message: "userEmail cannot be empty ",
    });
  }

  if (!startingTime) {
    res.status(400).send({
      message: "startingTime cannot be empty ",
    });
  }

  if (!endingTime) {
    res.status(400).send({
      message: "endingTime cannot be empty ",
    });
  }

  const booking = {
    startingTime: req.body.startingTime,
    endingTime: req.body.endingTime,
    userEmail: req.body.userEmail,
    facilityId: req.body.userEmail,
  };

  Booking.create(booking)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating the booking",
      });
    });
};

exports.findAll = (req, res) => {
  Booking.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving the bookings",
      });
    });
};

exports.findByFacilityId = (req, res) => {
  const facilityId = req.params.facilityId;

  Booking.findAll({ where: { facilityId: facilityId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving the bookings",
      });
    });
};

exports.findByUserEmail = (req, res) => {
  const userEmail = req.params.userEmail;

  Booking.findAll({ where: { userEmail: userEmail } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving the bookings",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Booking.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Booking with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Booking.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Booking was updated successfully !",
        });
      } else {
        res.send({
          message: `Cannot update Booking with id=${id}. `,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Booking with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Booking.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Booking was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete Booking with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting booking with id=" + id,
      });
    });
};
