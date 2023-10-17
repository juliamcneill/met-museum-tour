import { useBooleanState } from "../hooks";
import { SpreadFactor, getApiResults } from "../logic";
import AnswerBlock from "./AnswerBlock";
import { UIButton } from "./UIButton";
import { LinearProgress } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import React, { useCallback, useRef, useState } from "react";

interface Props {
    setResults: (results: object) => void;
    changeView: (view: string) => void;
}

const Questions: React.FC<Props> = ({ setResults, changeView }) => {
    const [topicWords, setTopicWords] = useState<string[]>(["", ""]);
    const [styleWords, setStyleWords] = useState<string[]>(["", ""]);
    const [spreadFactor, setSpreadFactor] = useState<typeof SpreadFactor>("entireMuseum");
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
                const data = await getApiResults(
                    [...styleWords, ...topicWords].filter((x) => !!x),
                    spreadFactor,
                );

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
        [submit, setButtonText, startTimer, setResults, changeView, styleWords, topicWords, spreadFactor],
    );

    return (
        <div>
            <form>
                <div className="flex flex-col gap-6 rounded border border-primary bg-white p-8">
                    <div>
                        <div>
                            List a few broad concepts that you would like to explore today. (ex: love, family, dogs)
                        </div>
                        <AnswerBlock words={topicWords} setWords={setTopicWords} />
                    </div>
                    <div>
                        <div>
                            List a few techniques, genres, mediums, or locations that you would like to explore today.
                            (ex: Realism, Ancient, Baroque, Greek, Egyptian)
                        </div>
                        <AnswerBlock words={styleWords} setWords={setStyleWords} />
                    </div>
                    <FormControl
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setSpreadFactor(event.target.value as typeof SpreadFactor)
                        }
                    >
                        <FormLabel className="font-sans text-primary focus:!text-primary">
                            How localized do you want your tour to be?
                        </FormLabel>
                        <RadioGroup className="mx-auto my-4 block w-3/5">
                            <FormControlLabel
                                value="entireMuseum"
                                control={<Radio />}
                                label="Entire Museum"
                                classes={{ label: "font-sans text-primary" }}
                            />
                            <FormControlLabel
                                value="fewExhibits"
                                control={<Radio />}
                                label="Few Exhibits"
                                classes={{ label: "font-sans text-primary" }}
                            />
                            <FormControlLabel
                                value="singleExhibit"
                                control={<Radio />}
                                label="Single Exhibit"
                                classes={{ label: "font-sans text-primary" }}
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
                <UIButton className="mx-auto my-4 mt-8 block w-3/5" onClick={handleFormSubmit}>
                    {buttonText}
                </UIButton>
                {submitted === true && (
                    <div className="mx-auto my-[40px] h-[17px] w-4/5 rounded-lg border border-primary bg-white p-[3px]">
                        <LinearProgress
                            classes={{ root: "bg-white h-[10px] rounded-lg", bar: "bg-primary" }}
                            variant="determinate"
                            value={progress}
                        />
                    </div>
                )}
            </form>
        </div>
    );
};

export default Questions;
