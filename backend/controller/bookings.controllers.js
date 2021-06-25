const db = require("../models");
const Booking = db.bookings;
const Op = db.Sequelize.Op;

function isBookingConflicting(start, end, facilId, update = false) {
  // data is stored in GMT+0 in mysql statement
  const condition = {
    [Op.and]: [
      {
        startingTime: {
          [Op.lt]: new Date(end),
        },
      },
      {
        endingTime: {
          [Op.gt]: new Date(start),
        },
      },
    ],
    facilityId: facilId,
  };

  return Booking.count({ where: condition }).then((count) => {
    if (update) {
      return count === 1 ? false : true;
    } else {
      return count === 0 ? false : true;
    }
  });
}

function checkBody(req, res) {
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

  if (!req.body.startingTime) {
    res.status(400).send({
      message: "startingTime cannot be empty ",
    });
  }

  if (!req.body.endingTime) {
    res.status(400).send({
      message: "endingTime cannot be empty ",
    });
  }

  if (req.body.startingTime === req.body.endingTime) {
    res.status(400).send({
      message: "startingTime and endingTime cannot be the same",
    });
  }
}

function getBetweenDate(startingDate, endDate, res, facilityId) {
  Booking.findAll({
    where: {
      [Op.and]: [
        {
          startingTime: {
            [Op.gte]: startingDate,
          },
        },
        {
          endingTime: {
            [Op.lte]: endDate,
          },
        },
        {
          facilityId: facilityId,
        },
      ],
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving the bookings",
      });
    });
}

exports.create = (req, res) => {
  checkBody(req, res);
  const booking = {
    startingTime: req.body.startingTime,
    endingTime: req.body.endingTime,
    userEmail: req.body.userEmail,
    facilityId: req.body.facilityId,
  };

  // check if the facility is booked during that timing
  isBookingConflicting(
    booking.startingTime,
    booking.endingTime,
    booking.facilityId
  ).then((isConflicting) => {
    if (isConflicting) {
      return res.status(500).send({
        message: "Conflicting Booking",
      });
    } else {
      Booking.create(booking)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occured while creating the booking",
          });
        });
    }
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

exports.findByDate = (req, res) => {
  const date = new Date(req.params.date);
  const facilityId = req.params.facilityId;

  getBetweenDate(
    date.setHours(0, 0, 0, 0),
    new Date(date.setDate(date.getDate() + 1)).setHours(0, 0, 0, 0),
    res,
    facilityId
  );
};

exports.findByWeek = (req, res) => {
  const date = new Date(req.params.date);
  const facilityId = req.params.facilityId;

  const getMonday = (date) => {
    // since sunday is 0 not 7
    var day = date.getDay(),
      monDate = date.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(date.setDate(monDate)).setHours(0, 0, 0, 0);
  };

  const getNextMonday = (date) => {
    var day = date.getDay(),
      sunDate = date.getDate() + (day == 0 ? 0 : 7 - date.getDay());
    return new Date(date.setDate(sunDate + 1)).setHours(0, 0, 0, 0);
  };

  const weekMonday = getMonday(date);
  const weekNextMonday = getNextMonday(date);

  getBetweenDate(weekMonday, weekNextMonday, res, facilityId);
};

exports.findByMonth = (req, res) => {
  const date = new Date(req.params.date);
  const facilityId = req.params.facilityId;

  const getBeginningMonthDate = (dt) =>
    new Date(dt.setDate(1)).setHours(0, 0, 0, 0);
  const getEndMonthDate = (dt) =>
    new Date(dt.getFullYear(), dt.getMonth() + 1, 1).setHours(0, 0, 0, 0);

  getBetweenDate(
    getBeginningMonthDate(date),
    getEndMonthDate(date),
    res,
    facilityId
  );
};

exports.update = (req, res) => {
  const id = req.params.id;

  isBookingConflicting(
    req.body.startingTime,
    req.body.endingTime,
    req.body.facilityId,
    true
  ).then((isConflicting) => {
    if (isConflicting) {
      res.status(500).send({
        message: "Conflicting booking",
      });
    } else {
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
            message: err.message || "Error updating Booking with id=" + id,
          });
        });
    }
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
