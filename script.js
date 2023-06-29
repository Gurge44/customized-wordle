document.getElementById("error").innerHTML = "Loading....";
toastr.options.progressBar = true;

import { WORDS } from "./words.js";
import { SIXLETTERWORDS } from "./6-letter-words.js";
import { SEVENLETTERWORDS } from "./7-letter.words.js";
import { EIGHTLETTERWORDS } from "./8-letter-words.js";
import { THREELETTERWORDS } from "./3-letter-words.js";
import { FOURLETTERWORDS } from "./4-letter-words.js";
import { NINELETTERWORDS } from "./9-letter-words.js";
import { TENLETTERWORDS } from "./10-letter-words.js";
import { ELEVENLETTERWORDS } from "./11-letter-words.js";
import { TWELVELETTERWORDS } from "./12-letter-words.js";
import { THIRTEENLETTERWORDS } from "./13-letter-words.js";
import { FOURTEENLETTERWORDS } from "./14-letter-words.js";
import { FIFTEENLETTERWORDS } from "./15-letter-words.js";
import { SIXTEENLETTERWORDS } from "./16-letter-words.js";

var restartInQueue = false;
var onCooldown = false;
var wordLength = 5;
var NUMBER_OF_GUESSES = 9; // EDIT THIS NUMBER TO CHANGE THE AMOUNT OF GUESSES YOU HAVE
let guessesRemaining = NUMBER_OF_GUESSES;
var kept = guessesRemaining;
let currentGuess = [];
let lettersToBeFound = [];
let nextLetter = 0;
var rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];
lettersToBeFound = Array.from(rightGuessString);
let indexesToBeFound = [];
for (let o = 0; o < wordLength; o++) {
    indexesToBeFound.push(o);
}
var greenColor = "#008000";
var yellowColor = "#AFAF00";
var greyColor = "#000000";
var guessingRowLetterColor = "#00FFFF";
var guessingRowColor = "#141432";
var invalidColor = "#FF0000";

function applyColorConfig() {
    document.body.style.backgroundColor = document.getElementById("BackgroundColor").value;
    document.body.style.color = document.getElementById("letterColor").value;
    for (const elem of document.getElementsByClassName("letter-box")) {
        elem.style.borderColor = document.getElementById("outlineColor").value;
    }
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        elem.style.backgroundColor = document.getElementById("keyboardBGColor").value;
        elem.style.color = document.getElementById("keyboardLetterColor").value;
    }
    for (const elem of document.getElementsByClassName("button")) {
        elem.style.backgroundColor = document.getElementById("buttonBGColor").value;
    }
    for (const elem of document.getElementsByClassName("input")) {
        elem.style.backgroundColor = document.getElementById("inputBGColor").value;
        elem.style.color = document.getElementById("inputLetterColor").value;
        elem.style.borderColor = document.getElementById("inputBorderColor").value;
    }
    document.getElementById("title").style.color = document.getElementById("titleColor").value;
    greenColor = document.getElementById("greenColor").value;
    yellowColor = document.getElementById("yellowColor").value;
    greyColor = document.getElementById("greyColor").value;
    document.getElementById("h2title").style.color = document.getElementById("h2TitleColor").value;
    invalidColor = document.getElementById("incorrectGuessRowColor").value;
    guessingRowColor = document.getElementById("currentGuessBGColor").value;
    guessingRowLetterColor = document.getElementById("currentGuessLetterColor").value;
    document.getElementById("happyEaster").style.color = document.getElementById("easterEgg").value;
}

function changeWordLength() {
    var inputLength = Number(document.getElementById("wordLengthInput").value);
    if (inputLength <= 16 && inputLength >= 3) {
        wordLength = inputLength;
        document.getElementById("error").innerHTML = "Loading....";
        var input = document.getElementById("numOfGuessesType").value;
        if (input <= 0 || input === "") {
            input = 1;
        }
        NUMBER_OF_GUESSES = input;
        guessesRemaining = input;
        currentGuess = [];
        lettersToBeFound = [];
        indexesToBeFound = [];
        for (let o = 0; o < wordLength; o++) {
            indexesToBeFound.push(o);
        }
        nextLetter = 0;
        if (wordLength === 5) {
            rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];
        } else if (wordLength === 6) {
            rightGuessString = SIXLETTERWORDS[Math.floor(Math.random() * SIXLETTERWORDS.length)]
        } else if (wordLength === 7) {
            rightGuessString = SEVENLETTERWORDS[Math.floor(Math.random() * SEVENLETTERWORDS.length)]
        } else if (wordLength === 8) {
            rightGuessString = EIGHTLETTERWORDS[Math.floor(Math.random() * EIGHTLETTERWORDS.length)]
        } else if (wordLength === 3) {
            rightGuessString = THREELETTERWORDS[Math.floor(Math.random() * THREELETTERWORDS.length)]
        } else if (wordLength === 4) {
            rightGuessString = FOURLETTERWORDS[Math.floor(Math.random() * FOURLETTERWORDS.length)]
        } else if (wordLength === 9) {
            rightGuessString = NINELETTERWORDS[Math.floor(Math.random() * NINELETTERWORDS.length)]
        } else if (wordLength === 10) {
            rightGuessString = TENLETTERWORDS[Math.floor(Math.random() * TENLETTERWORDS.length)]
        } else if (wordLength === 11) {
            rightGuessString = ELEVENLETTERWORDS[Math.floor(Math.random() * ELEVENLETTERWORDS.length)]
        } else if (wordLength === 12) {
            rightGuessString = TWELVELETTERWORDS[Math.floor(Math.random() * TWELVELETTERWORDS.length)]
        } else if (wordLength === 13) {
            rightGuessString = THIRTEENLETTERWORDS[Math.floor(Math.random() * THIRTEENLETTERWORDS.length)]
        } else if (wordLength === 14) {
            rightGuessString = FOURTEENLETTERWORDS[Math.floor(Math.random() * FOURTEENLETTERWORDS.length)]
        } else if (wordLength === 15) {
            rightGuessString = FIFTEENLETTERWORDS[Math.floor(Math.random() * FIFTEENLETTERWORDS.length)]
        } else if (wordLength === 16) {
            rightGuessString = SIXTEENLETTERWORDS[Math.floor(Math.random() * SIXTEENLETTERWORDS.length)]
        }
        document.getElementById("game-board").innerHTML = "";
        initBoard();
        let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining];
        row.style.backgroundColor = guessingRowColor;
        lettersToBeFound = Array.from(rightGuessString);
        for (const elem of document.getElementsByClassName("letter-box")) {
            elem.style.borderColor = document.getElementById("outlineColor").value;
        }
        for (const elem of document.getElementsByClassName("keyboard-button")) {
            elem.style.backgroundColor = document.getElementById("keyboardBGColor").value;
            elem.style.color = document.getElementById("keyboardLetterColor").value;
        }
        document.getElementById("error").innerHTML = "";
    }
}

function changeNumOfGuesses() {
    document.getElementById("error").innerHTML = "Loading....";
    var input = document.getElementById("numOfGuessesType").value;
    if (input <= 0 || input === "") {
        input = 1;
    }
    NUMBER_OF_GUESSES = input;
    guessesRemaining = input;
    currentGuess = [];
    lettersToBeFound = [];
    indexesToBeFound = [];
    for (let o = 0; o < wordLength; o++) {
        indexesToBeFound.push(o);
    }
    nextLetter = 0;
    if (wordLength === 5) {
        rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];
    } else if (wordLength === 6) {
        rightGuessString = SIXLETTERWORDS[Math.floor(Math.random() * SIXLETTERWORDS.length)]
    } else if (wordLength === 7) {
        rightGuessString = SEVENLETTERWORDS[Math.floor(Math.random() * SEVENLETTERWORDS.length)]
    } else if (wordLength === 8) {
        rightGuessString = EIGHTLETTERWORDS[Math.floor(Math.random() * EIGHTLETTERWORDS.length)]
    } else if (wordLength === 3) {
        rightGuessString = THREELETTERWORDS[Math.floor(Math.random() * THREELETTERWORDS.length)]
    } else if (wordLength === 4) {
        rightGuessString = FOURLETTERWORDS[Math.floor(Math.random() * FOURLETTERWORDS.length)]
    } else if (wordLength === 9) {
        rightGuessString = NINELETTERWORDS[Math.floor(Math.random() * NINELETTERWORDS.length)]
    } else if (wordLength === 10) {
        rightGuessString = TENLETTERWORDS[Math.floor(Math.random() * TENLETTERWORDS.length)]
    } else if (wordLength === 11) {
        rightGuessString = ELEVENLETTERWORDS[Math.floor(Math.random() * ELEVENLETTERWORDS.length)]
    } else if (wordLength === 12) {
        rightGuessString = TWELVELETTERWORDS[Math.floor(Math.random() * TWELVELETTERWORDS.length)]
    } else if (wordLength === 13) {
        rightGuessString = THIRTEENLETTERWORDS[Math.floor(Math.random() * THIRTEENLETTERWORDS.length)]
    } else if (wordLength === 14) {
        rightGuessString = FOURTEENLETTERWORDS[Math.floor(Math.random() * FOURTEENLETTERWORDS.length)]
    } else if (wordLength === 15) {
        rightGuessString = FIFTEENLETTERWORDS[Math.floor(Math.random() * FIFTEENLETTERWORDS.length)]
    } else if (wordLength === 16) {
        rightGuessString = SIXTEENLETTERWORDS[Math.floor(Math.random() * SIXTEENLETTERWORDS.length)]
    }
    document.getElementById("game-board").innerHTML = "";
    initBoard();
    let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining];
    row.style.backgroundColor = guessingRowColor;
    for (const elem of document.getElementsByClassName("letter-box")) {
        elem.style.borderColor = document.getElementById("outlineColor").value;
    }
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        elem.style.backgroundColor = document.getElementById("keyboardBGColor").value;
        elem.style.color = document.getElementById("keyboardLetterColor").value;
    }
    lettersToBeFound = Array.from(rightGuessString);
    document.getElementById("error").innerHTML = "";
}

document.querySelector("#saveColorConfigButton").addEventListener("click", () => applyColorConfig());
document.querySelector("#wordLengthInput").addEventListener("change", () => changeWordLength());
document.querySelector('#numOfGuessesType').addEventListener("change", () => changeNumOfGuesses());
document.querySelector('#restart').addEventListener("click", () => restart());
document.querySelector('#showSettings').addEventListener("click", () => {
    if (document.getElementById("settings").hidden === false) {
        document.getElementById("settings").hidden = true;
    } else {
        document.getElementById("settings").hidden = false;
    }
});

function initBoard() {
    let board = document.getElementById("game-board");

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div");
        row.className = "letter-row";
        
        for (let j = 0; j < wordLength; j++) {
            let box = document.createElement("div");
            box.className = "letter-box";
            row.appendChild(box);
        }

        board.appendChild(row);
    }
}

initBoard();

let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining];
row.style.backgroundColor = guessingRowColor;

function insertLetter (pressedKey) {
    if (pressedKey === "F12") {
        console.log("Hmmm.... looking to cheat?");
    }
    if (nextLetter === wordLength || pressedKey === "F1" || pressedKey === "F2" || pressedKey === "F3" || pressedKey === "F4" || pressedKey === "F5" || pressedKey === "F6" || pressedKey === "F7" || pressedKey === "F8" || pressedKey === "F9" || pressedKey === "F10" || pressedKey === "F11" || pressedKey === "F12") {
        return
    }
    pressedKey = pressedKey.toLowerCase();

    let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining];
    let box = row.children[nextLetter];
    if (document.getElementById("animations").checked) {
        animateCSS(box, "pulse", '0.3s');
    }
    box.textContent = pressedKey;
    box.classList.add("filled-box");
    currentGuess.push(pressedKey);
    box.style.color = guessingRowLetterColor;
    box.style.borderColor = guessingRowLetterColor;
    nextLetter += 1;
}

function deleteLetter () {
    let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining];
    let box = row.children[nextLetter - 1];
    box.textContent = "";
    box.classList.remove("filled-box");
    box.style.borderColor = document.getElementById("outlineColor").value;
    currentGuess.pop();
    nextLetter -= 1;
    if (document.getElementById("animations").checked) {
        animateCSS(box, "fadeIn", '0.3s');
    }
}

function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor;
            if (oldColor === greenColor) {
                if (document.getElementById("animations").checked) {
                    animateCSS(elem, "bounce", '1.0s');
                }
                return;
            } 

            if (oldColor === yellowColor && color !== greenColor) {
                if (document.getElementById("animations").checked) {
                    animateCSS(elem, "headShake", '1.0s');
                }
                return;
            }

            if (oldColor === greyColor && color === greyColor && document.getElementById("animations").checked) {
                animateCSS(elem, "heartBeat", '1.0s');
            } else {
                animateCSS(elem, "fadeIn", '0.3s');
            }
            
            elem.style.backgroundColor = color;

            if (color === greyColor) {
                elem.style.color = 'rgba(255, 255, 255, 10%)';
            }
            if (color === yellowColor) {
                elem.style.color = greyColor;
            }
            if (color === greenColor) {
                elem.style.color = 'lightgrey';
            }
            break
        }
    }
}

function checkGuess () {
    let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining]
    let guessString = '';
    let rightGuess = Array.from(rightGuessString);

    for (const val of currentGuess) {
        guessString += val;
    }

    if (guessString.length != wordLength) {
        toastr.error("Not enough letters!");
        return;
    }

    if (!WORDS.includes(guessString) && !SIXLETTERWORDS.includes(guessString) && !SEVENLETTERWORDS.includes(guessString) && !EIGHTLETTERWORDS.includes(guessString) && !THREELETTERWORDS.includes(guessString) && !FOURLETTERWORDS.includes(guessString) && !NINELETTERWORDS.includes(guessString) && !TENLETTERWORDS.includes(guessString) && !ELEVENLETTERWORDS.includes(guessString) && !TWELVELETTERWORDS.includes(guessString) && !THIRTEENLETTERWORDS.includes(guessString) && !FOURTEENLETTERWORDS.includes(guessString) && !FIFTEENLETTERWORDS.includes(guessString) && !SIXTEENLETTERWORDS.includes(guessString)) {
        toastr.error("Word not in list!");
        row.style.backgroundColor = invalidColor;
        setTimeout(() => {
            row.style.backgroundColor = guessingRowColor;
        }, 750)
        return;
    }

    // console.log("---------------- NEW GUESS ----------------");
    // console.log("Answer: " + rightGuessString);
    let yellowsLeft = rightGuess;

    for (let i = 0; i < wordLength; i++) {
        // console.log("----");
        let letterColor = '';
        let box = row.children[i];
        let letter = currentGuess[i];
        
        // let letterPosition = rightGuess.indexOf(currentGuess[i]);
        let letterCount = (rightGuessString.match(new RegExp(currentGuess[i], "g")) || []).length;
        let currentGuessedLetterCount = (guessString.match(new RegExp(currentGuess[i], "g")) || []).length;
        if (letterCount === 0) {
            letterColor = greyColor;
        } else {
            if (currentGuess[i] === rightGuess[i]) {
                letterColor = greenColor;
                let newArray = [];
                let removeone = true;
                for (let j = 0; j < lettersToBeFound.length; j++) {
                    if (lettersToBeFound[j] !== currentGuess[i]) {
                        newArray.push(lettersToBeFound[j]);
                    } else {
                        if (removeone === true && indexesToBeFound.includes(i)) {
                            removeone = false;
                        } else {
                            newArray.push(lettersToBeFound[j]);
                        }
                    }
                }
                lettersToBeFound = newArray;
                let newArrayzero = [];
                for (let m = 0; m < indexesToBeFound.length; m++) {
                    if (indexesToBeFound[m] !== i) {
                        newArrayzero.push(indexesToBeFound[m]);
                    }
                }
                indexesToBeFound = newArrayzero;
                let newArraytwo = [];
                let removetwo = true;
                for (let l = 0; l < yellowsLeft.length; l++) {
                    if (yellowsLeft[l] !== currentGuess[i]) {
                        newArraytwo.push(yellowsLeft[l]);
                    } else {
                        if (removetwo === true) {
                            removetwo = false;
                        } else {
                            newArraytwo.push(yellowsLeft[l]);
                        }
                    }
                }
                yellowsLeft = newArraytwo;
            } else {
                if (!yellowsLeft.includes(currentGuess[i])) {
                    letterColor = greyColor;
                } else {
                    letterColor = yellowColor;
                    let existCount = 0;
                    if (currentGuessedLetterCount > 1 && currentGuessedLetterCount > letterCount) {
                        for (let p = i; p <= (wordLength - 1) - i; p++) {
                            let temp = i + (p);
                            if (currentGuess[temp] == rightGuess[temp] && currentGuess[temp] == currentGuess[i]) {
                                existCount += 1;
                            }
                        }
                        if (existCount >= letterCount) {
                            letterColor = greyColor;
                        }
                    }
                    let newArraythree = [];
                    let removethree = true;
                    for (let k = 0; k < yellowsLeft.length; k++) {
                        if (yellowsLeft[k] !== currentGuess[i]) {
                            newArraythree.push(yellowsLeft[k]);
                        } else {
                            if (removethree === true) {
                                removethree = false;
                            } else {
                                newArraythree.push(yellowsLeft[k]);
                            }
                        }
                    }
                    yellowsLeft = newArraythree;
                }
            }
        }
        // console.log("Inspecting '" + currentGuess[i] + "' of " + currentGuess);
        // console.log("LetterCount: " + letterCount);
        // console.log("Right letter: " + rightGuess[i]);
        // console.log("yellowsLeft: " + yellowsLeft);
        // console.log("LettersToBeFound: " + lettersToBeFound);
        // console.log("IndexesToBeFound: " + indexesToBeFound);


        if (document.getElementById("animations").checked) {
            var temp = 150 * i;
        } else {
            var temp = 0;
        }
        let delay = temp;
        setTimeout(() => {
            if (document.getElementById("animations").checked) {
                animateCSS(box, 'backInDown', '0.6s')
            }
            box.style.backgroundColor = letterColor;
            box.style.borderColor = 'white';
            box.style.color = 'white';
            shadeKeyBoard(letter, letterColor);
        }, delay)
    }

    if (guessString === rightGuessString) {
        kept = guessesRemaining;
        row.style.backgroundColor = 'rgba(0, 0, 0, 10%)';
        guessesRemaining = 0
        if (document.getElementById("animations").checked) {
            onCooldown = true;
            correctGuessBounce();
        }
        if (document.getElementById("autoRestart").checked) {
            autoRestart();
        }
        return
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        row.style.backgroundColor = 'rgba(0, 0, 0, 10%)';
        if (guessesRemaining !== 0) {
            let temp = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining];
            temp.style.backgroundColor = guessingRowColor;
        }

        if (guessesRemaining === 0) {
            toastr.error("You've run out of guesses! Game over!")
            toastr.info(`The right word was: "${rightGuessString}"`)
        }
    }
}

function delay(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

async function correctGuessBounce() {
    await delay(150 * wordLength);
    let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - kept];
    for (let i = 0; i < wordLength; i++) {
        let box = row.children[i];
        await delay(100);
        animateCSS(box, 'bounce', '1.0s');
    }
    toastr.success("You guessed right! Game over!")
    onCooldown = false;
}

document.getElementById("error").innerHTML = ""

document.addEventListener("keyup", (e) => {

    if (guessesRemaining === 0) {
        return
    }

    let pressedKey = String(e.key)
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter()
        return
    }

    if (pressedKey === "Enter") {
        checkGuess()
        return
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target
    
    if (!target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent

    if (key === "Del") {
        key = "Backspace"
    } 

    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})

var cancel = false;

function autoRestart() {
    if (document.getElementById("autoRestartCooldown").value === "" || document.getElementById("autoRestartCooldown").value <= 0) {
        var timeleft = 2;
    } else {
        var timeleft = document.getElementById("autoRestartCooldown").value - 1;
    }
    var temp = timeleft + 1;
    document.getElementById("autoRestartLine").hidden = true;
    document.getElementById("countdown").innerHTML = "Auto-Restarting in " + temp;
    document.getElementById("cancel").hidden = false;
    var timer = setInterval(function() {
        if (cancel) {
            clearInterval(timer);
            cancel = false;
        } else {
            if (timeleft <= 0) {
                clearInterval(timer);
                document.getElementById("countdown").innerHTML = "";
                document.getElementById("cancel").hidden = true;
                document.getElementById("autoRestartLine").hidden = false;
                restart();
            } else {
                document.getElementById("countdown").innerHTML = "Auto-Restarting in " + timeleft;
            }
            timeleft -= 1;
        }
    }, 1000);
}

function cancelAutoRestart() {
    cancel = true;
    document.getElementById("countdown").innerHTML = "";
    document.getElementById("cancel").hidden = true;
    document.getElementById("autoRestartLine").hidden = false;
}

document.querySelector('#cancel').addEventListener("click", () => cancelAutoRestart());

function restart() {
    if (guessesRemaining === NUMBER_OF_GUESSES) {
        toastr.warning("Restart command ignored. You haven't made any guesses yet.")
        return;
    }
    if (onCooldown) {
        if (restartInQueue) {
            return;
        } else {
            restartInQueue = true;
            toastr.warning("Restart will happen after the animations are done.")
            setTimeout(() => {
                restart();
                onCooldown = false;
                restartInQueue = false;
            }, 350 * wordLength);
            return;
        }
    }
    document.getElementById("error").innerHTML = "Loading....";
    var input = document.getElementById("numOfGuessesType").value;
    if (input <= 0 || input === "") {
        input = 1;
    }
    
    NUMBER_OF_GUESSES = input;
    guessesRemaining = input;
    currentGuess = [];
    lettersToBeFound = [];
    indexesToBeFound = [];
    for (let o = 0; o < wordLength; o++) {
        indexesToBeFound.push(o);
    }
    nextLetter = 0;
    if (wordLength === 5) {
        rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];
    } else if (wordLength === 6) {
        rightGuessString = SIXLETTERWORDS[Math.floor(Math.random() * SIXLETTERWORDS.length)]
    } else if (wordLength === 7) {
        rightGuessString = SEVENLETTERWORDS[Math.floor(Math.random() * SEVENLETTERWORDS.length)]
    } else if (wordLength === 8) {
        rightGuessString = EIGHTLETTERWORDS[Math.floor(Math.random() * EIGHTLETTERWORDS.length)]
    } else if (wordLength === 3) {
        rightGuessString = THREELETTERWORDS[Math.floor(Math.random() * THREELETTERWORDS.length)]
    } else if (wordLength === 4) {
        rightGuessString = FOURLETTERWORDS[Math.floor(Math.random() * FOURLETTERWORDS.length)]
    } else if (wordLength === 9) {
        rightGuessString = NINELETTERWORDS[Math.floor(Math.random() * NINELETTERWORDS.length)]
    } else if (wordLength === 10) {
        rightGuessString = TENLETTERWORDS[Math.floor(Math.random() * TENLETTERWORDS.length)]
    } else if (wordLength === 11) {
        rightGuessString = ELEVENLETTERWORDS[Math.floor(Math.random() * ELEVENLETTERWORDS.length)]
    } else if (wordLength === 12) {
        rightGuessString = TWELVELETTERWORDS[Math.floor(Math.random() * TWELVELETTERWORDS.length)]
    } else if (wordLength === 13) {
        rightGuessString = THIRTEENLETTERWORDS[Math.floor(Math.random() * THIRTEENLETTERWORDS.length)]
    } else if (wordLength === 14) {
        rightGuessString = FOURTEENLETTERWORDS[Math.floor(Math.random() * FOURTEENLETTERWORDS.length)]
    } else if (wordLength === 15) {
        rightGuessString = FIFTEENLETTERWORDS[Math.floor(Math.random() * FIFTEENLETTERWORDS.length)]
    } else if (wordLength === 16) {
        rightGuessString = SIXTEENLETTERWORDS[Math.floor(Math.random() * SIXTEENLETTERWORDS.length)]
    }
    document.getElementById("game-board").innerHTML = "";
    initBoard();
    let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining];
    row.style.backgroundColor = guessingRowColor;
    for (const elem of document.getElementsByClassName("letter-box")) {
        elem.style.borderColor = document.getElementById("outlineColor").value;
    }
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        elem.style.backgroundColor = document.getElementById("keyboardBGColor").value;
        elem.style.color = document.getElementById("keyboardLetterColor").value;
    }
    lettersToBeFound = Array.from(rightGuessString);
    document.getElementById("error").innerHTML = "";
}

const animateCSS = (element, animation, time, prefix = 'animate__') => new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);
    const node = element
    node.style.setProperty('--animate-duration', time);
    
    node.classList.add(`${prefix}animated`, animationName);

    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
});
