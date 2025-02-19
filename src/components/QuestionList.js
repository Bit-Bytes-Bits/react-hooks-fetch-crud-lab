import React from "react";
import QuestionItem from "./QuestionItem";
import {useState, useEffect} from "react";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then((response)=> response.json())
    .then((questions) =>{
      console.log(questions)
      setQuestions(questions)
    })
  }, [])

  function handleSelect(id, correctIndex){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
    .then((r) => r.json())
      .then((newQuestion) => {
        const updatedAnswers = questions.map((question) => {
          if (question.id === newQuestion.id) return newQuestion;
          return question;
        });
        setQuestions(updatedAnswers);
      });
  }

  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        const newQuestions = questions.filter((question) => question.id !== id);
        setQuestions(newQuestions);
      });
  }


  const questionList = questions.map((question) => (
    <QuestionItem
    key={question.id}
    question={question}
    onDeleteClick={handleDeleteClick}
    onHandleSelect={handleSelect}
     />
  ))
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
      {questionList}
      </ul>
    </section>
  );
}

export default QuestionList;
