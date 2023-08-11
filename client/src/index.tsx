import React, { StrictMode, useCallback, useMemo, useState } from 'react';
import './style.scss';
import met from '../dist/assets/met.jpg';
import Questions from './components/questions';
import Results from './components/results';
import { Button } from '@mui/material';
import { createRoot } from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';

const App: React.FC = ({}) => {
    const [view, setView] = useState<string>('start');
    const [results, setResults] = useState<object>({});
    const [startTransition, setStartTransition] = useState<string>('100%');
    const [questionsTransition, setQuestionsTransition] = useState<string>('0%');
    const [resultsTransition, setResultsTransition] = useState<string>('0%');

    const changeView = useCallback((option: string) => {
        setTimeout(() => {
            setView(option);
        }, 250);

        if (option === 'start') {
            setStartTransition('100%');
            setQuestionsTransition('0%');
            setResultsTransition('0%');
            setResults({});
        } else if (option === 'questions') {
            setStartTransition('0%');
            setQuestionsTransition('100%');
            setResultsTransition('0%');
        } else if (option === 'results') {
            setStartTransition('0%');
            setQuestionsTransition('0%');
            setResultsTransition('100%');
        }
    }, []);

    const changeViewToQuestions = useCallback(() => {
        changeView('questions');
    }, [changeView]);

    const renderView = useMemo(() => {
        switch (view) {
            case 'start':
                return (
                    <div
                        style={{
                            opacity: startTransition,
                            transition: 'opacity .25s',
                        }}
                    >
                        <img src={met} alt="Line drawing of the Metropolitan Museum of Art"></img>
                        <Button variant="outlined" onClick={changeViewToQuestions}>
                            Create New Tour
                        </Button>
                    </div>
                );
            case 'questions':
                return (
                    <div
                        style={{
                            opacity: questionsTransition,
                            transition: 'opacity .5s',
                        }}
                    >
                        <Questions setResults={setResults} changeView={changeView} />
                    </div>
                );
            case 'results':
                return (
                    <div
                        style={{
                            opacity: resultsTransition,
                            transition: 'opacity .5s',
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
            <div>{renderView}</div>
        </StyledEngineProvider>
    );
};

const rootElement = document.getElementById('app');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <App />
    </StrictMode>,
);
