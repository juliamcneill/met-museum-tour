import MapImage from "../../components/MapImage";
import MetImage from "../../components/MetImage";
import { UIButton } from "../../components/UIButton";
import { Artwork, Department } from "../../types";
import { SwipeableDrawer } from "@mui/material";
import { noop } from "lodash";
import React, { useCallback, useState } from "react";

interface ResultsPageProps {
    results: any;
    changeView: Function;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ results, changeView }) => {
    const [selectedDepartment, setSelectedDepartment] = useState<Department | undefined>(undefined);

    const changeViewToStart = useCallback(() => {
        changeView("start");
    }, [changeView]);

    return Object.keys(results).length === 0 ? (
        <div className="p-12">
            <MetImage />
            <div className="mt-8 flex flex-col gap-8 rounded border border-primary bg-white p-8">
                <div className="flex justify-center">Not enough results! Try again.</div>
            </div>
            <UIButton className="mx-auto my-4 mt-8 block w-4/5" onClick={changeViewToStart}>
                Generate Another Tour
            </UIButton>
        </div>
    ) : (
        <>
            <div className="h-4/5">
                <MapImage results={results} setSelectedDepartment={setSelectedDepartment} />
            </div>
            <SwipeableDrawer
                anchor="bottom"
                open={!!selectedDepartment}
                onOpen={noop}
                onClose={() => setSelectedDepartment(undefined)}
                classes={{ paper: "max-h-[80%] p-4 bg-background" }}
            >
                <div className="flex flex-col gap-8 rounded border border-primary bg-white p-8">
                    <div className="flex flex-col">
                        <div className="relative mb-[5px] block w-3/5 pt-2 text-2xl decoration-solid sm:mt-[20px]">
                            {selectedDepartment}
                        </div>
                        {results[selectedDepartment]?.map((artwork: Artwork) => (
                            <div
                                className="flex flex-col items-center sm:flex-row"
                                key={selectedDepartment + artwork.title}
                            >
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
                </div>
            </SwipeableDrawer>
            <div className="h-1/5">
                <UIButton className="mx-auto my-4 mt-8 block w-4/5" onClick={changeViewToStart}>
                    Generate Another Tour
                </UIButton>
            </div>
        </>
    );
};
