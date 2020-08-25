import React from "react";
import ReactDOM from "react-dom";
import "./style.scss";

import met from "../dist/assets/met.jpg";

import Questions from "./components/questions.jsx";
import Results from "./components/results.jsx";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      view: "start",
      results: {},
      startTransition: "100%",
      questionsTransition: "0%",
      resultsTransition: "0%",
    };

    this.changeView = this.changeView.bind(this);
    this.updateResults = this.updateResults.bind(this);
  }

  changeView(option) {
    setTimeout(() => {
      this.setState({
        view: option,
      });
    }, 250);

    if (option === "start") {
      this.setState({
        startTransition: "100%",
        questionsTransition: "0%",
        resultsTransition: "0%",
        results: {},
      });
    } else if (option === "questions") {
      this.setState({
        startTransition: "0%",
        questionsTransition: "100%",
        resultsTransition: "0%",
      });
    } else if (option === "results") {
      this.setState({
        startTransition: "0%",
        questionsTransition: "0%",
        resultsTransition: "100%",
      });
    }
  }

  updateResults(data) {
    this.setState({
      results: data,
    });
  }

  renderView() {
    if (this.state.view === "start") {
      return (
        <div
          style={{
            opacity: this.state.startTransition,
            "-webkit-transition": "opacity .25s",
            "-moz-transition": "opacity .25s",
            "-o-transition": "opacity .25s",
            transition: "opacity .25s",
          }}
        >
          <img
            src={met}
            alt="Line drawing of the Metropolitan Museum of Art"
          ></img>
          <button onClick={() => this.changeView("questions")}>
            Create New Tour
          </button>
        </div>
      );
    } else if (this.state.view === "questions") {
      return (
        <div
          style={{
            opacity: this.state.questionsTransition,
            "-webkit-transition": "opacity .5s",
            "-moz-transition": "opacity .5s",
            "-o-transition": "opacity .5s",
            transition: "opacity .5s",
          }}
        >
          <Questions
            updateResults={this.updateResults}
            changeView={this.changeView}
          />
        </div>
      );
    } else if (this.state.view === "results") {
      return (
        <div
          style={{
            opacity: this.state.resultsTransition,
            "-webkit-transition": "opacity .5s",
            "-moz-transition": "opacity .5s",
            "-o-transition": "opacity .5s",
            transition: "opacity .5s",
          }}
        >
          <Results results={this.state.results} changeView={this.changeView} />
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderView()}</div>;
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
