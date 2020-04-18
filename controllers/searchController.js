const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/search/:searchTerm", (req, res) => {
  // API call to rebrickable and get data to display on the page.
  const url = `https://rebrickable.com/api/v3/lego/sets/?search=${req.params.searchTerm}&key=${process.env.REBRICKABLE_API_KEY}`;
  console.log(url);
  axios
    .get(url)
    .then((response) => {
      res.render("search-results", {
        searchTerm: req.params.searchTerm,
        legos: response.data.results,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.end();
    });
});

module.exports = router;
