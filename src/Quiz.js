import React, { useState, useEffect } from "react";
import Question from "./Question";

const questions = [
  {
    question: "Apa ibukota Indonesia?",
    options: ["Jakarta", "Surabaya", "Bandung", "Medan"],
    correctAnswer: "Jakarta",
  },
  {
    question: "Siapakah presiden pertama Indonesia?",
    options: ["Soekarno", "Soeharto", "Megawati", "Jokowi"],
    correctAnswer: "Soekarno",
  },
  {
    question: "Berapakah hasil dari 10 + 5?",
    options: ["12", "15", "18", "20"],
    correctAnswer: "15",
  },
  {
    question: "Apa warna langit?",
    options: ["Merah", "Biru", "Hijau", "Kuning"],
    correctAnswer: "Biru",
  },
  {
    question: "Siapakah penemu gravitasi?",
    options: [
      "Isaac Newton",
      "Albert Einstein",
      "Galileo Galilei",
      "Nikola Tesla",
    ],
    correctAnswer: "Isaac Newton",
  },
].sort(() => Math.random() - 0.5);

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(20);

  useEffect(() => {
    // Mengacak urutan opsi jawaban setiap kali currentQuestion berubah
    questions[currentQuestion].options.sort(() => Math.random() - 0.5);
  }, [currentQuestion]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        setTime((prevTime) => prevTime - 1);
      } else {
        handleNextQuestion();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  const handleOptionClick = (option) => {
    if (selectedOption === null) {
      setSelectedOption(option);

      if (option === questions[currentQuestion].correctAnswer) {
        setScore((prevScore) => prevScore + 20);
      } else {
        setScore((prevScore) => prevScore - 20);
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setTime(20);

    if (selectedOption === null) {
      setScore((prevScore) => prevScore - 20); // Mengurangi 20 poin jika pengguna tidak menjawab
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    } else {
      if (selectedOption !== null) {
        setQuizCompleted(true);
      }
    }
  };

  const isCorrectOption = (option) => {
    return option === questions[currentQuestion].correctAnswer;
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setQuizCompleted(false);
    setSelectedOption(null);
    setScore(0);
    setTime(20);
    questions.forEach((question) => {
      question.options.sort(() => Math.random() - 0.5);
    });
  };
  return (
    <div>
      {quizCompleted ? (
        <div>
          <h1>Quiz Selesai! Skor Anda: {score}</h1>
          <button onClick={handleRestartQuiz}>Main Lagi</button>
        </div>
      ) : (
        <div className="container">
          <h1>Quiz Game</h1>
          <p>Waktu Tersisa: {time} detik</p>
          <h2>Skor: {score}</h2>
          <div>
            <Question
              question={questions[currentQuestion]}
              selectedOption={selectedOption}
              handleOptionClick={handleOptionClick}
              isCorrectOption={isCorrectOption}
            />
          </div>
          <button
            onClick={handleNextQuestion}
            disabled={selectedOption === null}
          >
            Lanjutkan
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
