import React from "react";
import axios from "axios";

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      word1: "",
      word2: "",
      word3: "",
      word4: "",
      word5: "",
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
      .get(
        `/generate?word1=${this.state.word1.toLowerCase()}&word2=${this.state.word2.toLowerCase()}&word3=${this.state.word3.toLowerCase()}&word4=${this.state.word4.toLowerCase()}&word5=${this.state.word5.toLowerCase()}`
      )
      .then(({ data }) => {
        console.log("finished!");
        this.props.updateResults(data);
        this.props.changeView("results");
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Enter word"
          name="word1"
          value={this.state.word1}
          onChange={(event) => this.handleFormChange(event)}
        ></input>
        <input
          type="text"
          placeholder="Enter word"
          name="word2"
          value={this.state.word2}
          onChange={(event) => this.handleFormChange(event)}
        ></input>
        <input
          type="text"
          placeholder="Enter word"
          name="word3"
          value={this.state.word3}
          onChange={(event) => this.handleFormChange(event)}
        ></input>
        <input
          type="text"
          placeholder="Enter word"
          name="word4"
          value={this.state.word4}
          onChange={(event) => this.handleFormChange(event)}
        ></input>
        <input
          type="text"
          placeholder="Enter word"
          name="word5"
          value={this.state.word5}
          onChange={(event) => this.handleFormChange(event)}
        ></input>
        <button type="submit" onClick={this.handleFormSubmit}>
          Generate Tour
        </button>
      </form>
    );
  }
}

export default Questions;
