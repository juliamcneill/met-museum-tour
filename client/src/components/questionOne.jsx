import React from "react";
import axios from "axios";

class QuestionOne extends React.Component {
  constructor() {
    super();
    this.state = {
      word: "",
      result: "",
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    axios
      .get(`/search/${this.state.word}`)
      .then(({ data }) => {
        axios
          .get(`/objects/${data.objectIDs[0]}`)
          .then(({ data }) => {
            this.setState({
              result: data,
            });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log("User has entered the wrong information."));
  }

  render() {
    return (
      <form>
        <p>Enter a word:</p>
        <input
          type="text"
          placeholder="Word"
          name="word"
          value={this.state.word}
          onChange={(event) => this.handleFormChange(event)}
        ></input>
        <button type="submit" onClick={this.handleFormSubmit}>
          Generate Tour
        </button>
        <p>{this.state.result.title}</p>
      </form>
    );
  }
}

export default QuestionOne;
