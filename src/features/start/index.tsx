import MetImage from "../../components/MetImage";
import { UIButton } from "../../components/UIButton";
import "../../index.css";
import React, { useCallback } from "react";

interface StartPageProps {
    changeView: (option: string) => void;
}

export const StartPage: React.FC<StartPageProps> = ({ changeView }) => {
    const changeViewToQuestions = useCallback(() => {
        changeView("questions");
    }, [changeView]);

    return (
        <>
            <h1 className="flex w-[25rem] max-w-full justify-center rounded border  border-primary bg-white py-2 tracking-wide text-primary">
                MET Museum Tour Generator
            </h1>
            <MetImage />
            <UIButton className="mx-auto my-4 mt-8 block w-4/5" onClick={changeViewToQuestions}>
                Create New Tour
            </UIButton>
        </>
    );
};
