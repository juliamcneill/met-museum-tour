import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { useBooleanState } from '../hooks/useBooleanState';

interface Props {
  setResults: (results: object) => void;
  changeView: (view: string) => void;
}

export const Questions: React.FC<Props> = ({ setResults, changeView }) => {
  const [timer, setTimer] = useState<number>(0);
  const [word1, setWord1] = useState<string>('');
  const [word2, setWord2] = useState<string>('');
  const [word3, setWord3] = useState<string>('');
  const [word4, setWord4] = useState<string>('');
  const [word5, setWord5] = useState<string>('');
  const [submitted, , submit] = useBooleanState(false);
  const [seconds, setSeconds] = useState<number>(100);
  const [buttonText, setButtonText] = useState<string>('Generate Tour');

  const handleFormSubmit = useCallback(() => {
    submit();
    setButtonText('Generating...');
    startTimer();

    axios
      .get(
        `/generate?word1=${word1.toLowerCase()}&word2=${word2.toLowerCase()}&word3=${word3.toLowerCase()}&word4=${word4.toLowerCase()}&word5=${word5.toLowerCase()}`
      )
      .then(({ data }) => {
        let sortedByDepartment: any = {};
        for (var i = 0; i < data.length; i++) {
          if (sortedByDepartment[data[i].department] === undefined) {
            sortedByDepartment[data[i].department] = [data[i]];
          } else {
            sortedByDepartment[data[i].department].push(data[i]);
          }
        }
        setResults(sortedByDepartment);
        changeView('results');
      })
      .catch((error) => console.log(error));
  }, [setResults, changeView]);

  const startTimer = useCallback(() => {
    if (timer == 0 && seconds > 0) {
      setTimer(window.setInterval(countDown, 100));
    }
  }, []);

  const countDown = useCallback(() => {
    setSeconds(seconds - 1);

    if (seconds == 0) {
      clearInterval(timer);
    }
  }, []);

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Enter word"
          name="word1"
          value={word1}
          onChange={(event) => setWord1(event.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Enter word"
          name="word2"
          value={word2}
          onChange={(event) => setWord2(event.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Enter word"
          name="word3"
          value={word3}
          onChange={(event) => setWord3(event.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Enter word"
          name="word4"
          value={word4}
          onChange={(event) => setWord4(event.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Enter word"
          name="word5"
          value={word5}
          onChange={(event) => setWord5(event.target.value)}
        ></input>
        <button type="submit" onClick={handleFormSubmit}>
          {buttonText}
        </button>
      </form>
      {submitted === true ? (
        <div id="progressbar">
          <div
            style={{
              width: ((100 - seconds) / 100) * 100 + '%',
            }}
          ></div>
        </div>
      ) : null}
    </div>
  );
};

export default Questions;
