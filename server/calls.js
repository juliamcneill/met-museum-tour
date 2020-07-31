const router = require("express").Router();
const axios = require("axios");

router.get("/generate", (req, res) => {
  var tracker = {};

  console.log("running");

  var wordsArray = [
    req.query.word1,
    req.query.word2,
    req.query.word3,
    req.query.word4,
    req.query.word5,
  ];

  axios
    .all([
      axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&isHighlight=true&q=${wordsArray[0]}`
      ),
      axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&isHighlight=true&q=${wordsArray[1]}`
      ),
      axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&isHighlight=true&q=${wordsArray[2]}`
      ),
      axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&isHighlight=true&q=${wordsArray[3]}`
      ),
      axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&isHighlight=true&q=${wordsArray[4]}`
      ),
    ])
    .then(
      axios.spread((results1, results2, results3, results4, results5) => {
        var resultsArray = [results1, results2, results3, results4, results5];

        for (let h = 0; h < resultsArray.length; h++) {
          let currentWord = wordsArray[h];
          let results = resultsArray[h].data;

          if (results.objectIDs != undefined) {
            for (let i = 0; i < results.objectIDs.length; i++) {
              let currentObjectID = results.objectIDs[i];

              if (currentObjectID != undefined) {
                axios
                  .get(
                    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${currentObjectID}`
                  )
                  .then((details) => {
                    let foundWord = false;
                    let fields = details.data;

                    if (
                      fields.department.toLowerCase().includes(currentWord) ||
                      fields.objectName.toLowerCase().includes(currentWord) ||
                      fields.title.toLowerCase().includes(currentWord) ||
                      fields.culture.toLowerCase().includes(currentWord) ||
                      fields.period.toLowerCase().includes(currentWord) ||
                      fields.dynasty.toLowerCase().includes(wordsArray[h]) ||
                      fields.reign.toLowerCase().includes(wordsArray[h]) ||
                      fields.artistDisplayName
                        .toLowerCase()
                        .includes(wordsArray[h]) ||
                      fields.artistDisplayBio
                        .toLowerCase()
                        .includes(wordsArray[h]) ||
                      fields.artistAlphaSort
                        .toLowerCase()
                        .includes(wordsArray[h]) ||
                      fields.artistNationality
                        .toLowerCase()
                        .includes(wordsArray[h]) ||
                      fields.objectDate.toLowerCase().includes(wordsArray[h]) ||
                      fields.creditLine.toLowerCase().includes(wordsArray[h]) ||
                      fields.classification
                        .toLowerCase()
                        .includes(wordsArray[h])
                    ) {
                      foundWord = true;
                    } else {
                      if (fields.tags != null) {
                        for (let j = 0; j < fields.tags.length; j++) {
                          if (
                            fields.tags[j].term
                              .toLowerCase()
                              .includes(wordsArray[h])
                          ) {
                            foundWord = true;
                          }
                        }
                      }
                    }

                    if (foundWord === true) {
                      console.log(currentWord);
                      console.log(fields);
                      if (tracker[currentObjectID] === undefined) {
                        tracker[currentObjectID] = 1;
                      } else {
                        tracker[currentObjectID]++;
                      }
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            }
          }
        }
      })
    )
    .then(() => {
      setTimeout(function () {
        var sorted = [];

        for (var object in tracker) {
          sorted.push([object, tracker[object]]);
        }

        sorted.sort(function (a, b) {
          return b[1] - a[1];
        });

        console.log(sorted);

        axios
          .all([
            axios.get(
              `https://collectionapi.metmuseum.org/public/collection/v1/objects/${sorted[0][0]}`
            ),
            axios.get(
              `https://collectionapi.metmuseum.org/public/collection/v1/objects/${sorted[1][0]}`
            ),
            axios.get(
              `https://collectionapi.metmuseum.org/public/collection/v1/objects/${sorted[2][0]}`
            ),
            axios.get(
              `https://collectionapi.metmuseum.org/public/collection/v1/objects/${sorted[3][0]}`
            ),
            axios.get(
              `https://collectionapi.metmuseum.org/public/collection/v1/objects/${sorted[4][0]}`
            ),
          ])
          .then(
            axios.spread((object1, object2, object3, object4, object5) => {
              res
                .status(200)
                .send([
                  object1.data,
                  object2.data,
                  object3.data,
                  object4.data,
                  object5.data,
                ]);
            })
          )
          .catch((error) => console.log(error));
      }, 20000);
    })
    .catch((error) => console.log(error));
});

module.exports = router;
