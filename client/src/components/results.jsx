import React from "react";

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
        {Object.keys(this.props.results).map((key) => (
          <div>
            <div className="department-name">{key}</div>
            {this.props.results[key].map((object) => (
              <div>
                <div>{object.title}</div>
                <img src={object.primaryImage} />
              </div>
            ))}
          </div>
        ))}

        <button type="submit" onClick={this.handleClick}>
          Generate Another Tour
        </button>
      </div>
    );
  }
}

export default Results;
