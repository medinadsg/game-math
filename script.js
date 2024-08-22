function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion() {
  const num1 = getRandomNumber(1, 10);
  const num2 = getRandomNumber(1, 10);
  const operation = getRandomNumber(1, 4);

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
      question = `What is ${num1} / ${num2}?`;
      correctAnswer = num1 / num2;
      break;
    default:
      question = "Error!";
      correctAnswer = 0;
  }

  return { question, correctAnswer };
}