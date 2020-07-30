import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./style.scss";

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return <h1>MET Museum Tour</h1>;
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
