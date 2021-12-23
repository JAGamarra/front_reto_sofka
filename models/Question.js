class Question {
  constructor(question) {
    this.correctAnswer = question.correctAnswer;
    this.category = question.category;
    this.answers = question.answers;
    this.question = question.question;
    this.isCorrect = false;

    this.questionElement = document.querySelector("#question");
    this.answerElements = [
      document.querySelector("#a1"),
      document.querySelector("#a2"),
      document.querySelector("#a3"),
      document.querySelector("#a4"),
    ];
  }

  answer(checkedElement) {
    this.isCorrect =
      checkedElement[0].textContent === this.correctAnswer ? true : false;
  }

  render() {
    this.questionElement.innerText = this.question;
    this.answerElements.forEach((el, index) => {
      el.innerHTML =
        '<input type="radio" name="radio"><span class="checkmark"></span>' +
        this.answers[index];
    });
  }
}

export default Question;
