document.addEventListener("DOMContentLoaded", () => {
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

  /*----- Cached Element References -----*/
  const instructionsContainer = document.getElementById(
    "instructions-container"
  );
  const categorySelection = document.getElementById("category-selection");
  const quizContainer = document.getElementById("quiz");
  const resultContainer = document.getElementById("result");
  const questionElement = document.getElementById("question");
  const optionsContainer = document.getElementById("options");
  const nextButton = document.getElementById("next-btn");
  const audio = document.getElementById("quiz-audio");

  /*-------------- Functions -------------*/
  function startQuiz(category) {
    currentCategory = category;
    currentQuestionIndex = 0;
    score = 0;

    instructionsContainer.style.display = "none";
    categorySelection.style.display = "none";
    quizContainer.classList.remove("hidden");
    resultContainer.classList.add("hidden");

    showQuestion();
  }

  function showQuestion() {
    const quizData = questions[currentCategory][currentQuestionIndex];
    questionElement.textContent = quizData.question;

    optionsContainer.innerHTML = "";

    quizData.options.forEach((option) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.onclick = () => checkAnswer(option);
      optionsContainer.appendChild(button);
    });

    nextButton.classList.add("hidden");
  }

  function checkAnswer(selectedAnswer) {
    const quizData = questions[currentCategory][currentQuestionIndex];
    if (selectedAnswer === quizData.answer) {
      score++;
    }

    setTimeout(() => {
      nextQuestion();
    }, 1000); // Adds a 1-second delay
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
    quizContainer.classList.add("hidden");

    let resultMessage = "";

    if (score === questions[currentCategory].length) {
        resultMessage = "<h2 class='win-message'>You Win! Perfect Score!</h2>";
        document.getElementById("congrats-audio").play(); // Play congrats audio
    } else {
        resultMessage = `<h2 class='lose-message'>You Lost! Try Again.</h2>`;
        document.getElementById("tryagain-audio").play(); // Play try again audio
    }

    resultContainer.classList.remove("hidden");
    resultContainer.innerHTML = `${resultMessage} 
                                    <p>Your Score: ${score}/${questions[currentCategory].length}</p>
                                    <button id="restart-btn">Play Again</button>`;

    document
        .getElementById("restart-btn")
        .addEventListener("click", restartQuiz);
}

  // function showResult() {
  //   quizContainer.classList.add("hidden");

  //   let resultMessage = "";

  //   if (score === questions[currentCategory].length) {
  //     resultMessage = "<h2 class='win-message'>You Win! Perfect Score!</h2>";
  //     audio.play();
  //   } else {
  //     resultMessage = `<h2 class='lose-message'>You Lost! Try Again.</h2>`;
  //   }

  //   resultContainer.classList.remove("hidden");
  //   resultContainer.innerHTML = `${resultMessage} 
  //                                   <p>Your Score: ${score}/${questions[currentCategory].length}</p>
  //                                   <button id="restart-btn">Play Again</button>`;

  //   document
  //     .getElementById("restart-btn")
  //     .addEventListener("click", restartQuiz);
  // }

  function restartQuiz() {
    resultContainer.classList.add("hidden");
    categorySelection.style.display = "block";
    instructionsContainer.style.display = "block";
  }

  window.startQuiz = startQuiz;
  window.nextQuestion = nextQuestion;
});
