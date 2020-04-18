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

router.post("/api/legos", function (req, res) {
  const newLegoObject = {
    name: req.body.name.trim(),
    numberOfPieces: req.body.numberOfPieces,
    setNumber: req.body.setNumber.trim(),
    imageURL: req.body.imageURL.trim(),
  };
  db.Lego.create(newLegoObject)
    .then((newLego) => {
      console.log(newLego);
      res.json({
        message: "Successfully created new lego",
        success: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.json({
        success: false,
        message: "An error occurred adding your lego to our database",
      });
    });
});

module.exports = router;
