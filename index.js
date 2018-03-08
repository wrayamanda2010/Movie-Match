function updateCard(increment, url, array) {

  $("#card-deck").append(`<li class="card" type=${array}> <img class="hidden" src="${url}"></li>`)

}

$(document).ready(function() {

  let disney = ['frozen', 'moana', 'mulan', 'aladdin', 'bambi', 'beauty-and-the-beast', 'lion-king', 'hercules']
  let sciFi = ['avatar', 'looper', 'inception', 'the-matrix', 'jurassic-park', 'back-to-the-future', 'minority-report', 'donnie-darko']
  let horror = ['the-shining', 'the-conjuring', 'it', 'halloween', 'psycho', 'a-nightmare-on-elm-street', 'scream', 'jaws']
  let harryPotter = ['harry-potter-and-the-Sorcerer\'s-stone', 'harry-potter-and-the-chamber-of-secrets', 'harry-potter-and-the-prisoner-of-Azkaban', 'harry-potter-and-the-goblet-of-fire', 'harry-potter-and-the-order-of-the-phoenix', 'harry-potter-and-the-half-blood-prince', 'harry-potter-and-the-deathly-hallows-part-1', 'harry-potter-and-the-deathly-hallows-part-2']
  let comedy = ['super-bad', 'old-school', 'the-hangover', 'american-pie', 'bridesmaids', 'monty-python-and-the-holy-grail', 'grandms\'s-boy', 'clueless']
  let comics = ['deadpool', 'guardians-of-the-galaxy', 'avengers', 'hellboy', 'blade', 'kick-ass', 'the-crow', 'suicide-squad']


  for (var i = 0; i < disney.length; i++) {
    (function(i) {
      $.getJSON('http://www.omdbapi.com/?apikey=966e7722&t=' + disney[i],
        (data) => {
          updateCard(i, data["Poster"], disney[i])
          updateCard(i, data["Poster"], disney[i])
        })
    })(i)
  }

  let lowestScore = 50;
  localStorage.setItem("highScore", JSON.stringify(lowestScore))
})

function getHighScore() {
  return JSON.parse(localStorage.getItem("highScore"))
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

setTimeout(function() {

  let card = $('.card');
  let cards = [...card]

  const deck = $(".deck");

  let moves = 0;

  let counter = document.querySelector(".moves");

  const stars = document.querySelectorAll(".fa-star");

  let matchedCard = document.getElementsByClassName("match");

  let starsList = document.querySelectorAll(".stars li");

  let closeicon = document.querySelector(".close");

  let modal = document.getElementById("popup1");

  let restart = document.getElementById("restart");

  let playAgainButton = document.getElementById("play-again");

  var openedCards = [];

  document.body.onload = startGame();



  function startGame() {

    cards = shuffle(cards);
    for (var i = 0; i < cards.length; i++) {
      let image = $(cards[i]).children()[0]

      deck.innerHTML = "";
      [].forEach.call(cards, function(item) {
        deck.append(item);
      });
      cards[i].classList.remove("show", "open", "match", "disabled");
      image.classList.add("hidden")
    }

    moves = 0;
    counter.innerHTML = moves;

    for (var i = 0; i < stars.length; i++) {
      stars[i].style.color = "#FFD700";
      stars[i].style.visibility = "visible";
    }

    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
  }


  var displayCard = function() {
    let image = $(this).children()[0]
    image.classList.toggle("hidden")
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
  };

  function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if (len === 2) {
      moveCounter();
      if (openedCards[0].type === openedCards[1].type) {
        matched();
      } else {
        unmatched();
      }
    }
  };


  function matched() {
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
  }


  function unmatched() {
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function() {
      openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
      openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
      let image = $(openedCards[0]).children()[0]
      image.classList.toggle("hidden")
      image = $(openedCards[1]).children()[0]
      image.classList.toggle("hidden")
      enable();
      openedCards = [];
    }, 1100);
  }

  function disable() {
    Array.prototype.filter.call(cards, function(card) {
      card.classList.add('disabled');
    });
  }

  function enable() {
    Array.prototype.filter.call(cards, function(card) {
      card.classList.remove('disabled');
      for (var i = 0; i < matchedCard.length; i++) {
        matchedCard[i].classList.add("disabled");
      }
    });
  }

  function moveCounter() {
    moves++;
    counter.innerHTML = moves;

    if (moves == 1) {
      second = 0;
      minute = 0;
      hour = 0;
      startTimer();
    }
    if (moves > 8 && moves < 12) {
      for (i = 0; i < 3; i++) {
        if (i > 1) {
          stars[i].style.visibility = "collapse";
        }
      }
    } else if (moves > 13) {
      for (i = 0; i < 3; i++) {
        if (i > 0) {
          stars[i].style.visibility = "collapse";
        }
      }
    }
  }

  var second = 0,
    minute = 0;
  hour = 0;
  var timer = document.querySelector(".timer");
  var interval;

  function startTimer() {
    interval = setInterval(function() {
      timer.innerHTML = minute + "mins " + second + "secs";
      second++;
      if (second == 60) {
        minute++;
        second = 0;
      }
      if (minute == 60) {
        hour++;
        minute = 0;
      }
    }, 1000);
  }

  function congratulations() {
    if (matchedCard.length == 16) {
      clearInterval(interval);
      finalTime = timer.innerHTML;

      modal.classList.add("show");

      var starRating = document.querySelector(".stars").innerHTML;

      document.getElementById("finalMove").innerHTML = moves;
      document.getElementById("starRating").innerHTML = starRating;
      document.getElementById("totalTime").innerHTML = finalTime;

      if (moves < getHighScore()) {
        highScore(moves)
        alert("New High Score")
      }
      closeModal();
    };
  }

  function closeModal() {
    closeicon.addEventListener("click", function(e) {
      e.preventDefault();
      modal.classList.remove("show");
      startGame();
    });
    playAgainButton.addEventListener("click", function(e) {
      e.preventDefault();
      modal.classList.remove("show");
      startGame();
    });
  }


  function playAgain() {
    modal.classList.remove("show");
    startGame();
  }

  function highScore(score) {
    localStorage.setItem("highScore", JSON.stringify(score))
  }



  for (var i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click", congratulations);
  };


}, 200)
