const router = require("express").Router();
const axios = require("axios");

router.get("/objects/:objectId", (req, res) => {
  axios
    .get(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${req.params.objectId}`
    )
    .then((details) => {
      res.status(200).send(details.data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.get("/search/:searchTerm", (req, res) => {
  axios
    .get(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=${req.params.searchTerm}`
    )
    .then((list) => {
      res.status(200).send(list.data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

module.exports = router;
