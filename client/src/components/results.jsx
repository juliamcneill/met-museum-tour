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
        {this.props.results.map((object) => (
          <div>
            <div>{object.title}</div>
            <img src={object.primaryImage} />
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
