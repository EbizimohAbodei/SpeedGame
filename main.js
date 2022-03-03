const startButton = document.querySelector(".start");
const stopButton = document.querySelector(".stop");
const modalClose = document.querySelector(".close");
const modal = document.querySelector(".modal__overlay");
const circles = document.querySelectorAll(".button__click");
const score = document.querySelector("#score");
const result = document.querySelector("#result");
const remark = document.querySelector("#remark");
let timer;
let fin_score = 0;
let gameSpeed = 1500;
let active = 0;
let fail = 0;

const getRandomNumber = (max, min) => {
  return Math.floor(Math.random() * (max - min + 0)) + min;
};

const startGame = () => {
  circles.forEach((button) => (button.style.pointerEvents = "auto"));
  startButton.style.display = "none";
  stopButton.style.display = "inline";

  let nextActive = pickNew(active);

  circles[nextActive].classList.toggle("active");
  circles[active].classList.remove("active");

  active = nextActive;
  timer = setTimeout(startGame, gameSpeed);

  fin_score > 1 && fin_score % 2 === 0 ? (gameSpeed -= 150) : gameSpeed;

  //   fail === 2 ?? stopGame();

  function pickNew(active) {
    let nextActive = getRandomNumber(0, 4);
    if (nextActive != active) {
      return nextActive;
    } else {
      return pickNew(active);
    }
  }
};

circles.forEach((circle, i) => {
  circle.addEventListener("click", () => circleClick(i));
});
let final_score = 0;

const circleClick = (i) => {
  circles[active].classList.remove("active");

  if (i === active) {
    fin_score++;
    score.textContent = fin_score;
  } else {
    stopGame();
  }
};

// Stopping the game and displaying the modal with current score

startButton.addEventListener("click", startGame);

const stopGame = () => {
  if (fin_score >= 1 && fin_score < 10) {
    remark.textContent = "Raise the bar!";
  } else if (fin_score > 10 && fin_score < 25) {
    remark.textContent = "Good game!";
  } else if (fin_score > 25 && fin_score < 40) {
    remark.textContent = "Your are outstanding!";
  } else {
    remark.textContent = "You are badass!!";
  }
  clearTimeout(timer);
  modal.style.visibility = "visible";
  result.textContent = fin_score;
};
stopButton.addEventListener("click", stopGame);

// Clicking the modal "close" button to close the dialogue and reload page

const reloadGame = () => {
  window.location.reload();
};
modalClose.addEventListener("click", reloadGame);
