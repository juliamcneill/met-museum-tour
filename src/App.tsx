import { QuestionsPage } from "./features/questions";
import { ResultsPage } from "./features/results";
import { StartPage } from "./features/start";
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
                        <StartPage changeView={changeView} />
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
                        <QuestionsPage setResults={setResults} changeView={changeView} />
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
                        <ResultsPage results={results} changeView={changeView} />
                    </div>
                );
            default:
                return null;
        }
    }, [view, results, changeView, questionsTransition, resultsTransition, startTransition]);

    return (
        <StyledEngineProvider injectFirst>
            <div className="min-h-full min-w-full bg-background py-12 pb-20">
                <div className="mx-auto w-10/12 text-primary">{renderView}</div>
            </div>
        </StyledEngineProvider>
    );
};
