import axios from "axios";
import { flatten } from "lodash";

const metApiSearchUrl = "https://collectionapi.metmuseum.org/public/collection/v1/search";
const metApiObjectsUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects";
const metArtworkPublicWebpageUrl = "https://www.metmuseum.org/art/collection/search";
const genericSearchParameters = "isOnView=true&isHighlight=true&hasImages=true";

const wordInString = (string: string, word: string) => new RegExp("\\b" + word + "(?:es|s)?\\b").test(string);
const parser = new DOMParser();

export async function getApiResults(wordsArray: string[]): Promise<any> {
    // Get all object ids that match any of the query words
    const resultsArray = await axios.all(
        wordsArray.map((word) => axios.get(`${metApiSearchUrl}?${genericSearchParameters}&q=${word}`)),
    );

    const allIds = flatten(resultsArray.map((x) => x.data.objectIDs ?? []));

    // Record these object ids by frequency
    const idFrequencyTracker: { [key: string]: number | undefined } = {};
    for (const id of allIds) {
        if (idFrequencyTracker[id] === undefined) {
            idFrequencyTracker[id] = 1;
        } else {
            idFrequencyTracker[id]++;
        }
    }

    // Push all object ids by their frequency value
    const sorted: { id: string; count: number }[] = [];
    for (const [id, count] of Object.entries(idFrequencyTracker)) {
        sorted.push({ id, count });
    }
    sorted.sort((a, b) => b.count - a.count);

    // Take the top 30 most frequent ids and get (1) full artwork metadata from the API and (2) full description from the artwork's webpage
    const topObjects = sorted.slice(0, 30);

    console.log("top objects", topObjects);

    const objectMetadata = await axios.all(topObjects.map(({ id }) => axios.get(`${metApiObjectsUrl}/${id}`)));
    const objectWebpageData = await axios.all(
        topObjects.map(({ id }) => axios.get(`${metArtworkPublicWebpageUrl}/${id}`)),
    );

    const finalArtworksTracker: { [key: string]: { id: string; count: number; index: number } } = {};
    topObjects.forEach(({ id }, index) => {
        const metadata = objectMetadata[index].data;
        const webpageData = objectWebpageData[index].data;

        // The Cloisters is a physically separate museum, so we don't want to include artwork from there in our results
        if (metadata.department === "The Cloisters" || !metadata.isPublicDomain || !metadata.primaryImage) {
            return;
        }

        const parsedWebpageData = parser.parseFromString(webpageData, "text/html");
        const webpageDescription = parsedWebpageData.querySelector(".artwork__intro__desc p").textContent;

        for (const word of wordsArray) {
            if (
                metadata.department.toLowerCase().includes(word) ||
                metadata.objectName.toLowerCase().includes(word) ||
                metadata.title.toLowerCase().includes(word) ||
                metadata.culture.toLowerCase().includes(word) ||
                metadata.period.toLowerCase().includes(word) ||
                metadata.dynasty.toLowerCase().includes(word) ||
                metadata.reign.toLowerCase().includes(word) ||
                metadata.artistDisplayName.toLowerCase().includes(word) ||
                metadata.artistAlphaSort.toLowerCase().includes(word) ||
                metadata.artistNationality.toLowerCase().includes(word) ||
                metadata.objectDate.toLowerCase().includes(word) ||
                metadata.classification.toLowerCase().includes(word) ||
                (webpageDescription && wordInString(webpageDescription.toLowerCase(), word))
            ) {
                if (finalArtworksTracker[id] === undefined) {
                    finalArtworksTracker[id] = { id, count: 1, index };
                } else {
                    finalArtworksTracker[id] = {
                        id,
                        count: finalArtworksTracker[id].count + 1,
                        index,
                    };
                }
            }
        }
    });

    const finalPieces: { id: string; count: number; index: number }[] = [];

    for (const value of Object.values(finalArtworksTracker)) {
        finalPieces.push(value);
    }

    finalPieces.sort((a, b) => b.count - a.count);

    console.log(
        "final rankings",
        finalPieces.map(({ id, count, index }) => ({ id, count, name: objectMetadata[index].data.title })),
    );

    return finalPieces.slice(0, 5).map((x) => objectMetadata[x.index].data);
}
