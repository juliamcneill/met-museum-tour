import { UIInput } from "./UIInput";
import AddIcon from "@mui/icons-material/Add";
import React, { useCallback } from "react";

interface AnswerBlockProps {
    words: string[];
    setWords: React.Dispatch<React.SetStateAction<string[]>>;
}

const AnswerBlock: React.FC<AnswerBlockProps> = ({ words, setWords }) => {
    const handleSetWord = useCallback(
        (index: number, newWord: string) => {
            setWords((words) => words.map((word, i) => (i === index ? newWord : word)));
        },
        [setWords],
    );

    const handleAddWord = useCallback(() => {
        setWords((words) => [...words, ""]);
    }, [setWords]);

    return (
        <div>
            {words.map((word, i) => (
                <UIInput
                    key={`${word}${i}`}
                    className="mx-auto my-4 block w-3/5"
                    placeholder="Enter word"
                    name={`word${i}`}
                    value={word}
                    onChange={(event) => handleSetWord(i, event.target.value)}
                />
            ))}
            <AddIcon className="mx-auto my-4 block w-3/5 cursor-pointer" onClick={handleAddWord} />
        </div>
    );
};

export default AnswerBlock;
