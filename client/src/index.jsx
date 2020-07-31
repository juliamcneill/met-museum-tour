import React from "react";
import ReactDOM from "react-dom";
import "./style.scss";

import Questions from "./components/questions.jsx";

class App extends React.Component {
  constructor() {
    super();
    this.state = { view: "start" };

    this.changeView = this.changeView.bind(this);
  }

  changeView(option) {
    this.setState({
      view: option,
    });
  }

  renderView() {
    if (this.state.view === "start") {
      return <button onClick={() => this.changeView("form")}>Start</button>;
    } else if (this.state.view === "form") {
      return <Questions />;
    } else if (this.state.view === "results") {
      return <Results />;
    }
  }

  render() {
    return <div>{this.renderView()}</div>;
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
