import leftArrow from "../assets/leftArrow.jpg";
import rightArrow from "../assets/rightArrow.jpg";
import MetImage from "./MetImage";
import { UIButton } from "./UIButton";
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
                                    className={`relative mb-[5px] mt-[20px] block h-[150px] w-3/5 ${
                                        index % 2 === 0 ? "float-right" : "float-left"
                                    }`}
                                >
                                    <div className="top-/4 absolute top-1/2 m-auto text-2xl decoration-solid">
                                        {key}
                                    </div>
                                </div>
                            </div>
                            {results[key].map((object: Object) => (
                                <div className="align-center flex" key={key + object.title}>
                                    <div className="w-2/5 p-8">
                                        <div>{object.artistDisplayName}</div>
                                        <div className="font-light">{object.title}</div>
                                        <div className="text-sm">{object.medium}</div>
                                        <div className="text-sm">{object.objectDate}</div>
                                    </div>
                                    <img
                                        className="mx-auto my-4 mb-6 block w-1/2"
                                        src={object.primaryImage}
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

export default Results;
