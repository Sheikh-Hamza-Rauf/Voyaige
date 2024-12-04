import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Question from "./Question";
import qBank from "./QuestionBank";
import Score from "./Score";
import "./quiz.css";
import Navbar from "../NavBar/Navbar"; // Import Navbar

const Quiz = () => {
  const [questionBank] = useState(qBank);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [quizEnd, setQuizEnd] = useState(false);
  const [timer, setTimer] = useState(60);
  const [messageVisible, setMessageVisible] = useState(false);
  const [pointsSent, setPointsSent] = useState(false); // Track if points are sent

  const navigate = useNavigate();

  // Scroll to the top when the component loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) return prevTimer - 1;

        clearInterval(intervalId);
        setQuizEnd(true); // End the quiz when the timer runs out
        return 0;
      });
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  useEffect(() => {
    if (quizEnd && !pointsSent) {
      setMessageVisible(true);

      // Send points to the database
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.email) {
        updatePoints(user.email, score); // Call the function to update points
      }

      setPointsSent(true); // Ensure points are sent only once

      setTimeout(() => {
        navigate('/', { state: { redirectedFromChallengeId: 2 } }); // Pass challengeId in state
    }, 2000); // Redirect to homepage after 2 seconds
    }
  }, [quizEnd, pointsSent, navigate, score]);

  const updatePoints = async (email, points) => {
    try {
        console.log('Sending POST request to update points:', { email, points });
        const response = await axios.post("http://localhost:5000/api/users/updatePoints", {
            email,
            points,
            challengeId:2
        });
    
        console.log("Points updated successfully:", response.data);
    } catch (error) {
        console.error("Error updating points:", error.response?.data || error.message);
    }
};
  

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const checkAnswer = (selectedOption) => {
    if (selectedOption === questionBank[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 500); // Add points for correct answer
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questionBank.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setSelectedOption(""); // Clear the selected option
    } else {
      setQuizEnd(true); // End the quiz when there are no more questions
    }
  };

  const winMessage = score > 0 ? (
    <div className="win-message">
      🎉 You have won {score} points! 🎉
    </div>
  ) : (
    <div className="lose-message">
      Better luck next time! Your score is {score} points.
    </div>
  );

  return (
    <div className="App">
      <Navbar />
      {!quizEnd ? (
        <Question
          question={questionBank[currentQuestion]}
          selectedOption={selectedOption}
          onOptionChange={handleOptionChange}
          checkAnswer={checkAnswer}
          onSubmit={handleNextQuestion}
          timer={timer}
        />
      ) : (
        <div className="score-container">
          <Score score={score} onNextQuestion={handleNextQuestion} className="score" />
          {messageVisible && winMessage} {/* Display the win/lose message */}
        </div>
      )}
    </div>
  );
};

export default Quiz;
