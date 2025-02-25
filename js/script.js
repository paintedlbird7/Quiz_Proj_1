/*-------------- Constants -------------*/
const questions = {
  frida: [
    {
      question:
        "Frida Kahlo exhibited her paintings in Mexico and Paris before her death in 1954?",
      options: ["True", "False"],
      answer: "True",
    },
    {
      question: "Frida Kahlo was married to whom?",
      options: ["Diego Rivera", "Leon Trotsky", "Tina Modotti"],
      answer: "Diego Rivera",
    },
    {
      question:
        "Frida Kahlo painted a painting with this animal on her shoulder?",
      options: ["bird", "monkey", "gorilla"],
      answer: "monkey",
    },
  ],
  general: [
    {
      question: "Is Paris the capital of France?",
      options: ["True", "False"],
      answer: "True",
    },
    {
      question: "Is the sun a star?",
      options: ["True", "False"],
      answer: "True",
    },
  ],
};

/*---------- Variables (state) ---------*/
let currentCategory = "";
let currentQuestionIndex = 0;
let score = 0;

/*-------------- Functions -------------*/
function startQuiz(category) {
  currentCategory = category;
  currentQuestionIndex = 0;
  score = 0;

  document.getElementById("category-selection").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");

  showQuestion();
}

function showQuestion() {
  const quizData = questions[currentCategory][currentQuestionIndex];
  document.getElementById("question").textContent = quizData.question;

  /*----- Cached Element References  -----*/
  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  quizData.options.forEach((option) => {
    /*----- Cached Element References  -----*/
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => checkAnswer(option);
    optionsContainer.appendChild(button);
  });

  document.getElementById("next-btn").classList.add("hidden");
}

function checkAnswer(selectedAnswer) {
  const quizData = questions[currentCategory][currentQuestionIndex];
  if (selectedAnswer === quizData.answer) {
    score++;
  }

  document.getElementById("next-btn").classList.remove("hidden");
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions[currentCategory].length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz").classList.add("hidden");

  const resultContainer = document.getElementById("result");
  resultContainer.classList.remove("hidden");
  resultContainer.innerHTML = `<h2>Your Score: ${score}/${questions[currentCategory].length}</h2> 
                                 <button onclick="restartQuiz()">Play Again</button>`;
}

function restartQuiz() {
  document.getElementById("result").classList.add("hidden");
  document.getElementById("category-selection").classList.remove("hidden");
}
