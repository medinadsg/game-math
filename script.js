function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion() {
  const num1 = getRandomNumber(1, 10);
  let num2;
  let operation;

  do {
    num2 = getRandomNumber(1, 10);
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

function displayQuestion() {
  const questionData = generateQuestion();
  document.getElementById("question").innerHTML = questionData.question;
  document.getElementById("check-answer").disabled = false;
  document.getElementById("next-question").disabled = true;
  document.getElementById("answer").value = '';
  document.getElementById("result").innerHTML = '';
  return questionData;
}

function checkAnswer(questionData) {
  const answer = parseInt(document.getElementById("answer").value);

  if (answer === questionData.correctAnswer) {
    document.getElementById("result").innerHTML = "Correct!";
  } else {
    document.getElementById("result").innerHTML = `Incorrect! The correct answer is: ${questionData.correctAnswer}`;
  }

  document.getElementById("check-answer").disabled = true;
  document.getElementById("next-question").disabled = false;
}

document.addEventListener("DOMContentLoaded", () => {
  let questionData = displayQuestion();

  document.getElementById("check-answer").addEventListener("click", () => {
    checkAnswer(questionData);
  });

  document.getElementById("next-question").addEventListener("click", () => {
    questionData = displayQuestion();
  });
});
