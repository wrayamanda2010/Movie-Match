$(document).ready(function(){

//API call to get poster images from OMBD

  let disney = ['frozen', 'moana', 'mulan', 'aladdin', 'bambi', 'beauty-and-the-beast', 'lion-king', 'hercules']
  let sciFi = ['avatar', 'looper', 'inception', 'the-matrix', 'jurassic-park', 'back-to-the-future', 'minority-report', 'donnie-darko']
  let horror = ['the-shining', 'the-conjuring', 'it', 'halloween', 'psycho', 'a-nightmare-on-elm-street', 'scream', 'jaws']
  let harryPotter = ['harry-potter-and-the-Sorcerer\'s-stone', 'harry-potter-and-the-chamber-of-secrets', 'harry-potter-and-the-prisoner-of-Azkaban', 'harry-potter-and-the-goblet-of-fire', 'harry-potter-and-the-order-of-the-phoenix', 'harry-potter-and-the-half-blood-prince', 'harry-potter-and-the-deathly-hallows-part-1', 'harry-potter-and-the-deathly-hallows-part-2']
  let comedy = ['super-bad', 'old-school', 'the-hangover', 'american-pie', 'bridesmaids', 'monty-python-and-the-holy-grail', 'grandms\'s-boy', 'clueless']
  let comics = ['deadpool', 'guardians-of-the-galaxy', 'avengers', 'hellboy', 'blade', 'kick-ass', 'the-crow', 'suicide-squad']


  for(var i = 0; i < disney.length; i++){
    (function(i) {
      $.getJSON('http://www.omdbapi.com/?apikey=966e7722&t=' + disney[i],
        (data) => {
          updateCard(i, data["Poster"],disney[i])
          updateCard(i, data["Poster"],disney[i])
        })
    })(i)
  }


  function updateCard(increment, url, array){

    $("#card-deck").append(`<li class="card" type=${array}> <img class="hidden" src="${url}"></li>`)

  }
  let lowestScore = 50;
  localStorage.setItem("highScore", JSON.stringify(lowestScore))
})
setTimeout(function(){

// cards array holds all cards
let card = $('.card');
let cards = [...card]


// deck of all cards in game
const deck = $(".deck");

// declaring move variable
let moves = 0;
let counter = document.querySelector(".moves");

// declare variables for star icons
const stars = document.querySelectorAll(".fa-star");

// declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

 // stars list
 let starsList = document.querySelectorAll(".stars li");

 // close icon in modal
 let closeicon = document.querySelector(".close");

 // declare modal
 let modal = document.getElementById("popup1");

 //declare restart
let restart = document.getElementById("restart");

//delare playagain button on modal
let playAgainButton = document.getElementById("play-again");

 // array for opened cards
var openedCards = [];


// @description shuffles cards
// @param {array}
// @returns shuffledarray
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};


// @description shuffles cards when page is refreshed / loads
document.body.onload = startGame();


// @description function to start a new play
function startGame(){
    // shuffle deck
    cards = shuffle(cards);
    // remove all exisiting classes from each card
    for (var i = 0; i < cards.length; i++){
      let image = $(cards[i]).children()[0]

        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.append(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
        image.classList.add("hidden")
      }
    // reset moves
    moves = 0;
    counter.innerHTML = moves;
    // reset rating
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    //reset timer
    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}


// @description toggles open and show class to display cards
var displayCard = function (){
  let image = $(this).children()[0]
    image.classList.toggle("hidden")
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


// @description add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if(len === 2){
        moveCounter();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};


// @description when cards match
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}


// description when cards don't match
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        let image = $(openedCards[0]).children()[0]
          image.classList.toggle("hidden")
          image = $(openedCards[1]).children()[0]
          image.classList.toggle("hidden")
        enable();
        openedCards = [];
    },1100);
}


// @description disable cards temporarily
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}


// @description enable cards and disable matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}


// @description count player's moves
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if(moves == 1){
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
    // setting rates based on moves
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}


// @description game timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}


// @description congratulations when all cards match, show modal and moves, time and rating
function congratulations(){
    if (matchedCard.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // show congratulations modal
        modal.classList.add("show");

        // declare star rating variable
        var starRating = document.querySelector(".stars").innerHTML;

        //showing move, rating, time on modal
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        if(moves < getHighScore()){
          highScore(moves)
          alert("New High Score")
        }
        //closeicon on modal
        closeModal();
    };
}


// @description close icon on modal
function closeModal(){
    closeicon.addEventListener("click", function(e){
        e.preventDefault();
        modal.classList.remove("show");
        startGame();
    });
    playAgainButton.addEventListener("click", function(e){
      e.preventDefault();
        modal.classList.remove("show");
        startGame();
    });
}



// @desciption for user to play Again

function playAgain(){
    modal.classList.remove("show");
    startGame();
}

function highScore(score){
    localStorage.setItem("highScore", JSON.stringify(score))
}

function getHighScore(){
  return JSON.parse(localStorage.getItem("highScore"))
}
// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",congratulations);
};


}, 200)
