//variable list
var lives = 5;
var wins = 0;
var loses = 0;
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var gameList = ['halo', 'residentevil', 'legendofzelda', 'tetris', 'pacman', 'finalfantasy', 'halflife', 'worldofwarcraft', 'doom', 'streetfighter', 'donkeykong', 'mortalkombat', 'supermariobros', 'minecraft', 'sonicthehedgehog', 'pokemon', 'supersmashbros', 'darksouls']
var answer = '';
var hiddenAnswer = [''];
var guesses = [''];
var letters = [''];
var correctLetters = [''];
var randNum
var hint = [{
    pic: 'assets/images/halo.jpg',
    audio: 'assets/audio/halo.mp3',
    quote: 'I need a weapon',
},
{
    pic: 'assets/images/relogo.jpg',
    audio: '',
    quote:'Seven minutes, Seven minutes is all I can spare to play with you',
},
{
    pic: 'assets/images/loz.jpg',
    audio: '',
    quote: 'It\'s dangerous to go alone, take this.',
},
{
    pic: 'assets/images/tetris.jpg',
    audio:'',
    quote:'organizing blocks',
},
{
    pic: 'assets/images/pacman.jpg',
    audio:'',
    quote:'He\'s got a round face',
}, {
    pic: 'assets/images/ff.jpg',
    audio:'',
    quote:'The final ditch effort of a company',
},
{
    pic: 'assets/images/half-life-logo.jpg',
    audio:'',
    quote:'The right man in the wrong place can make all the difference in the world',
},
{
    pic: 'assets/images/wow.jpg',
    audio:'',
    quote:'Biggest MMORPG',
},
{
    pic: 'assets/images/doom.jpg',
    audio:'',
    quote:'One of the first and Most influential FPS of it\'s time',
},
{
    pic: 'assets/images/streetfighter.jpg',
    audio:'',
    quote:'The combo-system in this fighting game was originally a bug',
},
{
    pic: 'assets/images/donkeykong.jpg',
    audio:'',
    quote:'first game to tell a story using cut scenes',
}, {
    pic: 'assets/images/mortalkombat.jpg',
    audio:'',
    quote:'The ESRB Rating was created because of this game',
}, {
    pic: 'assets/images/supermariobros.jpg',
    audio:'',
    quote:'The hero was in the original Donkey Kong',
}, {
    pic: 'assets/images/mincraft.jpg',
    audio:'',
    quote:'Virtual Legos',
}, {
    pic: 'assets/images/sonic.jpg',
    audio:'',
    quote:'Gotta go fast',
}, {
    pic: 'assets/images/pokemon.jpg',
    audio:'',
    quote:'animal on animal violence',
}, {
    pic: 'assets/images/smash.jpg',
    audio:'',
    quote:'Nintendo characters fighting',
}, {
    pic: 'assets/images/darksouls.jpg',
    audio:'',
    quote:'Known as one of the most difficult franchises',
}
];

//Generates a random word function then splits into single letters.
function randomWord() {
    lives = 5;
    guesses = [''];
    hiddenAnswer = [''];
    randNum = Math.floor(Math.random() * gameList.length);
    answer = gameList[randNum];
    letters = answer.split('');
    document.getElementById('logo').src = hint[randNum].pic;
    document.getElementById('hint').innerHTML = `Hint: ${hint[randNum].quote}`
}

//Possible Solution: Take string from answer and compare to words[Index] until true and return Index
//then use img[Index] to output corresponding image
randomWord();
// WIP: Display logo that applies to the randomWord generated. 
//need a way to store which index location is 
//used and to then use the same index location but with the img array 
//hides word with '_'
function hideWord() {
    for (let i = 0; i < letters.length; i++) {
        hiddenAnswer[i] = '_';
    }
    document.getElementById('currentWord').innerHTML = hiddenAnswer.join(' ');
   // document.getElementById('logo').src = hint[randNum].pic;
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
    console.log(randNum);



    document.getElementById("logo").src = "";
    document.getElementById("yourGuesses").innerHTML = guesses.join(' ');
    document.getElementById("yourLoses").innerHTML = loses;
    document.getElementById("yourWins").innerHTML = wins;
    document.getElementById("yourLives").innerHTML = lives;
}