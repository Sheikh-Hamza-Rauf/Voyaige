// Question.js
import React, { Component } from "react";
import Options from "./Option";
import "./Question.css";

class Question extends Component {
  state = {
    selectedOption: null, // Track selected option
  };

  handleOptionChange = (option) => {
    this.setState({ selectedOption: option });
    this.props.onOptionChange(option); // Pass the selected option to the parent

    // Check answer immediately when an option is selected
    this.props.checkAnswer(option);

    // Move to the next question after a short delay to give user feedback
    setTimeout(() => {
      this.props.onSubmit(); // Call onSubmit to go to the next question
    }, 500); // Delay of 500ms (or any preferred delay)
  };

  render() {
    const { question, timer } = this.props;
    const { selectedOption } = this.state;

    return (
      <div className="question-container">
        <div className="timer">
          <h2>{`00: ${timer}`}</h2>
        </div>
        <h3>Question {question.id}</h3>
        <img src={question.image} alt={`Image for ${question.question}`} />
        <h5>{question.question}</h5>
        <div className="options-container">
          <Options
            options={question.options}
            selectedOption={selectedOption}
            onOptionChange={this.handleOptionChange}
          />
        </div>
      </div>
    );
  }
}

export default Question;
