var hangman = {
  // STORES THE PROPERTIES
  alphabet: null,
  alphabetarray: [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ],
  wordvalue: null,
  word: null,
  hiddenword: [],
  lifevalue: null,
  lifes: null,
  wordarray: {
    diff: "normal",
    normal: ["ball", "tree", "camp", "poker"],
    extreme: ["volskwagen", "tabletop", "minecraft", "promiscuous"],
  },
  hint: null,
  init: function () {
    hangman.lifes = 5;

    hangman.alphabet = document.getElementById(`alphabet`);
    hangman.wordvalue = document.getElementById(`word`);
    hangman.lifevalue = document.getElementById(`lifes`);

    hangman.normaldiff = document.getElementById(`normaldiff`);
    hangman.normaldiff.addEventListener("click", hangman.handleDifficulty);

    hangman.hint = document.getElementById("hint");
    hangman.hint.style.display = "block";
    hangman.hint.addEventListener("click", hangman.handleHint);

    hangman.extremediff = document.getElementById(`extremediff`);
    hangman.extremediff.addEventListener("click", hangman.handleDifficulty);

    hangman.lifevalue.innerHTML = `You have ${hangman.lifes} lifes`;
    hangman.lifevalue.removeEventListener("click", hangman.init);

    hangman.setAlphabet();
    hangman.assignEventListener();
    hangman.setWord(hangman.wordarray.diff);
  },

  handleHint: function () {
    // HANDLES HINT
    hangman.hint.style.display = "none";
    document
      .getElementById(
        hangman.word.charAt(Math.floor(Math.random() * hangman.word.length))
      )
      .classList.add("letterdisappear");
  },

  handleDifficulty: function () {
    // HANDlES DIFFICULTY CHANGE
    switch (this.id) {
      case "normaldiff":
        hangman.wordarray.diff = "normal";
        break;

      case "extremediff":
        hangman.wordarray.diff = "extreme";
        break;
    }

    hangman.init();
  },

  handleClear: function () {
    // RESETS THE GAME
    hangman.alphabet.innerHTML = "";
    hangman.wordvalue.innerHTML = "";
    hangman.hiddenword = [];
  },

  setWord: function (difficulty) {
    // FUNCTION TO SET AND HANDLE HIDDEN WORD

    switch (difficulty) {
      case "normal":
        var rand = Math.floor(Math.random() * hangman.wordarray.normal.length);
        hangman.word = hangman.wordarray.normal[rand];
        for (var i = 0; i < hangman.word.length; i++) {
          hangman.hiddenword.push("-");
        }
        break;

      case "extreme":
        var rand = Math.floor(Math.random() * hangman.wordarray.extreme.length);
        hangman.word = hangman.wordarray.extreme[rand];
        for (var i = 0; i < hangman.word.length; i++) {
          hangman.hiddenword.push("-");
        }
        break;
    }
    hangman.printWord();
  },

  printWord: function () {
    // FUNCTION TO DISPLAY HIDDEN WORD

    hangman.hiddenword.forEach(
      (letter) => (hangman.wordvalue.innerHTML += letter)
    );
  },

  setAlphabet: function () {
    // DISPLAY THE ALPHABET IN BROWSER WINDOW
    hangman.handleClear();

    hangman.alphabetarray.forEach(
      (letter) =>
        (hangman.alphabet.innerHTML += `<div id="${letter}"class="letter">${letter}</span>`)
    );
  },

  assignEventListener: function () {
    // ASSIGN EVEN LISTENERS TO EACH LETTER
    hangman.alphabetarray.forEach((letter) =>
      document
        .getElementById(letter)
        .addEventListener("click", hangman.handleAlphabet)
    );
  },

  handleAlphabet: function () {
    let occurence = hangman.word.search(this.id);
    console.log(occurence);
    if (occurence != -1) {
      // SEARCHES FOR THE LETTER IN THE WORD
      for (var i = 0; i < hangman.word.length; i++) {
        if (this.id === hangman.word.charAt(i)) {
          hangman.hiddenword[i] = this.id;
          hangman.wordvalue.innerHTML = "";
          document.getElementById(this.id).innerHTML = "";
          document.getElementById(this.id).style.transition = "5s";

          hangman.printWord();
        } else {
        }
      }
    } else {
      hangman.lifes -= 1;
      hangman.lifevalue.innerHTML = `You have ${hangman.lifes} lifes`;
    }

    if (hangman.lifes === 0) {
      alert("YOU LOSE. PRESS OK TO RESET");
      hangman.init();
    }

    if (hangman.wordvalue.innerHTML === hangman.word) {
      hangman.lifevalue.innerHTML = `YOU HAVE WON. Play again?`;
      hangman.lifevalue.style.cursor = "pointer";
      hangman.lifevalue.addEventListener("click", hangman.init);
    }
  },
};

window.addEventListener("load", hangman.init);
