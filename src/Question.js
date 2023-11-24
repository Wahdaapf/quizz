import React from "react";

const Question = ({
  question,
  selectedOption,
  handleOptionClick,
  isCorrectOption,
}) => {
  return (
    <div>
      <p>{question.question}</p>
      {question.options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleOptionClick(option)}
          style={{
            backgroundColor:
              selectedOption === option
                ? isCorrectOption(option)
                  ? "green"
                  : "red"
                : selectedOption !== null && isCorrectOption(option)
                ? "green"
                : "#d9d9d9 ",
          }}
          disabled={selectedOption !== null}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Question;
