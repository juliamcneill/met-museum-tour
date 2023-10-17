import MetImage from "./components/MetImage";
import Questions from "./components/Questions";
import Results from "./components/Results";
import { UIButton } from "./components/UIButton";
import "./index.css";
import { StyledEngineProvider } from "@mui/material/styles";
import React, { useCallback, useMemo, useState } from "react";

export const App: React.FC = () => {
    const [view, setView] = useState<string>("start");
    const [results, setResults] = useState<object>({});
    const [startTransition, setStartTransition] = useState<string>("100%");
    const [questionsTransition, setQuestionsTransition] = useState<string>("0%");
    const [resultsTransition, setResultsTransition] = useState<string>("0%");

    const changeView = useCallback((option: string) => {
        setTimeout(() => {
            setView(option);
        }, 250);

        if (option === "start") {
            setStartTransition("100%");
            setQuestionsTransition("0%");
            setResultsTransition("0%");
            setResults({});
        } else if (option === "questions") {
            setStartTransition("0%");
            setQuestionsTransition("100%");
            setResultsTransition("0%");
        } else if (option === "results") {
            setStartTransition("0%");
            setQuestionsTransition("0%");
            setResultsTransition("100%");
        }
    }, []);

    const changeViewToQuestions = useCallback(() => {
        changeView("questions");
    }, [changeView]);

    const renderView = useMemo(() => {
        switch (view) {
            case "start":
                return (
                    <div
                        style={{
                            opacity: startTransition,
                            transition: "opacity .25s",
                        }}
                    >
                        <h1 className="flex w-[25rem] justify-center rounded border border-primary  bg-white py-2 tracking-wide text-primary">
                            MET Museum Tour Generator
                        </h1>
                        <MetImage />
                        <UIButton className="mx-auto my-4 mt-8 block w-4/5" onClick={changeViewToQuestions}>
                            Create New Tour
                        </UIButton>
                    </div>
                );
            case "questions":
                return (
                    <div
                        style={{
                            opacity: questionsTransition,
                            transition: "opacity .5s",
                        }}
                    >
                        <Questions setResults={setResults} changeView={changeView} />
                    </div>
                );
            case "results":
                return (
                    <div
                        style={{
                            opacity: resultsTransition,
                            transition: "opacity .5s",
                        }}
                    >
                        <Results results={results} changeView={changeView} />
                    </div>
                );
            default:
                return null;
        }
    }, [view, changeView, changeViewToQuestions, questionsTransition, results, resultsTransition, startTransition]);

    return (
        <StyledEngineProvider injectFirst>
            <div className="min-h-full min-w-full bg-background py-12 pb-20">
                <div className="mx-auto w-10/12 text-primary">{renderView}</div>
            </div>
        </StyledEngineProvider>
    );
};
