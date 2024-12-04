import React, { Component } from 'react';
import './Question.css';

class Options extends Component {
  render() {
    const { options, selectedOption, onOptionChange } = this.props;

    return (
      <div className="options-container">
        <div className="options">
          {options.map((option, index) => (
            <button
              key={index}
              type="button"
              className={`option-button ${selectedOption === option ? 'selected' : ''}`}
              onClick={() => onOptionChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default Options;
