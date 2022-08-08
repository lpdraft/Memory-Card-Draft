const cards = document.querySelectorAll(".cards-memory");

//Store cards
/* Pues cundo alguien clickea una carta tenemos que saber si ha clickeado a la primera o la segunda carta*/
/* De esta forma podemos programar la lógica del MATCH*/

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
  if (lockBoard) return;
  //Double check
  if (this === firstCard) return;
  console.log(this);
  // console.log("card flipping");
  // this.classList.toggle("flip"); //Just to show adding and removing .flip class
  this.classList.add("flip");
  if (!hasFlippedCard) {
    //**First Card**//
    // El condicional es distinto
    hasFlippedCard = true;
    //Asignas como la primera carta cuando es volteado
    firstCard = this;
  } else {
    // Segunda carta
    // Por defecto es false, ya que aun no se volteo, una vez que se voltea, es true, por lo tanto ya estamos clikeando en otra carta
    hasFlippedCard = false;
    secondCard = this;

    // Una vez que tenemos dos carta hay que a veriguar si son iguales o Match
    console.log(firstCard.dataset.card);
    console.log(secondCard.dataset.card);
    checkMatch();
  }
}
function checkMatch() {
  //If cards match, prevent eddeventlistener to being flipped
  if (firstCard.dataset.cardd === secondCard.dataset.cardd) {
    disabledCards();
  } else {
    unflippedCards();
  }
  // Ternary Operator
  /*
  let isMatch = firstCard.dataset.cardd === secondCard.dataset.cardd;
  isMatch ? disabledCards() : unflippedCards();
  */
}
function disabledCards() {
  //Its match
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  console.log("Its match!!!");
}

function unflippedCards() {
  lockBoard = true;
  //Not Match
  //Quitar la clase flip
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    console.log("Not match!!!");
    lockBoard = false;
  }, 1500);
}

//Select Card
cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
