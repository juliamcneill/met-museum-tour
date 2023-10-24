import MetImage from "../../components/MetImage";
import { UIButton } from "../../components/UIButton";
import { Artwork } from "../../types";
import leftArrow from "../assets/leftArrow.jpg";
import rightArrow from "../assets/rightArrow.jpg";
import React, { useCallback } from "react";

interface ResultsPageProps {
    results: any;
    changeView: Function;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ results, changeView }) => {
    const changeViewToStart = useCallback(() => {
        changeView("start");
    }, [changeView]);

    return (
        <div>
            <MetImage />
            <div className="mt-8 flex flex-col gap-8 rounded border border-primary bg-white p-8">
                {Object.keys(results).length === 0 ? (
                    <div className="flex justify-center">Not enough results! Try again.</div>
                ) : (
                    Object.keys(results).map((key, index) => (
                        <div className="flex flex-col" key={key}>
                            <div>
                                <img
                                    className={`mb-[20px] mt-[35px] block w-1/3 ${
                                        index % 2 === 0 ? "float-right" : "float-left"
                                    }`}
                                    src={index % 2 === 0 ? leftArrow : rightArrow}
                                    alt="Decorative arrow"
                                ></img>
                                <div
                                    className={`relative mb-[5px] block h-[150px] w-3/5 sm:mt-[20px] ${
                                        index % 2 === 0 ? "float-right" : "float-left"
                                    }`}
                                >
                                    <div className="top-/4 absolute top-1/2 m-auto text-2xl decoration-solid">
                                        {key}
                                    </div>
                                </div>
                            </div>
                            {ResultsPage[key].map((artwork: Artwork) => (
                                <div className="flex flex-col items-center sm:flex-row" key={key + artwork.title}>
                                    <div className="w-full p-8 sm:w-2/5">
                                        <div>{artwork.artistDisplayName}</div>
                                        <div className="font-light">{artwork.title}</div>
                                        <div className="text-sm">{artwork.medium}</div>
                                        <div className="text-sm">{artwork.objectDate}</div>
                                    </div>
                                    <img
                                        className="mx-auto my-4 mb-6 block w-4/5 sm:w-1/2"
                                        src={artwork.primaryImage}
                                        alt="Reproduction of artwork"
                                    />
                                </div>
                            ))}
                        </div>
                    ))
                )}
            </div>
            <UIButton className="mx-auto my-4 mt-8 block w-4/5" onClick={changeViewToStart}>
                Generate Another Tour
            </UIButton>
        </div>
    );
};
