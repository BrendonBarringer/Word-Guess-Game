//variable list
var lives = 5;
var wins = 0;
var loses = 0;
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var words = ['halo', 'residentevil', 'legendofzelda', 'tetris', 'pacman', 'finalfantasy', 'halflife', 'worldofwarcraft', 'doom', 'streetfighter', 'donkeykong', 'mortalkombat', 'supermariobros', 'minecraft', 'sonicthehedgehog', 'pokemon', 'supersmashbros', 'darksouls']
var answer = '';
var hiddenAnswer = [''];
var guesses = [''];
var letters = [''];
var correctLetters = [''];
var img = ['images/halo.jpg', 'images/relogo.jpg', 'images/loz.jpg', 'images/tetris.jpg', 'images/pacman.jpg', 'images/ff.jpg', 'images/half-life-logo.jpg', 'images/wow.jpg', 'images/doom.jpg', 'images/streetfighter.jpg', 'images/donkeykong.jpg', 'images/mortalkombat.jpg', 'images/supermariobros.jpg', 'images/mincraft.jpg', 'images/sonic.jpg', 'images/pokemon.jpg', 'images/smash.jpg', 'images/darksouls.jpg'];

//Generates a random word function then splits into single letters.
function randomWord() {
    lives = 5;
    guesses = [''];
    hiddenAnswer = [''];
    answer = words[Math.floor(Math.random() * words.length)];
    letters = answer.split('');
}
randomWord();
// WIP: Display logo that applies to the randomWord generated. 
//need a way to store which index location is 
//used and to then use the same index location but with the img array 
function Displaylogo() {
    var img = document.getElementById('logo').getElementsByTagName('img')[''];
    console.log(img);
}

//hides word with '_' function
function hideWord() {
    for (let i = 0; i < letters.length; i++) {
        hiddenAnswer[i] = '_';
    }
    document.getElementById('currentWord').innerHTML = hiddenAnswer.join(' ');
}
hideWord();
//var hidden = answer.replace(/[a-z], '_ ');
//On key event function.
document.onkeyup = function (event) {
    var userGuess = event.key;
    //Function to check input and swap letter
    function checkKey() {
        for (let i = 0; i < letters.length; i++) {
            if (letters[i] === userGuess) {
                hiddenAnswer[i] = userGuess;
            }
        }
        document.getElementById('currentWord').innerHTML = hiddenAnswer.join(' ');
    }
    //life remover
    function removeLife() {
        for (let i = 0; i < letters.length; i++) {
            if (letters[i] === userGuess) {
                return false;
            }
        }
        return true;
    }
    //Win condition!
    function didiWin() {
        for (var i = 0; i < hiddenAnswer.length; i++) {
            if (hiddenAnswer[i] === '_') {
                return false;
            }
        }
        return true;
    }
    //if same letter is chosen
    for (let i = 0; i < guesses.length; i++) {
        if (guesses[i] === userGuess) {
            return; //kills the function.
        }
    }
    //checks if input is part of alphabet, will only run if input is valid.
    for (var i = 0; i < alphabet.length; i++) {
        if (alphabet[i] === userGuess) {
            //if letter does not match   
            removeLife();
            if (removeLife() === true) {
                lives--;
            }
            //if guess matches a letter in word
            checkKey();
            //pushes already used letters into an array to track lives, reset game when out of lives.
            guesses.push(userGuess)
            if (lives === 0) {
                loses++;
                var targetDiv = document.getElementById("lastWord");
                targetDiv.textContent = 'Previous Word: ' + answer;
                randomWord();
                hideWord();
            }
        }
    }
    didiWin();
    if (didiWin() === true) {
        wins++;
        var targetDiv = document.getElementById("lastWord");
        targetDiv.textContent = 'Previous Word: ' + answer;
        randomWord();
        hideWord();
    }
    console.log(letters);
    console.log(hiddenAnswer);
    console.log(answer);

    document.getElementById("yourGuesses").innerHTML = guesses.join(' ');
    document.getElementById("yourLoses").innerHTML = loses;
    document.getElementById("yourWins").innerHTML = wins;
    document.getElementById("yourLives").innerHTML = lives;
}