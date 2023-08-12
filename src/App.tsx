import met from "./assets/met.jpg";
import Questions from "./components/Questions";
import Results from "./components/Results";
import "./index.css";
import { Button } from "@mui/material";
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
                        <img
                            className="mx-auto my-4 block w-4/5"
                            src={met}
                            alt="Line drawing of the Metropolitan Museum of Art"
                        ></img>
                        <Button
                            className="mx-auto my-4 mt-8 block w-4/5 rounded-lg border-primary bg-white p-2.5 font-sans normal-case text-primary hover:border-primary hover:bg-white hover:opacity-80"
                            variant="outlined"
                            onClick={changeViewToQuestions}
                        >
                            Create New Tour
                        </Button>
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
            <div className="mx-auto my-5 w-10/12 text-primary">{renderView}</div>
        </StyledEngineProvider>
    );
};
