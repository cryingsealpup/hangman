import pairs from './pairs.json' assert { type: "json" }

const keyboard = document.createElement('div'), question = document.createElement('div'), gallow = document.createElement('div'),
      imgGallow = document.createElement('img'), hangman = document.createElement('div'), head = document.createElement('img'),
      hands = document.createElement('div'), leftHand = document.createElement('img'), rightHand = document.createElement('img'),
      corpus = document.createElement('img'), legs = document.createElement('div'), leftLeg = document.createElement('img'), 
      rightLeg = document.createElement('img'), wrapper = document.createElement('div'), leftSide = document.createElement('div'),
      h1 = document.createElement('h1'), body = document.querySelector('body'), answer = document.createElement('div'), 
      guesses = document.createElement('div'), keys = Array.from({ length: 117 - 91 }, (_, i) => String.fromCharCode(i + 97))

let correct = 0, list = [], counter = 0, word = ''

keys.push(String.fromCharCode(30 + 97))

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
    {
        el: hangman, 
        attr: 'class', 
        val: 'hangman'
    },
    {
        el: head, 
        attr: ['src', 'alt','class'], 
        val: ["./images/head.svg", 'Hangman head', 'hangman-head']
    },
    {
        el: hands, 
        attr: 'class', 
        val: 'hangman-hands '
    },
    {
        el: leftHand, 
        attr: ['src', 'alt'], 
        val: ["./images/hand-one.svg", 'Left hand']
    },
    {
        el: rightHand, 
        attr: ['src', 'alt'], 
        val: ["./images/hand-two.svg", 'Right hand']
    },
    {
        el: corpus, 
        attr: ['src', 'alt', 'class'], 
        val: ["./images/body.svg", 'Hangman body', 'hangman-body']
    },
    {
        el: legs, 
        attr: 'class', 
        val: 'hangman-legs'
    },
    {
        el: leftLeg, 
        attr: ['src', 'alt'], 
        val: ["./images/leg-one.svg", 'Left leg']
    },
    {
        el: rightLeg, 
        attr: ['src', 'alt'], 
        val: ["./images/leg-two.svg", 'Right leg']
    },
    {
        el: wrapper, 
        attr: 'class', 
        val: 'game'
    },
    {
        el: leftSide, 
        attr: 'class', 
        val: 'logic'
    },
    {
        el: answer, 
        attr: 'class', 
        val: 'answer'
    },
    {
        el: guesses, 
        attr: 'class', 
        val: 'guesses'
    },
])
getRandomWord()

h1.textContent = 'Hangman Game'

hands.append(leftHand, rightHand)
legs.append(leftLeg, rightLeg)
hangman.append(head, hands, corpus, legs)
gallow.append(imgGallow, hangman)
leftSide.append(question, answer, guesses, keyboard)
wrapper.append(gallow, leftSide)
body.append(h1, wrapper)

const order = [head, corpus, leftHand, rightHand, leftLeg, rightLeg]


// FUNCTIONS

function processKey(key) {
    key.disabled = true
    checkLetter(key.textContent)
}

function setAttributes(elements) {
    elements.forEach((item) => {
        typeof item.attr === 'string' ? item.el.setAttribute(item.attr, item.val) : item.attr.forEach((attr, i) => {
            item.el.setAttribute(attr, item.val[i])
        })
    })
}

function getRandomWord() {
    const { q, a } = pairs[Math.floor(Math.random() * pairs.length)]
    word = a.toLowerCase()
    question.textContent = q
    answer.textContent = '_ '.repeat(word.length)
    list = Array(word.length).fill('_ ')
    reset()
}

function updateAnswer(mask) {
    mask.forEach((el) => { list[el] = word[el].toUpperCase() + ' ' })
    answer.textContent = list.join('')
}

function updateWrong() {
    guesses.textContent = counter
}

function checkLetter(letter) {
    if (word.toLowerCase().includes(letter)) {
        const occurs = word.split('').reduce((a, x, i) => {
            if (x === letter) a.push(i)
            return a
        }, [])
        updateAnswer(occurs)
        correct = +correct + +occurs.length
    } else {
        counter++
        counter < 7 ? order[counter - 1].classList.add('show') : ''
    }
    isFinished()
}

function isFinished() {
    if (counter > 6) {
        
        console.log("you lose")
    } else if (word.length === correct) {
        console.log("you win!")
    } else {
        updateWrong()
    }
}

function reset() {
    correct = [];
    counter = 0;
    guesses.textContent = 0
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


// LISTENERS
document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase()
    if (keys.includes(key)) {
        keyboard.childNodes[keys.indexOf(key)].click()
    } else if (key === ' ') {
        [...keyboard.childNodes].at(-1).click()
    }
})

keyboard.addEventListener('click', e => {
    processKey(e.target)
})