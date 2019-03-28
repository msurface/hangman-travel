// set up variables and array for the game
let wins = 0;
let currentGuesses = 10;
let lettersGuessed = [];

// creating an object of words to guess
const wordsToGuess = [
    {words: "Thailand", hint: 'Country in Southeast Asia where the movie "The Beach" was filmed.', image: "assets/images/bigBudda.jpg"},
    {words: "Australia", hint: 'This country is a continent..."Down Under"', image: "assets/images/sydneyOperaHouse.jpg" },
    {words: 'Croatia', hint: 'Kings Landing from Game of Thrones is filmed in this country. There are 1,256 islands here.', image: 'assets/images/croatia.jpeg' },
    {words: 'Spain', hint: 'This country is well known for the food Paella.', image: 'assets/images/barcelona.jpeg' },
    {words: 'Amsterdam', hint: "This city is known for canals, as Anne Frank's home, and The Red Light District.", image: 'assets/images/amsterdam.jpeg' },
    {words: 'Prague', hint: 'Kanye West filmed the Diamonds music video in this city. There local drink 150 liters of beer every year, most in the world per capita.', image: 'assets/images/prague.jpg'},
    {words: 'Vietnam', hint: 'In this country you can get a nice bowl of Pho', image: 'assets/images/vietnam.jpf' },
    {words: 'Colombia', hint: "Shakira's home country. South America's second most populated country.", image: 'assets/images/bogota.jpg'},
    {words: 'Greece', hint: 'The country considered to be the worlds first Democracy. Gyros taste good here, too.', image: 'assets/images/athens.jpg' },
    {words: 'Cuba', hint: '90 miles south of Miami.', image: 'assets/images/cuba.jpg' },
    {words: 'Vancouver', hint: 'A city in Canada known as "Hollywood North".', image: 'assets/images/vancouver.jpg' },
];
// Random word selected variable
let randomWord = [];
let word = [];

// pressing a key to start the game after the window opens
// I need to figure out how to start the game when any key is pushed
function int(e){
    console.log(e.keyCode)
    if (e.keyCode !== 13) {
        return;
    } else {
        word = [];
        // must place this manipulation before start() inorder for it to work.
        document.querySelector('#message').innerHTML = '';
        start();
        // initiating the total number of guesses
        document.querySelector('#guesses-remaning').innerHTML = currentGuesses;
    }
};

// Function to start the game
function start() {
    let placeHint = "";
    let placeImage = "";
    // choosing a word convering it to lower case letters and storing it in a variable
    let randomObject = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)];
    randomWord = randomObject.words;
    console.log('Chosen word: ' + randomWord);

    // adding the dashes into #current-word DOM element
    for (let i = 0; i < randomWord.length; i++) {
        // indexing the length of the word and making the number of letters have a _ replace it
        word[i] = "_";
    }
    console.log(word);
    // changing the innerHTML for #current-word to word
    // using join() to replace the commas with a space
    document.querySelector('#current-word').innerHTML = word.join(' ');
    // add dom elements to img and hints for section 1 below here
    placeHint = randomObject.hint;
    placeImage = randomObject.image;
    document.querySelector('#hint').innerHTML = placeHint;
    // Saving image CSS manipulation into a variable
    const imageCssDom = document.querySelector('#hint-image').style;
    // directing the code to each specific image to place in the DOM from the object.
    imageCssDom.backgroundImage = `url(${placeImage})`;
    // sizing the image
    imageCssDom.height = "300px";
    imageCssDom.width = '400px';
    
};

// I NEED TO MAKE A NEW ARRAY USING MAP()
// The new array will consist of _ and " " where needed
// Print the new array to the DOM

//     console.log(word);
//     // changing the innerHTML for #current-word to word
//     // using join() to replace the commas with a space
//     document.querySelector('#current-word').innerHTML = word.join(' ');
// };

// function to decrease the letters and if lost restarts the game
// clears the choosen word
// clears the letters guessed
function decreaseGusses () {
    currentGuesses--;
    if (currentGuesses === 0) {
        const newHtml = "You lost this round. Press Enter to start the next round!";
        document.querySelector('#message').innerHTML = newHtml;
        word = [];
        lettersGuessed = [];
        currentGuesses = 10;
        start();
    } else {
        return;
    }

};

// function to check if word array is completed and increases wins by 1
function checkWin () {
    // use includes() to see if word contains any _
    let dashCheck = word.includes('_');
    console.log(dashCheck);
    if (dashCheck !== true) {
        wins++;
        console.log(wins);
        // updating the DOM to display a win
        document.querySelector('#wins').innerHTML = wins;
        // giving the user a message to pick a new word
        document.querySelector('#message').innerHTML = "Press enter for a new word!"
        // resetting DOM values after a win.
        document.querySelector('#hint').innerHTML = "";
        document.querySelector('#letters-guessed').innerHTML = "";
        document.querySelector('#hint-image').style.backgroundImage = "";
        document.querySelector('#hint-image').style.height = "";
        document.querySelector('#hint-image').style.width = "";


        increaseWins();
    } else {
        return;
    }
};

// function to win the game & restart automatically
function increaseWins () {
    if (wins === 5) {
        // Letting the user know they won and how to continue playing
        const winHtml = "YOU WON! Guess a letter to continue playing."
        document.querySelector('#message').innerHTML = winHtml;
        word = [];
        lettersGuessed = [];
        currentGuesses = 10;
        wins = 0;
        document.querySelector('#wins').innerHTML = "";
        start();
    } else {
        return;
    };
};

// using an eventListner for the user to pick letters in words
function checkGuesses(event) {
    // storing the usersGuess into a variable to be used in this function
    let userGuess = event.key;
    console.log('Letter the user guessed: ' + userGuess);
    
    // if a non letter is chosen it will stop the function
    if (event.keyCode < 65 || event.keyCode > 90) {
        return;
    // using indexOf to determine if userGuess is in randomWord.
    } else if (randomWord.indexOf(userGuess)!== -1) {
        console.log("index of works");
        console.log('Index of the user guess: '+ randomWord.indexOf(userGuess));

        // for loop to replace all instances of word with correct guesses
        for (var i = 0; i < randomWord.length; i++) {
            if (randomWord[i] === userGuess) {
                // replacing the _ with userGuess at the proper position
                word[i] = userGuess;
            }
        };
        checkWin();

        console.log('Updating word to reflect userGuess: ' + word);
        // updating the DOM to reflect correct guess
        document.querySelector('#current-word').innerHTML = word.join(' ');
    } else {
        // push the guessed letter into LettersGUessed array
        lettersGuessed.push(event.key);
        decreaseGusses();
    }


    // DOM Manipulation adding guessed letters onto the DOM - Don't Delete
    document.querySelector('#letters-guessed').innerHTML = lettersGuessed.join(' ');
    // DOM Manipulation to decrease guesses by
    document.querySelector('#guesses-remaning').innerHTML = currentGuesses;
};

// Event listners for initalizing the game & checking user guesses
window.addEventListener('keydown', int, false);
document.addEventListener('keyup', checkGuesses, false);

// can't get my github pages to work. so adding this comment.