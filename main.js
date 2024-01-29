const wordsToGuess = [
  "habits",
  "hacker",
  "tables",
  "advise",
  "beauty",
  "combat",
  "couple",
  "easily",
];
const randomIndex = Math.floor(Math.random() * wordsToGuess.length);
const wordToGuess = wordsToGuess[randomIndex];
console.log(wordToGuess);
const resultTitle = document.querySelector("div.result h3");
let index = 1;

let hints = 2;
document.querySelector("span.hint-num").innerHTML = hints;
let hintIndex = [];

document.querySelectorAll("input").forEach((input) => {
  input.maxLength = 1;
  input.onkeyup = (e) => {
    if (
      e.key != "Shift" &&
      e.key != "Alt" &&
      e.key != " " &&
      e.key != "Tab" &&
      e.key != "Control"
    ) {
      if (e.key === "ArrowRight") {
        input.nextElementSibling.focus();
      } else if (e.key === "ArrowLeft") {
        input.value = "";
        input.previousElementSibling.value = "";
        input.previousElementSibling.focus();
      } else if (e.key === "Backspace") {
        input.value = "";
      } else {
        input.nextElementSibling.focus();
      }
    } else {
      input.value = "";
    }
  };
});

let enableInputs = document.querySelectorAll(`input.try${index}-input`);
window.addEventListener("load", () => {
  enableInputs[0].focus();
});
enableInputs.forEach((input) => {
  input.disabled = false;
});

let desabledInputs = document.querySelectorAll(`input:not(.try${index}-input)`);
desabledInputs.forEach((input) => {
  input.disabled = true;
});

document.querySelector(".check").addEventListener("click", (e) => {
  hintIndex = [];
  let result = 0;
  for (
    let j = 0;
    j < document.querySelectorAll(`input.try${index}-input`).length;
    j++
  ) {
    if (
      document
        .querySelectorAll(`input.try${index}-input`)
        [j].value.toLowerCase() &&
      wordToGuess.includes(
        document
          .querySelectorAll(`input.try${index}-input`)
          [j].value.toLowerCase()
      )
    ) {
      if (
        j ===
        wordToGuess.indexOf(
          document
            .querySelectorAll(`input.try${index}-input`)
            [j].value.toLowerCase()
        )
      ) {
        document
          .querySelectorAll(`input.try${index}-input`)
          [j].classList.add("in-place");
        ++result;
      } else {
        document
          .querySelectorAll(`input.try${index}-input`)
          [j].classList.add("not-in-place");
      }
    } else {
      document
        .querySelectorAll(`input.try${index}-input`)
        [j].classList.add("wrong");
    }
  }
  if (result === 6) {
    resultTitle.innerHTML = `<h3>You Won, The Word Is <span>${wordToGuess.toUpperCase()}</span></h3>`;
    e.target.disabled = true;
    e.target.style.cursor = "not-allowed";
    document.querySelectorAll("input").forEach((input) => {
      input.disabled = true;
      input.style.cursor = "not-allowed";
    });
    finished = true;
  } else if (index < 5) {
    document.querySelectorAll(`input.try${index}-input`).forEach((input) => {
      input.classList.add("disabled");
    });
    document
      .querySelector(`div.try${index}-container`)
      .classList.add("disabled");

    ++index;

    document.querySelectorAll(`.try${index}-input`).forEach((input) => {
      input.disabled = false;
      input.classList.remove("disabled");
    });
    document.querySelectorAll(`.try${index}-input`)[0].focus();
    document
      .querySelector(`div.try${index}-container`)
      .classList.remove("disabled");

    document
      .querySelectorAll(`input:not(.try${index}-input)`)
      .forEach((input) => {
        input.disabled = true;
      });
  } else {
    document.querySelectorAll(`.try${index}-input`).forEach((input) => {
      input.disabled = true;
      input.style.cursor = "not-allowed";
    });
    e.target.disabled = true;
    e.target.style.cursor = "not-allowed";
    document.querySelector("button.hint").disabled = true;
    document.querySelector("button.hint").style.cursor = "not-allowed";
    resultTitle.innerHTML = `<h3>You Lost, The Word Is <span>${wordToGuess.toUpperCase()}</span></h3>`;
  }
});

document.querySelector("button.hint").addEventListener("click", (e) => {
  if (hints > 0) {
    --hints;
    document.querySelectorAll(`.try${index}-input`).forEach((input, ind) => {
      if (input.value === "") {
        hintIndex.push(ind);
      }
    });
    let randomIndex;
    if (hintIndex.length === 0) {
      randomIndex = hintIndex[0];
    } else {
      let random = Math.floor(Math.random() * hintIndex.length);
      randomIndex = hintIndex[random];
    }

    document.querySelectorAll(`.try${index}-input`)[randomIndex].value =
      wordToGuess[randomIndex];
    document.querySelector("span.hint-num").innerHTML = hints;
  }
  if (hints === 0) {
    e.target.disabled = true;
    e.target.style.cursor = "not-allowed";
  }
});

document.querySelector(".restart").addEventListener("click", () => {
  window.location.reload();
});
