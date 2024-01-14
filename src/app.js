import pairs from './pairs.json' assert { type: "json" }

const keyboard = document.createElement('div'), question = document.createElement('div'), gallow = document.createElement('div'),
      imgGallow = document.createElement('img'), hangman = document.createElement('div'), head = document.createElement('img'),
      hands = document.createElement('div'), leftHand = document.createElement('img'), rightHand = document.createElement('img'),
      corpus = document.createElement('img'), legs = document.createElement('div'), leftLeg = document.createElement('img'), 
      rightLeg = document.createElement('img'), wrapper = document.createElement('div'), body = document.querySelector('body'),
      answer = document.createElement('div'), keys = Array.from({ length: 122 - 91 }, (_, i) => String.fromCharCode(i + 97))

let correct = [], wrong = [], counter = 0, word = ''


keys.forEach(key => {
    const button = document.createElement("button")
    button.textContent = key
    keyboard.appendChild(button)
})

setAttributes([
    {
        el: keyboard, 
        attr: 'class', 
        val: 'keyboard'
    },
    {
        el: question, 
        attr: 'class', 
        val: 'question'
    },
    {
        el: gallow, 
        attr: 'class', 
        val: 'gallow'
    },
    {
        el: imgGallow, 
        attr: ['src', 'alt'], 
        val: ['./images/gallows.svg', 'Gallow' ]
    },
])
getRandomWord()
body.appendChild(question)
body.appendChild(keyboard)

keyboard.addEventListener('click', e => {
    console.log(e.target)
})


// FUNCTIONS

function setAttributes(elements) {
    elements.forEach((item) => {
        typeof item.attr === 'string' ? item.element.setAttribute(item.attr, item.val) : item.attr.forEach((attr, i) => {
            item.element.setAttribute(attr, item.val[i])
        })
    })
}

const getRandomWord = () => {
    const { q, a } = pairs[Math.floor(Math.random() * pairs.length)]
    word = a
    question.textContent = q
    resetGame()
}

const resetGame = () => {
    correct = [];
    counter = 0;
   // guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  //  wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
  //  keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
   // gameModal.classList.remove("show");
}

// for (let i = 97; i <= 122; i++) {
//     const button = document.createElement("button");
//     button.innerText = String.fromCharCode(i);
//     keyboard.appendChild(button);
//  //   button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
// }