import Question from "./Question.js";
import Final from "./Final.js";

class Quiz {
  constructor(quizElement, questions, playerName) {
    this.quizElement = quizElement;
    this.playerName = playerName;
    this.playerElement = document.querySelector("#player");
    this.currentElement = document.querySelector(".current");
    this.totalElement = document.querySelector(".total");
    this.nextButton = document.querySelector("#next");
    this.retreatButton = document.querySelector("#retreat");
    this.finalElement = document.querySelector(".final");

    this.totalRounds = 5;
    this.answeredAmount = 0;
    this.setPlayerName(playerName);
    this.questions = this.setQuestion(questions);
    this.nextButton.addEventListener("click", this.nextQuestion.bind(this));
    this.retreatButton.addEventListener("click", () => {
      this.endQuiz("You've withdrawn from the game...");
    });
    this.renderQuestion();
  }

  setQuestion(questions) {
    return questions.map((question) => new Question(question));
  }

  renderQuestion() {
    this.questions[this.answeredAmount].render();
    this.currentElement.innerHTML = this.answeredAmount;
    this.totalElement.innerHTML = this.totalRounds;
  }

  nextQuestion() {
    const checkedAnswer = this.questions[
      this.answeredAmount
    ].answerElements.filter((el) => el.firstChild.checked);

    if (checkedAnswer.length === 0) {
      alert("Please select an answer");
    } else {
      this.questions[this.answeredAmount].answer(checkedAnswer);
      this.showResults();
      this.answeredAmount++;
      this.answeredAmount < this.totalRounds
        ? this.renderQuestion()
        : this.endQuiz("You've answered all the questions!");
    }
  }

  setPlayerName(playerName) {
    this.playerElement.textContent = playerName;
  }

  showResults() {
    this.questions[this.answeredAmount].isCorrect
      ? alert("Correct answer!")
      : this.failQuiz();
  }

  endQuiz(message) {
    this.quizElement.style.visibility = "hidden";
    this.finalElement.style.visibility = "visible";
    const finalScore = this.calculateScore();
    this.final = new Final("win", finalScore, this.playerName, message);
  }

  failQuiz() {
    this.quizElement.style.visibility = "hidden";
    this.finalElement.style.visibility = "visible";
    this.final = new Final("lose", null, null, "You've lost the game!");
  }

  calculateScore() {
    let count = 0;
    this.questions.forEach((question) => {
      if (question.isCorrect) {
        if (question.category === "newbie") {
          count += 1;
        } else if (question.category === "easy") {
          count += 3;
        } else if (question.category === "medium") {
          count += 5;
        } else if (question.category === "hard") {
          count += 7;
        } else if (question.category === "impossibleCat") {
          count += 9;
        }
      }
    });
    return count;
  }
}

export default Quiz;
