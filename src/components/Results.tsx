import leftArrow from "../assets/leftArrow.jpg";
import met from "../assets/met.jpg";
import rightArrow from "../assets/rightArrow.jpg";
import { Button } from "@mui/material";
import React, { useCallback } from "react";

interface Props {
    results: any;
    changeView: Function;
}
interface Object {
    artistDisplayName?: string;
    title?: string;
    medium?: string;
    objectDate?: string;
    primaryImage?: string;
}

const Results: React.FC<Props> = ({ results, changeView }) => {
    const changeViewToStart = useCallback(() => {
        changeView("start");
    }, [changeView]);

    return (
        <div>
            <img
                className="mx-auto my-4 block w-4/5"
                src={met}
                alt="Line drawing of the Metropolitan Museum of Art"
            ></img>
            {Object.keys(results).length === 0 ? (
                <div id="errorMessage">Not enough results! Try again.</div>
            ) : (
                Object.keys(results).map((key, index) => (
                    <div key={key}>
                        <img
                            className={`mb-[20px] mt-[35px] block w-1/3 ${
                                index % 2 === 0 ? "float-right" : "float-left"
                            }`}
                            src={index % 2 === 0 ? leftArrow : rightArrow}
                            alt="Decorative arrow"
                        ></img>
                        <div
                            className={`relative mb-[5px] mt-[20px] block h-[150px] w-3/5 ${
                                index % 2 === 0 ? "float-right" : "float-left"
                            }`}
                        >
                            <div className="top-/4 absolute top-1/2 m-auto text-2xl decoration-solid">{key}</div>
                        </div>
                        {results[key].map((object: Object) => (
                            <div className="clear-both" key={key + object.title}>
                                <div>{object.artistDisplayName}</div>
                                <div className="font-light">{object.title}</div>
                                <div className="text-sm">{object.medium}</div>
                                <div className="text-sm">{object.objectDate}</div>
                                <img
                                    className=" mx-auto my-4 mb-6 block w-3/5"
                                    src={object.primaryImage}
                                    alt="Reproduction of artwork"
                                />
                            </div>
                        ))}
                    </div>
                ))
            )}

            <Button
                className="mx-auto my-4 mt-8 block w-4/5 rounded-lg border-primary bg-white p-2.5 font-sans normal-case text-primary hover:border-primary hover:bg-white hover:opacity-80"
                variant="outlined"
                onClick={changeViewToStart}
            >
                Generate Another Tour
            </Button>
        </div>
    );
};

export default Results;
