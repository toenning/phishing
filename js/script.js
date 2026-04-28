const quizContent = document.getElementById("quiz-content");

// Alle “scener”
const scenes = {
  start: {
    text: "Du modtager en mail fra studieadministrationen om din SU.",
    choices: [
      { text: "Åbn mailen", next: "openMail" },
      { text: "Ignorer mailen", next: "ignore" }
    ]
  },

  ignore: {
    text: "Du ignorerede mailen. Det var phishing. Godt valg!",
    end: true
  },

  openMail: {
    text: "Mailen beder dig klikke på et link.",
    choices: [
      { text: "Klik på linket", next: "hacked" },
      { text: "Undersøg afsenderen", next: "checkSender" }
    ]
  },

  hacked: {
    text: "Du klikkede og indtastede dine oplysninger. Du blev hacket!",
    end: true
  },

  checkSender: {
    text: "Mailadressen ser mistænkelig ud.",
    choices: [
      { text: "Slet mailen", next: "safe" },
      { text: "Klik alligevel", next: "hacked" }
    ]
  },

  safe: {
    text: "Godt tænkt! Du undgik phishing.",
    end: true
  }
};

// Funktion der viser en scene
function showScene(scene) {
  const current = scenes[scene];

  quizContent.innerHTML = `<p>${current.text}</p>`;

  if (current.end) {
    quizContent.innerHTML += `<button onclick="startGame()">Start igen</button>`;
    return;
  }

  current.choices.forEach(choice => {
    const button = document.createElement("button");
    button.textContent = choice.text;

    button.addEventListener("click", () => {
      showScene(choice.next);
    });

    quizContent.appendChild(button);
  });
}

// Start spillet
function startGame() {
  showScene("start");
}

// Start automatisk når siden loader
startGame();