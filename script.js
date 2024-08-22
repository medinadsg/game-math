let points = 0;
let questionData;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion() {
  const num1 = getRandomNumber(10, 50);
  let num2;
  let operation;

  do {
    num2 = getRandomNumber(10, 50);
    operation = getRandomNumber(1, 4);
  } while (operation === 4 && (num1 % num2 !== 0 || num2 === 0));

  let question;
  let correctAnswer;

  switch (operation) {
    case 1:
      question = `What is ${num1} + ${num2}?`;
      correctAnswer = num1 + num2;
      break;
    case 2:
      question = `What is ${num1} - ${num2}?`;
      correctAnswer = num1 - num2;
      break;
    case 3:
      question = `What is ${num1} * ${num2}?`;
      correctAnswer = num1 * num2;
      break;
    case 4:
      question = `What is ${num1} / ${num2}? (Quotient only)`;
      correctAnswer = Math.floor(num1 / num2);
      break;
    default:
      question = "Error!";
      correctAnswer = 0;
  }

  return { question, correctAnswer };
}

function startTimer(duration, display, callback) {
  let timer = duration, minutes, seconds;
  const interval = setInterval(() => {
    minutes = Math.floor(timer / 60);
    seconds = timer % 60;

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    display.textContent = `${minutes}:${seconds}`;

    if (--timer < 0) {
      clearInterval(interval);
      callback();
    }
  }, 1000);
}

function displayQuestion() {
  const questionData = generateQuestion();
  document.querySelector(".question").textContent = questionData.question;
  document.querySelector(".check-answer").disabled = false;
  document.querySelector(".next-question").disabled = true;
  document.querySelector(".answer").value = '';
  document.querySelector(".result").textContent = '';
  document.querySelector(".progress-bar-fill").style.width = '0%';
  startTimer(30, document.querySelector(".timer"), () => {
    checkAnswer(questionData);
  });
  return questionData;
}

function checkAnswer(questionData) {
  const answer = parseInt(document.querySelector(".answer").value);

  if (answer === questionData.correctAnswer) {
    document.querySelector(".result").textContent = "Correct!";
    document.querySelector(".result").style.color = "#4CAF50";
    document.querySelector(".progress-bar-fill").style.width = '100%';
    points++;
    document.querySelector(".points").textContent = `Points: ${points}`;
  } else {
    document.querySelector(".result").textContent = `Incorrect! The correct answer is: ${questionData.correctAnswer}`;
    document.querySelector(".result").style.color = "#F44336";
  }

  document.querySelector(".check-answer").disabled = true;
  document.querySelector(".next-question").disabled = false;
}

function gameOver() {
  document.querySelector(".game-container").style.display = "none";
  document.querySelector(".result-page").style.display = "block";
  document.querySelector(".final-score").textContent = points;
}

document.addEventListener("DOMContentLoaded", () => {
  let questionData = displayQuestion();

  document.querySelector(".check-answer").addEventListener("click", () => {
    checkAnswer(questionData);
  });

  document.querySelector(".next-question").addEventListener("click", () => {
    questionData = displayQuestion();
  });

  document.querySelector(".play-again").addEventListener("click", () => {
    points = 0;
    document.querySelector(".points").textContent = `Points: 0`;
    document.querySelector(".game-container").style.display = "block";
    document.querySelector(".result-page").style.display = "none";
    questionData = displayQuestion();
  });
});