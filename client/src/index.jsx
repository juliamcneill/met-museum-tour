import React from "react";
import ReactDOM from "react-dom";
import "./style.scss";

import QuestionOne from "./components/questionOne.jsx";

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
      return <button onClick={() => this.changeView("quiz")}>Start</button>;
    } else {
      return <QuestionOne />;
    }
  }

  render() {
    return <div>{this.renderView()}</div>;
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
