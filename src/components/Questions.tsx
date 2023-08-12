import { useBooleanState } from "../hooks";
import { getApiResults } from "../logic";
import { UIButton } from "./UIButton";
import { UIInput } from "./UIInput";
import { LinearProgress } from "@mui/material";
import React, { useCallback, useRef, useState } from "react";

interface Props {
    setResults: (results: object) => void;
    changeView: (view: string) => void;
}

const Questions: React.FC<Props> = ({ setResults, changeView }) => {
    const [word1, setWord1] = useState<string>("");
    const [word2, setWord2] = useState<string>("");
    const [word3, setWord3] = useState<string>("");
    const [word4, setWord4] = useState<string>("");
    const [word5, setWord5] = useState<string>("");
    const [submitted, submit] = useBooleanState(false);
    const [progress, setProgress] = useState<number>(0);
    const [buttonText, setButtonText] = useState<string>("Generate Tour");

    const interval: any = useRef(null);

    const startTimer = useCallback(() => {
        interval.current = setInterval(() => {
            if (progress >= 100) {
                clearInterval(interval.current);
            }

            setProgress((progress) => (progress < 100 ? progress + 1 : 100));
        }, 100);
    }, [interval, progress, setProgress]);

    const handleFormSubmit = useCallback(
        async (event: any) => {
            event.preventDefault();
            submit();
            setButtonText("Generating...");
            startTimer();

            try {
                const data = await getApiResults([
                    word1.toLowerCase(),
                    word2.toLowerCase(),
                    word3.toLowerCase(),
                    word4.toLowerCase(),
                    word5.toLowerCase(),
                ]);

                const sortedByDepartment: any = {};
                for (let i = 0; i < data.length; i++) {
                    if (sortedByDepartment[data[i].department] === undefined) {
                        sortedByDepartment[data[i].department] = [data[i]];
                    } else {
                        sortedByDepartment[data[i].department].push(data[i]);
                    }
                }
                setResults(sortedByDepartment);
                changeView("results");
            } catch (error: any) {
                alert(error.message);
            }
        },
        [submit, setButtonText, startTimer, setResults, changeView, word1, word2, word3, word4, word5],
    );

    const handleSetWord1 = useCallback(
        ({ target }: any) => {
            setWord1(target.value);
        },
        [setWord1],
    );

    const handleSetWord2 = useCallback(
        ({ target }: any) => {
            setWord2(target.value);
        },
        [setWord2],
    );

    const handleSetWord3 = useCallback(
        ({ target }: any) => {
            setWord3(target.value);
        },
        [setWord3],
    );

    const handleSetWord4 = useCallback(
        ({ target }: any) => {
            setWord4(target.value);
        },
        [setWord4],
    );

    const handleSetWord5 = useCallback(
        ({ target }: any) => {
            setWord5(target.value);
        },
        [setWord5],
    );

    return (
        <div>
            <form>
                <UIInput
                    className="mx-auto my-4 block w-3/5"
                    placeholder="Enter word"
                    name="word1"
                    value={word1}
                    onChange={handleSetWord1}
                />
                <UIInput
                    className="mx-auto my-4 block w-3/5"
                    placeholder="Enter word"
                    name="word2"
                    value={word2}
                    onChange={handleSetWord2}
                />
                <UIInput
                    className="mx-auto my-4 block w-3/5"
                    placeholder="Enter word"
                    name="word3"
                    value={word3}
                    onChange={handleSetWord3}
                />
                <UIInput
                    className="mx-auto my-4 block w-3/5"
                    placeholder="Enter word"
                    name="word4"
                    value={word4}
                    onChange={handleSetWord4}
                />
                <UIInput
                    className="mx-auto my-4 block w-3/5"
                    placeholder="Enter word"
                    name="word5"
                    value={word5}
                    onChange={handleSetWord5}
                />
                <UIButton className="mx-auto my-4 mt-8 block w-3/5" onClick={handleFormSubmit}>
                    {buttonText}
                </UIButton>
            </form>
            {submitted === true && (
                <div className="mx-auto my-[40px] h-[17px] w-4/5 rounded-lg border border-primary bg-white p-[3px]">
                    <LinearProgress
                        classes={{ root: "bg-white h-[10px] rounded-lg", bar: "bg-primary" }}
                        variant="determinate"
                        value={progress}
                    />
                </div>
            )}
        </div>
    );
};

export default Questions;
