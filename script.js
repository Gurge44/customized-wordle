document.getElementById("error").innerHTML = "Loading....";
let version = "v3.0.1";
document.getElementById("title").innerHTML += " " + version;
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
var yellowColor = "#afaf00";
var greyColor = "#000000";
var guessingRowLetterColor = "#00ffff";
var guessingRowColor = "#141432";
var invalidColor = "#ff0000";
var totalMinutesLeft = 0;
var totalSecondsLeft = 1;
var cancel2 = false;
var timeToGuessMinutes = 0;
var timeToGuessSeconds = 1;
var fixTimeToGuessMinutes = timeToGuessMinutes;
var fixTimeToGuessSeconds = timeToGuessSeconds;
var cancel3 = false;
var mainTimerRunning = false;
var guessTimerRunning = false;
var hideMainTimer = true;
var timerExpiredColor = "#ff0000";
var timerWarningColor = "#ffff00";
var inactiveTimerColor = "#777777";
var greenTimeBonus = 40;
var yellowTimeBonus = 10;
var greyTimePenalty = 5;
var timeChange = 0;
var allowReset = true;
var entireGuessTimeChange = 0;
var timeChangePositiveColor = "#00ff00";
var noTimeChangeColor = "#ffe135";
var timeChangeNegativeColor = "#ff0000";

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
    timerWarningColor = document.getElementById("timerWarningColor").value;
    timerExpiredColor = document.getElementById("timerExpiredColor").value;
    inactiveTimerColor = document.getElementById("inactiveTimerColor").value;
    toastr.success("Color config applied successfully");
    timeChangePositiveColor = document.getElementById("timePlusColor").value;
    noTimeChangeColor = document.getElementById("timeStaysColor").value;
    timeChangeNegativeColor = document.getElementById("timeMinusColor").value;
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
            document.getElementById("tooFewWords").hidden = true;
        } else if (wordLength === 6) {
            rightGuessString = SIXLETTERWORDS[Math.floor(Math.random() * SIXLETTERWORDS.length)]
            document.getElementById("tooFewWords").hidden = false;
        } else if (wordLength === 7) {
            rightGuessString = SEVENLETTERWORDS[Math.floor(Math.random() * SEVENLETTERWORDS.length)]
            document.getElementById("tooFewWords").hidden = true;
        } else if (wordLength === 8) {
            rightGuessString = EIGHTLETTERWORDS[Math.floor(Math.random() * EIGHTLETTERWORDS.length)]
            document.getElementById("tooFewWords").hidden = true;
        } else if (wordLength === 3) {
            rightGuessString = THREELETTERWORDS[Math.floor(Math.random() * THREELETTERWORDS.length)]
            document.getElementById("tooFewWords").hidden = false;
        } else if (wordLength === 4) {
            rightGuessString = FOURLETTERWORDS[Math.floor(Math.random() * FOURLETTERWORDS.length)]
            document.getElementById("tooFewWords").hidden = true;
        } else if (wordLength === 9) {
            rightGuessString = NINELETTERWORDS[Math.floor(Math.random() * NINELETTERWORDS.length)]
            document.getElementById("tooFewWords").hidden = false;
        } else if (wordLength === 10) {
            rightGuessString = TENLETTERWORDS[Math.floor(Math.random() * TENLETTERWORDS.length)]
            document.getElementById("tooFewWords").hidden = false;
        } else if (wordLength === 11) {
            rightGuessString = ELEVENLETTERWORDS[Math.floor(Math.random() * ELEVENLETTERWORDS.length)]
            document.getElementById("tooFewWords").hidden = false;
        } else if (wordLength === 12) {
            rightGuessString = TWELVELETTERWORDS[Math.floor(Math.random() * TWELVELETTERWORDS.length)]
            document.getElementById("tooFewWords").hidden = false;
        } else if (wordLength === 13) {
            rightGuessString = THIRTEENLETTERWORDS[Math.floor(Math.random() * THIRTEENLETTERWORDS.length)]
            document.getElementById("tooFewWords").hidden = true;
        } else if (wordLength === 14) {
            rightGuessString = FOURTEENLETTERWORDS[Math.floor(Math.random() * FOURTEENLETTERWORDS.length)]
            document.getElementById("tooFewWords").hidden = true;
        } else if (wordLength === 15) {
            rightGuessString = FIFTEENLETTERWORDS[Math.floor(Math.random() * FIFTEENLETTERWORDS.length)]
            document.getElementById("tooFewWords").hidden = false;
        } else if (wordLength === 16) {
            rightGuessString = SIXTEENLETTERWORDS[Math.floor(Math.random() * SIXTEENLETTERWORDS.length)]
            document.getElementById("tooFewWords").hidden = false;
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
        startTimers();
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
        document.getElementById("tooFewWords").hidden = true;
    } else if (wordLength === 6) {
        rightGuessString = SIXLETTERWORDS[Math.floor(Math.random() * SIXLETTERWORDS.length)]
        document.getElementById("tooFewWords").hidden = false;
    } else if (wordLength === 7) {
        rightGuessString = SEVENLETTERWORDS[Math.floor(Math.random() * SEVENLETTERWORDS.length)]
        document.getElementById("tooFewWords").hidden = true;
    } else if (wordLength === 8) {
        rightGuessString = EIGHTLETTERWORDS[Math.floor(Math.random() * EIGHTLETTERWORDS.length)]
        document.getElementById("tooFewWords").hidden = true;
    } else if (wordLength === 3) {
        rightGuessString = THREELETTERWORDS[Math.floor(Math.random() * THREELETTERWORDS.length)]
        document.getElementById("tooFewWords").hidden = false;
    } else if (wordLength === 4) {
        rightGuessString = FOURLETTERWORDS[Math.floor(Math.random() * FOURLETTERWORDS.length)]
        document.getElementById("tooFewWords").hidden = true;
    } else if (wordLength === 9) {
        rightGuessString = NINELETTERWORDS[Math.floor(Math.random() * NINELETTERWORDS.length)]
        document.getElementById("tooFewWords").hidden = false;
    } else if (wordLength === 10) {
        rightGuessString = TENLETTERWORDS[Math.floor(Math.random() * TENLETTERWORDS.length)]
        document.getElementById("tooFewWords").hidden = false;
    } else if (wordLength === 11) {
        rightGuessString = ELEVENLETTERWORDS[Math.floor(Math.random() * ELEVENLETTERWORDS.length)]
        document.getElementById("tooFewWords").hidden = false;
    } else if (wordLength === 12) {
        rightGuessString = TWELVELETTERWORDS[Math.floor(Math.random() * TWELVELETTERWORDS.length)]
        document.getElementById("tooFewWords").hidden = false;
    } else if (wordLength === 13) {
        rightGuessString = THIRTEENLETTERWORDS[Math.floor(Math.random() * THIRTEENLETTERWORDS.length)]
        document.getElementById("tooFewWords").hidden = true;
    } else if (wordLength === 14) {
        rightGuessString = FOURTEENLETTERWORDS[Math.floor(Math.random() * FOURTEENLETTERWORDS.length)]
        document.getElementById("tooFewWords").hidden = true;
    } else if (wordLength === 15) {
        rightGuessString = FIFTEENLETTERWORDS[Math.floor(Math.random() * FIFTEENLETTERWORDS.length)]
        document.getElementById("tooFewWords").hidden = false;
    } else if (wordLength === 16) {
        rightGuessString = SIXTEENLETTERWORDS[Math.floor(Math.random() * SIXTEENLETTERWORDS.length)]
        document.getElementById("tooFewWords").hidden = false;
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
    startTimers();
    document.getElementById("error").innerHTML = "";
}

document.querySelector("#cancelMainTimer").addEventListener("click", () => {cancel2 = true});
document.querySelector("#cancelPer-GuessTimer").addEventListener("click", () => {cancel3 = true;})
document.querySelector("#startTimer").addEventListener("click", () => startTimers());
document.querySelector("#startTimer2").addEventListener("click", () => startTimers());
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

function startTimers() {
    document.getElementById("change").innerHTML = "";
    restart();
    if (document.getElementById("enableMainTimer").checked && !mainTimerRunning) {
        startMainTimer();
        mainTimerRunning = true;
    }
    if (document.getElementById("enablePer-GuessTimer").checked && !guessTimerRunning) {
        startPerGuessTimer();
        guessTimerRunning = true;
    }
}

function startMainTimer() {

    cancel2 = false;
    totalMinutesLeft = Number(document.getElementById("mainTimeLimitMinutes").value);
    totalSecondsLeft = Number(document.getElementById("mainTimeLimitSeconds").value);
    var warningTime = Number(document.getElementById("warningAtSeconds").value);
    greenTimeBonus = document.getElementById("mainTimeBonusGreen").value;
    yellowTimeBonus = document.getElementById("mainTimeBonusYellow").value;
    greyTimePenalty = document.getElementById("mainTimePenaltyGrey").value;
    if (totalMinutesLeft < 0) {totalMinutesLeft = 0}
    if (totalSecondsLeft < 0) {totalSecondsLeft = 0}
    if (totalSecondsLeft > 59) {totalSecondsLeft = 59}
    if (warningTime < 1) {warningTime = 1}
    if (warningTime > 59) {warningTime = 59}
    if (greenTimeBonus < 0) {greenTimeBonus = 0}
    if (yellowTimeBonus < 0) {yellowTimeBonus = 0}
    if (greyTimePenalty < 0) {greyTimePenalty = 0}
    var totalSecondsLeftDisplay = totalSecondsLeft;
    if (totalSecondsLeft < 10) {
        totalSecondsLeftDisplay = "0" + totalSecondsLeft;
    } else {
        totalSecondsLeftDisplay = totalSecondsLeft;
    }
    document.getElementById("mainTimerDisplay").style.color = document.getElementById("letterColor").value;
    document.getElementById("mainTimer").innerHTML = totalMinutesLeft + ":" + totalSecondsLeftDisplay;
    document.getElementById("mainTimerDisplay").hidden = false;
    var outputWarn = true;

    var timer2 = setInterval(function() {
        if (cancel2) {
            clearInterval(timer2);
            cancel2 = false;
            mainTimerRunning = false;
            if (hideMainTimer) {
                document.getElementById("mainTimerDisplay").hidden = true;
            } else {
                hideMainTimer = true;
                document.getElementById("mainTimerDisplay").style.color = inactiveTimerColor;
            }
        } else {
            if (totalSecondsLeft <= 0 && totalMinutesLeft > 0 && allowReset) {
                totalMinutesLeft -= 1;
                totalSecondsLeft = 60;
            }
            totalSecondsLeft -= 1;
            if (totalSecondsLeft < 10) {
                totalSecondsLeftDisplay = "0" + totalSecondsLeft;
            } else {
                totalSecondsLeftDisplay = totalSecondsLeft;
            }
            if (totalSecondsLeft <= warningTime && totalMinutesLeft <= 0) {
                if (outputWarn) {
                    toastr.warning("Warning! " + totalSecondsLeft + " seconds left!");
                    outputWarn = false;
                }
                document.getElementById("mainTimerDisplay").style.color = timerWarningColor;
            }
            if (totalMinutesLeft <= 0 && totalSecondsLeft <= 0) {
                document.getElementById("mainTimerDisplay").style.color = timerExpiredColor;
                clearInterval(timer2);
                guessesRemaining = 0;
                toastr.error("You ran out of time! Game over!");
                toastr.info(`The right word was: "${rightGuessString}"`)
                mainTimerRunning = false;
                cancel3 = true;
            }
            document.getElementById("mainTimer").innerHTML = totalMinutesLeft + ":" + totalSecondsLeftDisplay;
        }
    }, 1000);
}

function startPerGuessTimer() {

    cancel3 = false;
    timeToGuessMinutes = Number(document.getElementById("per-GuessTimerMinutes").value);
    timeToGuessSeconds = Number(document.getElementById("per-GuessTimerSeconds").value);
    if (timeToGuessMinutes < 0) {timeToGuessMinutes = 0}
    if (timeToGuessSeconds < 0) {timeToGuessSeconds = 0}
    if (timeToGuessSeconds > 59) {timeToGuessSeconds = 59}
    fixTimeToGuessMinutes = timeToGuessMinutes;
    fixTimeToGuessSeconds = timeToGuessSeconds;
    var timeToGuessSecondsDisplay = timeToGuessSeconds;
    if (timeToGuessSeconds < 10) {
        timeToGuessSecondsDisplay = "0" + timeToGuessSeconds;
    } else {
        timeToGuessSecondsDisplay = timeToGuessSeconds;
    }
    document.getElementById("per-GuessTimerDisplay").style.color = document.getElementById("letterColor").value;
    document.getElementById("per-GuessTimer").innerHTML = timeToGuessMinutes + ":" + timeToGuessSecondsDisplay;
    document.getElementById("per-GuessTimerDisplay").hidden = false;

    var timer3 = setInterval(function() {
        if (cancel3) {
            clearInterval(timer3);
            cancel2 = true;
            cancel3 = false;
            guessTimerRunning = false;
            document.getElementById("per-GuessTimerDisplay").hidden = true;
        } else {
            if (timeToGuessSeconds <= 0 && timeToGuessMinutes > 0) {
                timeToGuessMinutes -= 1;
                timeToGuessSeconds = 60;
            }
            timeToGuessSeconds -= 1;
            if (timeToGuessSeconds < 10) {
                timeToGuessSecondsDisplay = "0" + timeToGuessSeconds;
            } else {
                timeToGuessSecondsDisplay = timeToGuessSeconds;
            }
            if (timeToGuessSeconds <= 10 && timeToGuessMinutes <= 0) {
                document.getElementById("per-GuessTimerDisplay").style.color = timerWarningColor;
            }
            if (timeToGuessMinutes <= 0 && timeToGuessSeconds <= 0) {
                document.getElementById("per-GuessTimerDisplay").style.color = timerExpiredColor;
                clearInterval(timer3);
                guessesRemaining = 0;
                toastr.error("You didn't make a guess in time! Game over!");
                toastr.info(`The right word was: "${rightGuessString}"`)
                guessTimerRunning = false;
                hideMainTimer = false;
                cancel2 = true;
            }
            document.getElementById("per-GuessTimer").innerHTML = timeToGuessMinutes + ":" + timeToGuessSecondsDisplay;
        }
    }, 1000);
}

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
    if (pressedKey === "F12" && !document.getElementById("enableLogging").checked) {
        console.log("You might want to tick 'Enable Logging to Console' to have something useful here....");
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

function RGBtoHEX(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter) {
            var rgbOld = elem.style.backgroundColor;
            if (rgbOld === "") {
                var oldColor = greyColor;
            } else {
                var toSend = rgbOld.replaceAll(" ", "");
                toSend = toSend.replaceAll("(", "");
                toSend = toSend.replaceAll(")", "");
                toSend = toSend.replaceAll("r", "");
                toSend = toSend.replaceAll("g", "");
                toSend = toSend.replaceAll("b", "");
                const newArrayfour = toSend.split(",");
                var oldColor = RGBtoHEX(Number(newArrayfour[0]), Number(newArrayfour[1]), Number(newArrayfour[2]));
            }
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

function checkGuess() {

    let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining]
    let guessString = '';
    let rightGuess = Array.from(rightGuessString);

    for (const val of currentGuess) {
        guessString += val;
    }

    if (guessString === rightGuessString) {
        cancel2 = true;
        hideMainTimer = false;
        cancel3 = true;
    }

    if (guessString.length != wordLength) {
        toastr.error("Invalid guess:\nNot enough letters!");
        row.style.backgroundColor = invalidColor;
        setTimeout(() => {
            row.style.backgroundColor = guessingRowColor;
        }, 750)
        return;
    }

    if (!WORDS.includes(guessString) && !SIXLETTERWORDS.includes(guessString) && !SEVENLETTERWORDS.includes(guessString) && !EIGHTLETTERWORDS.includes(guessString) && !THREELETTERWORDS.includes(guessString) && !FOURLETTERWORDS.includes(guessString) && !NINELETTERWORDS.includes(guessString) && !TENLETTERWORDS.includes(guessString) && !ELEVENLETTERWORDS.includes(guessString) && !TWELVELETTERWORDS.includes(guessString) && !THIRTEENLETTERWORDS.includes(guessString) && !FOURTEENLETTERWORDS.includes(guessString) && !FIFTEENLETTERWORDS.includes(guessString) && !SIXTEENLETTERWORDS.includes(guessString)) {
        toastr.error("Invalid guess:\nWord not in list!");
        row.style.backgroundColor = invalidColor;
        setTimeout(() => {
            row.style.backgroundColor = guessingRowColor;
        }, 750)
        return;
    }

    timeToGuessMinutes = fixTimeToGuessMinutes;
    timeToGuessSeconds = fixTimeToGuessSeconds;
    var timeToGuessSecondsDisplay = timeToGuessSeconds;
    if (timeToGuessSeconds < 10) {
        timeToGuessSecondsDisplay = "0" + timeToGuessSeconds;
    } else {
        timeToGuessSecondsDisplay = timeToGuessSeconds;
    }
    document.getElementById("per-GuessTimer").innerHTML = timeToGuessMinutes + ":" + timeToGuessSecondsDisplay;

    if (document.getElementById("enableLogging").checked) {
        console.log("---------------- NEW GUESS ----------------");
        console.log("Answer: " + rightGuessString);
    }
    let yellowsLeft = rightGuess;
    entireGuessTimeChange = 0;

    for (let i = 0; i < wordLength; i++) {
        if (document.getElementById("enableLogging").checked) {
            console.log("----");
            console.log("Inspecting letter '" + currentGuess[i] + "' of " + currentGuess);
        }
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
                if (lettersToBeFound.includes(currentGuess[i]) && mainTimerRunning) {
                    timeChange += Number(greenTimeBonus);
                }
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
                    var existCount = 0;
                    if (currentGuessedLetterCount > 1 && currentGuessedLetterCount > letterCount) {
                        for (let p = i; p - 1 <= wordLength - i; p++) {
                            let temp = i + p - 2;
                            if (temp > 0) {
                                if (currentGuess[temp] == rightGuess[temp] && currentGuess[temp] == currentGuess[i]) {
                                    existCount += 1;
                                }
                            }
                        }
                        if (existCount >= letterCount) {
                            letterColor = greyColor;
                        }
                        if (document.getElementById("enableLogging").checked) {
                            console.log("This letter exists " + existCount + " times forward in the guess in the correct place, and " + letterCount + " times in the answer.")
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

        if (document.getElementById("enableLogging").checked) {
            console.log("currectGuessedLetterCount: " + currentGuessedLetterCount);
            console.log("LetterCount: " + letterCount);
            console.log("Right letter: " + rightGuess[i]);
            console.log("yellowsLeft: " + yellowsLeft);
            console.log("LettersToBeFound: " + lettersToBeFound);
            console.log("IndexesToBeFound: " + indexesToBeFound);
            console.log("===> letterColor: " + letterColor);
        }

        if (mainTimerRunning) {
            if (letterColor === yellowColor) {
                timeChange += Number(yellowTimeBonus);
            }
            if (letterColor === greyColor) {
                timeChange -= Number(greyTimePenalty);
            }
            if (document.getElementById("enableLogging").checked) {
                console.log("totalSecondsLeft Before: " + totalSecondsLeft);
                console.log("Overall timeChange: " + timeChange);
            }
            allowReset = false;
            totalSecondsLeft += timeChange;
            entireGuessTimeChange += timeChange;
            timeChange = 0;
            if (document.getElementById("enableLogging").checked) {
                console.log("totalSecondsLeft After: " + totalSecondsLeft);
            }
            if (totalSecondsLeft > 59) {
                while (totalSecondsLeft > 59) {
                    totalMinutesLeft += 1;
                    totalSecondsLeft -= 60;
                }
            }
            if (totalSecondsLeft < 0 && totalMinutesLeft > 0) {
                while (totalSecondsLeft < 0 && totalMinutesLeft > 0) {
                    totalSecondsLeft += 60;
                    totalMinutesLeft -= 1;
                }
            }
            if (totalSecondsLeft <= 0 && totalMinutesLeft <= 0) {
                totalSecondsLeft = 1;
                totalMinutesLeft = 0;
            }
            allowReset = true;
        }


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

    if (mainTimerRunning) {
        var a = document.getElementById("change");
        if (entireGuessTimeChange > 0) {
            a.style.color = timeChangePositiveColor;
            a.innerHTML = "+" + entireGuessTimeChange + "s";
        }
        if (entireGuessTimeChange === 0) {
            a.style.color = noTimeChangeColor;
            a.innerHTML = "0";
        }
        if (entireGuessTimeChange < 0) {
            a.style.color = timeChangeNegativeColor;
            a.innerHTML = entireGuessTimeChange + "s";
        }
    }

    if (guessString === rightGuessString) {
        kept = guessesRemaining;
        row.style.backgroundColor = 'rgba(0, 0, 0, 10%)';
        guessesRemaining = 0;
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
        if (guessesRemaining > 0) {
            let temp = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining];
            temp.style.backgroundColor = guessingRowColor;
        }

        if (guessesRemaining <= 0) {
            toastr.error("You've run out of guesses! Game over!");
            toastr.info(`The right word was: "${rightGuessString}"`);
        }
    }
}

function delay(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

async function fireWorks() {
    var nthChild = 1;
    for (const elem of document.getElementsByClassName("firework")) {
        if (nthChild !== 3) {
            elem.hidden = false;
            elem.style.animation = "firework 2.5s infinite";
            await delay(400);
        }
        nthChild += 1;
    }
    setTimeout(() => {
        hideFireWorks();
    }, 3499)
}

async function hideFireWorks() {
    var nthChild = 1;
    for (const elem of document.getElementsByClassName("firework")) {
        if (nthChild !== 3) {
            elem.hidden = true;
            elem.style.animation = "none";
            await delay(400);
        }
        nthChild += 1;
    }
}

async function correctGuessBounce() {
    await delay((200 * wordLength) - (wordLength * 3));
    let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - kept];
    for (let i = 0; i < wordLength; i++) {
        let box = row.children[i];
        await delay(100);
        animateCSS(box, 'bounce', '1.0s');
    }
    toastr.success("You guessed right! Game over!")
    onCooldown = false;
    await delay(1000);
    fireWorks();
}

document.getElementById("error").innerHTML = "";

document.addEventListener("keyup", (e) => {

    if (guessesRemaining === 0) {
        return
    }

    let pressedKey = String(e.key)
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter();
        return;
    }

    if (pressedKey === "Enter") {
        if (guessesRemaining > 0) {
            checkGuess();
        }
        return;
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return;
    } else {
        insertLetter(pressedKey);
    }
})

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target;
    
    if (!target.classList.contains("keyboard-button")) {
        return;
    }
    let key = target.textContent;

    if (key === "Del") {
        key = "Backspace";
    } 

    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}));
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
            }, 350 * wordLength + 3500);
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
        document.getElementById("tooFewWords").hidden = true;
    } else if (wordLength === 6) {
        rightGuessString = SIXLETTERWORDS[Math.floor(Math.random() * SIXLETTERWORDS.length)]
        document.getElementById("tooFewWords").hidden = false;
    } else if (wordLength === 7) {
        rightGuessString = SEVENLETTERWORDS[Math.floor(Math.random() * SEVENLETTERWORDS.length)]
        document.getElementById("tooFewWords").hidden = true;
    } else if (wordLength === 8) {
        rightGuessString = EIGHTLETTERWORDS[Math.floor(Math.random() * EIGHTLETTERWORDS.length)]
        document.getElementById("tooFewWords").hidden = true;
    } else if (wordLength === 3) {
        rightGuessString = THREELETTERWORDS[Math.floor(Math.random() * THREELETTERWORDS.length)]
        document.getElementById("tooFewWords").hidden = false;
    } else if (wordLength === 4) {
        rightGuessString = FOURLETTERWORDS[Math.floor(Math.random() * FOURLETTERWORDS.length)]
        document.getElementById("tooFewWords").hidden = true;
    } else if (wordLength === 9) {
        rightGuessString = NINELETTERWORDS[Math.floor(Math.random() * NINELETTERWORDS.length)]
        document.getElementById("tooFewWords").hidden = false;
    } else if (wordLength === 10) {
        rightGuessString = TENLETTERWORDS[Math.floor(Math.random() * TENLETTERWORDS.length)]
        document.getElementById("tooFewWords").hidden = false;
    } else if (wordLength === 11) {
        rightGuessString = ELEVENLETTERWORDS[Math.floor(Math.random() * ELEVENLETTERWORDS.length)]
        document.getElementById("tooFewWords").hidden = false;
    } else if (wordLength === 12) {
        rightGuessString = TWELVELETTERWORDS[Math.floor(Math.random() * TWELVELETTERWORDS.length)]
        document.getElementById("tooFewWords").hidden = false;
    } else if (wordLength === 13) {
        rightGuessString = THIRTEENLETTERWORDS[Math.floor(Math.random() * THIRTEENLETTERWORDS.length)]
        document.getElementById("tooFewWords").hidden = true;
    } else if (wordLength === 14) {
        rightGuessString = FOURTEENLETTERWORDS[Math.floor(Math.random() * FOURTEENLETTERWORDS.length)]
        document.getElementById("tooFewWords").hidden = true;
    } else if (wordLength === 15) {
        rightGuessString = FIFTEENLETTERWORDS[Math.floor(Math.random() * FIFTEENLETTERWORDS.length)]
        document.getElementById("tooFewWords").hidden = false;
    } else if (wordLength === 16) {
        rightGuessString = SIXTEENLETTERWORDS[Math.floor(Math.random() * SIXTEENLETTERWORDS.length)]
        document.getElementById("tooFewWords").hidden = false;
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
    startTimers();
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
