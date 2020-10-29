import React from "react";
import ReactDOM from "react-dom";
import "./style.scss";

import met from "../dist/assets/met.jpg";

import Questions from "./components/questions.tsx";
import Results from "./components/results.tsx";

interface MyState {
  view: string;
  results: object;
  startTransition: string;
  questionsTransition: string;
  resultsTransition: string;
}

class App extends React.Component<{}, MyState> {
  constructor(props: {}) {
    super(props);
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

  changeView(option: string) {
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

  updateResults(data: object) {
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
