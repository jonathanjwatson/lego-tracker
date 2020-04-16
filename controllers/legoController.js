const express = require("express");

const router = express.Router();

const db = require("../models");

router.get("/legos", function (req, res) {
  db.Lego.findAll()
    .then((legos) => {
      console.log(legos);
      res.render("all-legos", { legos });
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.json({
        error: true,
      });
    });
});

router.get("/api/legos", function (req, res) {
  db.Lego.findAll()
    .then((legos) => {
      console.log(legos);
      res.json(legos);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.json({
        error: true,
      });
    });
});

router.get("/api/legos/:id", function (req, res) {
  db.Lego.findOne({
    where: {
      id: req.params.id,
    },
    include: [{ model: db.User }],
  })
    .then((lego) => {
      console.log(lego);
      res.json(lego);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.json({
        error: true,
      });
    });
});

module.exports = router;
