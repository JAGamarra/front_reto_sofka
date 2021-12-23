class Final {
  constructor(status, score, playerName, message) {
    this.scoreElement = document.querySelector(".score");
    this.againButton = document.querySelector("#again");
    this.finalMessage = document.querySelector("#final-message");

    if (status === "win") {
      this.render(score, message);
      this.sendUserAndScoreToDB(score, playerName);
    } else if (status === "lose") {
      this.lostGameMessage();
    }
    this.againButton.addEventListener("click", location.reload.bind(location));
  }

  render(score, message) {
    this.finalMessage.innerHTML = `${message}`;
    this.scoreElement.innerHTML = `Your final score is ${score} out of 25 total points!`;
  }

  lostGameMessage() {
    this.finalMessage.innerHTML = "You've lost the game!";
    this.scoreElement.innerHTML = "Your score won't be submit";
  }

  async sendUserAndScoreToDB(score, username) {
    const data = { username, score };
    const url = "https://reto-sofka-back.herokuapp.com/api/user";
    fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
  }
}

export default Final;
