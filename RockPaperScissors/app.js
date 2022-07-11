const actionsMoves = ["rock", "paper", "scissors"];
const actionsElements = document.querySelectorAll(".choice");
const resultMessage = document.querySelector("#result-message");
const userScore = document.querySelector("#user-score");
const compScore = document.querySelector("#computer-score");

let userPoints = 0;
let compPoints = 0;

const actions = ({ uAction, cAction, element }) => ({
  paper: {
    paper: () => drawMessage(uAction, element),
    rock: () =>
      winMessage({
        uAction,
        cAction,
        element,
        message: "covers",
      }),
    scissors: () => loseMessage({ uAction, cAction, element }),
  },
  rock: {
    paper: () => loseMessage({ uAction, cAction, element }),
    rock: () => drawMessage(uAction, element),
    scissors: () =>
      winMessage({
        uAction,
        cAction,
        element,
        message: "smash",
      }),
  },
  scissors: {
    paper: () =>
      winMessage({
        uAction,
        cAction,
        element,
        message: "cut",
      }),
    rock: () => loseMessage({ uAction, cAction, element }),
    scissors: () => drawMessage(uAction, element),
  },
});

actionsElements.forEach((act) => {
  act.addEventListener("click", () => {
    const computerAction = getRandomAction();
    actionResult({
      uAction: act.id,
      cAction: computerAction,
      element: act,
    });
  });
});

const actionResult = ({ uAction, cAction, element }) => {
  actions({ uAction, cAction, element })[uAction][cAction]();
};

function winMessage({ uAction, cAction, message, element }) {
  userScore.textContent = ++userPoints;
  resultMessage.textContent = getMessage(uAction, cAction, message, "you win!");
  toggleGlowClass("green-glow", element);
}

function loseMessage({ uAction, cAction, element }) {
  compScore.textContent = ++compPoints;
  resultMessage.textContent = getMessage(
    uAction,
    cAction,
    "loses to",
    "you lose..."
  );
  toggleGlowClass("red-glow", element);
}

function drawMessage(uAction, element) {
  resultMessage.textContent = getMessage(
    uAction,
    uAction,
    "is equal to",
    "it's a draw!"
  );
  toggleGlowClass("gray-glow", element);
}

function toggleGlowClass(cName, element) {
  element.classList.add(cName);
  setTimeout(() => element.classList.remove(cName), 500);
}

function getMessage(uAction, cAction, state, message) {
  return `${uAction}(user) ${state} ${cAction}(comp). ${message}`;
}

function getRandomAction() {
  return actionsMoves[Math.floor(Math.random() * actionsMoves.length)];
}
