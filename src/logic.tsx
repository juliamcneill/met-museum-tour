import axios from "axios";
import { flatten, groupBy } from "lodash";

const metApiSearchUrl = "https://collectionapi.metmuseum.org/public/collection/v1/search";
const metApiObjectsUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects";
const metArtworkPublicWebpageUrl = "https://www.metmuseum.org/art/collection/search";
const genericSearchParameters = "isOnView=true&isHighlight=true&hasImages=true";

export const SpreadFactor = "singleExhibit" || "fewExhibits" || "entireMuseum";

const wordInString = (string: string, word: string) => new RegExp("\\b" + word + "\\b").test(string);
const parser = new DOMParser();

export function processWords(words: string[]) {
    const lowercaseWords = words.map((x) => x.toLowerCase());

    const wordsWithNonPlurals = lowercaseWords.reduce((array, word) => {
        if (word.endsWith("s")) {
            return [...array, word, word.slice(0, -1)];
        } else if (word.endsWith("es")) {
            return [...array, word, word.slice(0, -2)];
        } else {
            return [...array, word];
        }
    }, []);

    return wordsWithNonPlurals;
}

export async function getApiResults(unprocessedWords: string[], spreadFactor: typeof SpreadFactor): Promise<any> {
    const words = processWords(unprocessedWords);

    // Get all object ids that match any of the query words
    const resultsArray = await axios.all(
        words.map((word) => axios.get(`${metApiSearchUrl}?${genericSearchParameters}&q=${word}`)),
    );

    console.info("all results", resultsArray);

    const allIds = flatten(resultsArray.map((x) => x.data.objectIDs ?? []));

    console.info("all result ids", allIds);

    // Record these object ids by frequency
    const idFrequencyTracker: { [key: string]: number | undefined } = {};
    for (const id of allIds) {
        if (idFrequencyTracker[id] === undefined) {
            idFrequencyTracker[id] = 1;
        } else {
            idFrequencyTracker[id]++;
        }
    }

    console.info("all result ids by frequency", idFrequencyTracker);

    // Push all object ids by their frequency value
    const sorted: { id: string; count: number }[] = [];
    for (const [id, count] of Object.entries(idFrequencyTracker)) {
        sorted.push({ id, count });
    }
    sorted.sort((a, b) => b.count - a.count);

    // Take the top 30 most frequent ids and get (1) full artwork metadata from the API and (2) full description from the artwork's webpage
    const topObjects = sorted.slice(0, 30);

    console.info("top objects sorted by frequency", topObjects);

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

        for (const word of words) {
            if (
                metadata.objectName.toLowerCase().includes(word) ||
                metadata.title.toLowerCase().includes(word) ||
                metadata.artistDisplayName.toLowerCase().includes(word) ||
                metadata.artistAlphaSort.toLowerCase().includes(word) ||
                metadata.classification.toLowerCase().includes(word)
            ) {
                console.info("matching word (WEIGHTED X2)", word, metadata.title);

                if (finalArtworksTracker[id] === undefined) {
                    finalArtworksTracker[id] = { id, count: 2, index };
                } else {
                    finalArtworksTracker[id] = {
                        id,
                        count: finalArtworksTracker[id].count + 2,
                        index,
                    };
                }
            } else if (
                metadata.department.toLowerCase().includes(word) ||
                metadata.culture.toLowerCase().includes(word) ||
                metadata.period.toLowerCase().includes(word) ||
                metadata.dynasty.toLowerCase().includes(word) ||
                metadata.reign.toLowerCase().includes(word) ||
                metadata.artistNationality.toLowerCase().includes(word) ||
                metadata.objectDate.toLowerCase().includes(word) ||
                (webpageDescription && wordInString(webpageDescription.toLowerCase(), word))
            ) {
                console.info("matching word", word, metadata.title);
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

    console.info(
        "final rankings",
        finalPieces.map(({ id, count, index }) => ({ id, count, name: objectMetadata[index].data.title })),
    );

    if (spreadFactor === "entireMuseum") {
        return finalPieces.slice(0, 10).map((x) => objectMetadata[x.index].data);
    } else {
        const byExhibit = Object.values(groupBy(finalPieces, (x) => objectMetadata[x.index].data.department)).sort(
            (a, b) => (a.length > b.length ? -1 : 1),
        );

        if (spreadFactor === "fewExhibits") {
            return flatten(byExhibit.slice(0, 3).map((x) => x.map((y) => objectMetadata[y.index].data)));
        } else {
            return flatten(byExhibit.slice(0, 1).map((x) => x.map((y) => objectMetadata[y.index].data)));
        }
    }
}
