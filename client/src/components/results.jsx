import React from "react";

import met from "../../dist/assets/met.jpg";
import rightArrow from "../../dist/assets/rightArrow.jpg";
import leftArrow from "../../dist/assets/leftArrow.jpg";

class Results extends React.Component {
  constructor() {
    super();
    this.state = {};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.changeView("start");
  }

  render() {
    return (
      <div>
        <img src={met}></img>
        {Object.keys(this.props.results).length === 0 ? (
          <div id="errorMessage">Not enough results! Try again.</div>
        ) : (
          Object.keys(this.props.results).map((key, index) => (
            <div>
              <img
                className={index % 2 === 0 ? "left-arrow" : "right-arrow"}
                src={index % 2 === 0 ? leftArrow : rightArrow}
              ></img>
              <div
                className={
                  index % 2 === 0
                    ? "right-department-name-container"
                    : "left-department-name-container"
                }
              >
                <div className="department-name">{key}</div>
              </div>
              {this.props.results[key].map((object) => (
                <div className="object-info">
                  <div className="object-name">{object.artistDisplayName}</div>
                  <div className="object-title">{object.title}</div>
                  <div className="object-medium">{object.medium}</div>
                  <div className="object-date">{object.objectDate}</div>
                  <img className="object-image" src={object.primaryImage} />
                </div>
              ))}
              {console.log(index)}
            </div>
          ))
        )}

        <button type="submit" onClick={this.handleClick}>
          Generate Another Tour
        </button>
      </div>
    );
  }
}

export default Results;
