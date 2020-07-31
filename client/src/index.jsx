import React from "react";
import ReactDOM from "react-dom";
import "./style.scss";

import Questions from "./components/questions.jsx";
import Results from "./components/results.jsx";

class App extends React.Component {
  constructor() {
    super();
    this.state = { view: "start", results: [] };

    this.changeView = this.changeView.bind(this);
    this.updateResults = this.updateResults.bind(this);
  }

  changeView(option) {
    this.setState({
      view: option,
    });
  }

  updateResults(data) {
    this.setState({
      results: data,
    });
  }

  renderView() {
    if (this.state.view === "start") {
      return (
        <button onClick={() => this.changeView("questions")}>
          Create New Tour
        </button>
      );
    } else if (this.state.view === "questions") {
      return (
        <Questions
          updateResults={this.updateResults}
          changeView={this.changeView}
        />
      );
    } else if (this.state.view === "results") {
      return (
        <Results results={this.state.results} changeView={this.changeView} />
      );
    }
  }

  render() {
    return <div>{this.renderView()}</div>;
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
