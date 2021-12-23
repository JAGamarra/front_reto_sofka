import Quiz from "./Quiz.js";
class Settings {
  constructor() {
    this.settingsElement = document.querySelector(".settings");
    this.quizElement = document.querySelector(".quiz");
    this.spinnerElement = document.querySelector(".spinner");

    this.playerName = document.querySelector("#playerName");
    this.startButton = document.getElementById("start");

    this.quiz = {};

    //When the user press the "start button" it calls the startGame method
    this.startButton.addEventListener("click", this.startGame.bind(this));
  }

  // startGame method
  async startGame() {
    try {
      //We get the player's name and save it in playerName variable
      const playerName = this.getPlayerName();
      // We set the spinner visible before fetch the questions
      this.spinnerElement.style.visibility = "visible";
      const data = await this.agroupQuestionsByCategory();
      this.spinnerElement.style.visibility = "hidden";
      this.toggleVisibility();
      //A new Quiz object is instantiated
      this.quiz = new Quiz(this.quizElement, data, playerName);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  getPlayerName() {
    const playerName = this.playerName.value;
    if (!playerName) {
      throw new Error("You must provide a name");
    }
    return playerName;
  }

  async fetchQuestions() {
    const url = "https://reto-sofka-back.herokuapp.com/api/question";
    const response = await fetch(url);
    const questions = await response.json();
    return questions;
  }

  async agroupQuestionsByCategory() {
    //Questions fetched
    const questions = await this.fetchQuestions();
    let allQuestions = [];
    //We filter the questions array by categories and save it in another array
    const newbieCat = questions.filter(
      (question) => question.category === "newbie"
    );
    const easyCat = questions.filter(
      (question) => question.category === "easy"
    );
    const mediumCat = questions.filter(
      (question) => question.category === "medium"
    );
    const hardCat = questions.filter(
      (question) => question.category === "hard"
    );
    const impossibleCat = questions.filter(
      (question) => question.category === "impossibleCat"
    );
    //We generate a random number each for loop
    for (let i = 0; i < 5; i++) {
      let randomNum = this.getRandomNumber();
      //With the ranNum we select a random postion from categories array
      if (i === 0) {
        allQuestions = [...allQuestions, newbieCat[randomNum]];
      } else if (i === 1) {
        allQuestions = [...allQuestions, easyCat[randomNum]];
      } else if (i === 2) {
        allQuestions = [...allQuestions, mediumCat[randomNum]];
      } else if (i === 3) {
        allQuestions = [...allQuestions, hardCat[randomNum]];
      } else if (i === 4) {
        allQuestions = [...allQuestions, impossibleCat[randomNum]];
      }
    }

    // We return the new array with the random questions
    return allQuestions;
  }

  // Toggle the visibility of settings and quiz
  toggleVisibility() {
    this.settingsElement.style.visibility = "hidden";
    this.quizElement.style.visibility = "visible";
  }

  // We get a random number between 0 and 4 which are the positions of the questions array
  getRandomNumber() {
    return Math.floor(Math.random() * (4 - 0 + 1)) + 0;
  }
}

export default Settings;
