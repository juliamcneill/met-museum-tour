import { UnreachableCaseError } from "ts-essentials";

export interface Artwork {
    artistDisplayName?: string;
    title?: string;
    medium?: string;
    objectDate?: string;
    primaryImage?: string;
}

export enum Department {
    americanDecorativeArts = "American Decorative Arts",
    ancientNearEasternArt = "Ancient Near Eastern Art",
    armsAndArmor = "Arms and Armor",
    artsOfAfricaOceaniaAndTheAmericas = "Arts of Africa, Oceania, and the Americas",
    asianArt = "Asian Art",
    drawingsAndPrints = "Drawings and Prints",
    egyptianArt = "Egyptian Art",
    europeanPaintings = "European Paintings",
    europeanSculptureAndDecorativeArts = "European Sculpture and Decorative Arts",
    greekAndRomanArt = "Greek and Roman Art",
    islamicArt = "Islamic Art",
    theRobertLehmanCollection = "The Robert Lehman Collection",
    medievalArt = "Medieval Art",
    musicalInstruments = "Musical Instruments",
    photographs = "Photographs",
    modernArt = "Modern Art",

    // TODO: Clean up logic for hidden departments
    // theCloisters = "The Cloisters",
    // theCostumeInstitute = "The Costume Institute",
    // theLibraries = "The Libraries",
}

// TODO: Switch these to Tailwind classes
export function getDepartmentLocationStyles(department: Department): React.CSSProperties {
    switch (department) {
        case Department.americanDecorativeArts:
            return { left: "50%", top: "50%" };
        case Department.ancientNearEasternArt:
            return { left: "35%", top: "40%" };
        case Department.armsAndArmor:
            return { left: "60%", top: "57%" };
        case Department.artsOfAfricaOceaniaAndTheAmericas:
            return { left: "20%", top: "78%" };
        case Department.asianArt:
            return { left: "70%", top: "20%" };
        case Department.drawingsAndPrints:
            return { left: "37%", top: "34%" };
        case Department.egyptianArt:
            return { left: "75%", top: "63%" };
        case Department.europeanPaintings:
            return { left: "20%", top: "25%" };
        case Department.europeanSculptureAndDecorativeArts:
            return { left: "27%", top: "69%" };
        case Department.greekAndRomanArt:
            return { left: "3%", top: "88%" };
        case Department.islamicArt:
            return { left: "27%", top: "46%" };
        case Department.theRobertLehmanCollection:
            return { left: "13%", top: "56%" };
        case Department.medievalArt:
            return { left: "40%", top: "65%" };
        case Department.musicalInstruments:
            return { left: "50%", top: "15%" };
        case Department.photographs:
            return { left: "30%", top: "31%" };
        case Department.modernArt:
            return { left: "5%", top: "75%" };

        default:
            throw new UnreachableCaseError(department);
    }
}
