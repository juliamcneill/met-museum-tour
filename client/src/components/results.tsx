import React, { useCallback } from 'react';
import met from '../../dist/assets/met.jpg';
import rightArrow from '../../dist/assets/rightArrow.jpg';
import leftArrow from '../../dist/assets/leftArrow.jpg';
import { Button } from '@material-ui/core';

interface Props {
    results: any;
    changeView: Function;
}
interface Object {
    artistDisplayName?: string;
    title?: string;
    medium?: string;
    objectDate?: string;
    primaryImage?: string;
}

const Results: React.FC<Props> = ({ results, changeView }) => {
    const changeViewToStart = useCallback(() => {
        changeView('start');
    }, [changeView]);

    return (
        <div>
            <img src={met} alt="Line drawing of the Metropolitan Museum of Art"></img>
            {Object.keys(results).length === 0 ? (
                <div id="errorMessage">Not enough results! Try again.</div>
            ) : (
                Object.keys(results).map((key, index) => (
                    <div key={key}>
                        <img
                            className={index % 2 === 0 ? 'left-arrow' : 'right-arrow'}
                            src={index % 2 === 0 ? leftArrow : rightArrow}
                            alt="Decorative arrow"
                        ></img>
                        <div
                            className={
                                index % 2 === 0 ? 'right-department-name-container' : 'left-department-name-container'
                            }
                        >
                            <div className="department-name">{key}</div>
                        </div>
                        {results[key].map((object: Object) => (
                            <div className="object-info" key={key + object.title}>
                                <div className="object-name">{object.artistDisplayName}</div>
                                <div className="object-title">{object.title}</div>
                                <div className="object-medium">{object.medium}</div>
                                <div className="object-date">{object.objectDate}</div>
                                <img className="object-image" src={object.primaryImage} alt="Reproduction of artwork" />
                            </div>
                        ))}
                    </div>
                ))
            )}

            <Button variant="outlined" onClick={changeViewToStart}>
                Generate Another Tour
            </Button>
        </div>
    );
};

export default Results;
