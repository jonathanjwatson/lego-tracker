require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 3000;

const app = express();

const db = require("./models");

app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
const exphbs = require("express-handlebars");
const handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(handlebars),
  })
);
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
const userRoutes = require("./controllers/userController.js");
const legoRoutes = require("./controllers/legoController.js");
const searchRoutes = require("./controllers/searchController.js");

app.use(userRoutes);
app.use(legoRoutes);
app.use(searchRoutes);

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/api/config", function (req, res) {
  res.json({
    success: true,
  });
});

app.post("/api/userLegos", function (req, res) {
  console.log(req.body);
  db.UserLegos.create({
    userId: req.body.userId,
    legoId: req.body.legoId,
  })
    .then((newEntry) => {
      res.json({
        success: true,
        message: "Successfully added to your collection.",
        data: newEntry,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.json({
        success: false,
      });
    });
});

db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log(`Server listening on: http://localhost:${PORT}`);
    console.log(process.env);
  });
});
