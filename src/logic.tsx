import axios from "axios";

function timeout() {
    return new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 8000);
    });
}

export async function getApiResults(wordsArray: [string, string, string, string, string]): Promise<any> {
    const tracker: { [key: string]: number | undefined } = {};

    return Promise.race([timeout().then(() => resolvePieces()), getResults().then(() => resolvePieces())]);

    async function getResults() {
        const resultsArray = await axios.all([
            axios.get(
                `https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&isHighlight=true&q=${wordsArray[0]}`,
            ),
            axios.get(
                `https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&isHighlight=true&q=${wordsArray[1]}`,
            ),
            axios.get(
                `https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&isHighlight=true&q=${wordsArray[2]}`,
            ),
            axios.get(
                `https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&isHighlight=true&q=${wordsArray[3]}`,
            ),
            axios.get(
                `https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&isHighlight=true&q=${wordsArray[4]}`,
            ),
        ]);

        for (let h = 0; h < resultsArray.length; h++) {
            const currentWord = wordsArray[h];
            const results = resultsArray[h].data;

            if (results.objectIDs != undefined) {
                for (let i = 0; i < results.objectIDs.length; i++) {
                    const currentObjectID = results.objectIDs[i];

                    if (currentObjectID != undefined) {
                        const details = await axios.get(
                            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${currentObjectID}`,
                        );

                        let foundWord = false;
                        const fields = details.data;
                        if (
                            fields.department != "American Decorative Arts" &&
                            fields.department != "Arms and Armor" &&
                            fields.department != "The Cloisters" &&
                            fields.department != "European Sculpture and Decorative Arts"
                        ) {
                            if (
                                fields.department.toLowerCase().includes(currentWord) ||
                                fields.objectName.toLowerCase().includes(currentWord) ||
                                fields.title.toLowerCase().includes(currentWord) ||
                                fields.culture.toLowerCase().includes(currentWord) ||
                                fields.period.toLowerCase().includes(currentWord) ||
                                fields.dynasty.toLowerCase().includes(wordsArray[h]) ||
                                fields.reign.toLowerCase().includes(wordsArray[h]) ||
                                fields.artistDisplayName.toLowerCase().includes(wordsArray[h]) ||
                                fields.artistDisplayBio.toLowerCase().includes(wordsArray[h]) ||
                                fields.artistAlphaSort.toLowerCase().includes(wordsArray[h]) ||
                                fields.artistNationality.toLowerCase().includes(wordsArray[h]) ||
                                fields.objectDate.toLowerCase().includes(wordsArray[h]) ||
                                fields.creditLine.toLowerCase().includes(wordsArray[h]) ||
                                fields.classification.toLowerCase().includes(wordsArray[h])
                            ) {
                                foundWord = true;
                            } else {
                                if (fields.tags != null) {
                                    for (let j = 0; j < fields.tags.length; j++) {
                                        if (fields.tags[j].term.toLowerCase().includes(wordsArray[h])) {
                                            foundWord = true;
                                        }
                                    }
                                }
                            }
                        }

                        if (foundWord === true) {
                            console.log("found " + currentWord + " in " + fields.title);
                            if (tracker[currentObjectID] === undefined) {
                                tracker[currentObjectID] = 1;
                            } else {
                                tracker[currentObjectID]!++;
                            }
                        }
                    }
                }
            }
        }
    }

    async function resolvePieces() {
        const sorted: [string, number][] = [];

        for (const object in tracker) {
            sorted.push([object, tracker[object]!]);
        }

        sorted.sort(function (a, b) {
            return b[1] - a[1];
        });

        if (sorted.length >= 5) {
            const [object1, object2, object3, object4, object5] = await axios.all([
                axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${sorted[0][0]}`),
                axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${sorted[1][0]}`),
                axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${sorted[2][0]}`),
                axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${sorted[3][0]}`),
                axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${sorted[4][0]}`),
            ]);

            return [object1.data, object2.data, object3.data, object4.data, object5.data];
        } else {
            return [];
        }
    }
}
