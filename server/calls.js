const router = require("express").Router();
const axios = require("axios");

router.get("/objects/:objectId", (req, res) => {
  console.log("id is" + req.params.objectId);
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

module.exports = router;
