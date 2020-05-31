const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "Czy jest Pan dobrym wykładowcą?",
    choice1: "Oczywiście!",
    choice2: "No nie wiem",
    choice3: "Trochę",
    choice4: "Nie, zawsze chciałem być piekarzem",
    answer: 1
  },
  {
    question:
      "Czy ten student zasługuje na 5?",
    choice1: "NIE",
    choice2: "Zdecydowanie",
    choice3: "Wole dać 4",
    choice4: "3, byle zaliczyć",
    answer: 2
  },
  {
    question: "To czy wstawi Pan ocenę studentowi o nr: 40570 (Piotr Kubiciel) ocene jeszcze dzisiaj?",
    choice1: "Tak",
    choice2: "Nie",
    choice3: "Wolę upiec bułeczki",
    choice4: "Po moim trupie",
    answer: 1
  }
];

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //powrót na główną stronę
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerText = `Pytania ${questionCounter}/${MAX_QUESTIONS}`;
  //aktualizacja paska postępu
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
