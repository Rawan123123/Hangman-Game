//letters
const letters = 'abcdefghijklmnopqrstuvwxyz';

//get array from letters
let lettersArray = Array.from(letters);

//select leetrs container
let lettrsContainer = document.querySelector('.letters');

//generate letters
lettersArray.forEach(letter => {

    //create span
    let span = document.createElement('span');

    //create letter text node
    let theLetter = document.createTextNode(letter);

    //append the letter to span
    span.appendChild(theLetter);

    span.className = 'letter-box';

    //append span to the letter container
    lettrsContainer.appendChild(span);
})

const words ={
    programming: ['php' , 'javascript' , 'go' , 'scala' , 'fortran' , 'r' , 'mysql' , 'python'],
    movies: ['Prestige' , 'Inception' , 'world robot' , 'Intersteller' , 'whiplash' , 'Memento' , 'Coco' , 'Up'],
    people: ['Albert Einshtein' , 'Ronaldo' , 'Alexander' , 'Cleopatrea' , 'Mahatma Ghandy'],
    countries: ['Syria' , 'Palestien' , 'Yemen' , 'Egypt' , 'Bahrain' , 'Qater']
}

//get random property
let allKeys = Object.keys(words);

let randomPropNumber = Math.floor(Math.random() * allKeys.length);

//category
let randomPropName = allKeys[randomPropNumber];

//category words
let randomPropValue = words[randomPropName];

let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

//chosen word
let randomvalueValue = randomPropValue[randomValueNumber];

//set category info
document.querySelector('.game-info span').innerHTML = randomPropName;

//////////////////////////////
//create letters guess spans
let newWord = '';

let lettersGuessContainer = document.querySelector('.letters-guess')

let lettersAndSpace = Array.from(randomvalueValue);

// create span depend on letter
lettersAndSpace.forEach(letter =>{

    //create empty span
    let emptySpan = document.createElement('span');

    //if letter is space
    if(letter === ' '){
        emptySpan.className = 'with-space';
        newWord= newWord + ' ';
    }
    //append span to the letters guess container
    lettersGuessContainer.appendChild(emptySpan);
})

console.log(randomvalueValue);
////////////////////////////////

// select guess span
let guessSpan = document.querySelectorAll('.letters-guess span');

//set wrong attempts
let wrongAttempts = 0;

//select the draw element
let theDraw = document.querySelector('.hangman-draw');

//handle clicking on letter
let newWordArr;
document.addEventListener('click' , (e)=>{

    let theStatus = false;
    if(e.target.className === 'letter-box'){

        e.target.classList.add('clicked');

        //get clicked letter
        let theClickedLetter = e.target.innerHTML.toLowerCase();

        let theChosenWord = Array.from(randomvalueValue.toLowerCase());

        theChosenWord.forEach((wordLetter , wordIndex) => {

            if(theClickedLetter == wordLetter){

                theStatus= true; 

                //loop on all guess spans
                guessSpan.forEach((span , spanIndex) => {
                    if(wordIndex === spanIndex){
                        span.innerHTML = theClickedLetter;
                    }
                })
                newWord = newWord + wordLetter;
                newWordArr = Array.from(newWord);
            }
        })
        // if letter is wrong
        if(theStatus !== true){
            wrongAttempts++;

            //add wrong on draw elemnt
            theDraw.classList.add(`wrong-${wrongAttempts}`);

            //play fail sound
            document.getElementById('fail').play();

            if(wrongAttempts == 8){
                endGame();
                lettrsContainer.classList.add('finished')
            }
        }
        else{
            //play success sound
            document.getElementById('success').play();

            if(newWordArr.length === theChosenWord.length){
                success();
                lettrsContainer.classList.add('finished')
            }
        }
    }
})
function endGame(){
    let div = document.createElement('div');

    let popspan = document.createElement('span');
    popspan.style.color = '#E91E63';
    popspan.textContent = `${randomvalueValue}`;

    let divText = document.createTextNode(`Game Over, The Word Is `);

    div.append(divText, popspan);
    div.className = 'popup';

    document.body.appendChild(div); 
}

function success(){
    let div = document.createElement('div');

    let popspan = document.createElement('span');
    popspan.style.color = '#E91E63';
    popspan.textContent = `${wrongAttempts} wrong`;

    let divText = document.createTextNode(`Great! You Have `);
    let h = document.createElement('h4');
        if(wrongAttempts <= 4){
            h.textContent= 'You Are Excllent'; 
        }
        else{
            h.textContent='You Are Good';
        }

    div.append(divText, popspan ,h);
    div.className = 'popup';

    document.body.appendChild(div); 

}