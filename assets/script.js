console.log("connected!");

const cards = [
    { name: "Caranthir", src: "./assets/images/caranthir.jpg", id: 1},
    { name: "Ciri", src: "./assets/images/ciri.jpg", id: 2},
    { name: "Eredin", src: "./assets/images/eredin.jpg", id: 3},
    { name: "Geralt", src: "./assets/images/geralt-sword.jpg", id: 4},
    { name: "Triss", src: "./assets/images/triss.jpg", id: 5},
    { name: "Yennifer", src: "./assets/images/yenn1.jpg", id: 6},
    { name: "Caranthir", src: "./assets/images/caranthir.jpg", id: 1},
    { name: "Ciri", src: "./assets/images/ciri.jpg", id: 2},
    { name: "Eredin", src: "./assets/images/eredin.jpg", id: 3},
    { name: "Geralt", src: "./assets/images/geralt-sword.jpg", id: 4},
    { name: "Triss", src: "./assets/images/triss.jpg", id: 5},
    { name: "Yennifer", src: "./assets/images/yenn1.jpg", id: 6}
];

const startBtn = document.querySelector(".start_btn");
const restartBtn = document.querySelector(".restart_btn");
const startBody = document.querySelector("body");
const titleDiv = document.querySelector(".title_div");
const mainDiv = document.querySelector(".main_div");
const winDiv = document.querySelector(".win_div");
const clickBlock = document.querySelector("#clickBlock");
let flippedArr = [];
let matches = 0;

startBtn.addEventListener("click", function() {
    startBody.classList.toggle("start_body");
    titleDiv.remove();
    startGame();
});

restartBtn.addEventListener("click", function() {
    location.reload();
});

function startGame() {
    matches = 0;
    shuffle(cards);
    mainDiv.classList.add("startMainDiv");
    cards.forEach(function(card) {
        var imgSrc = card.src;
        var imgId = card.id;
        // CREATE CONTAINER TO HOLD FRONT & BACK OF EACH CARD
        var cardContainer = document.createElement("div");
        cardContainer.classList.add("card_container");
        // CREATE CARD
        var card = document.createElement("div");
        card.setAttribute("id", imgId);
        card.classList.add("card");
        // CREATE FRONT OF CARD
        var cardFront = document.createElement("div")
        cardFront.setAttribute("id", imgId);
        cardFront.classList.add("card_front");
        // CREATE BACK OF CARD
        var cardBack = document.createElement("div");
        cardBack.setAttribute("id", imgId);
        cardBack.classList.add("card_back");
        // BACK OF CARD IMAGE
        var cardImg = document.createElement("img");
        cardImg.setAttribute("src", imgSrc);
        cardImg.setAttribute("id", imgId);
        cardImg.classList.add("card_img");
        // APPENDING ELEMENTS
        cardBack.appendChild(cardImg);
        card.appendChild(cardBack);
        card.appendChild(cardFront);
        cardContainer.appendChild(card);
        mainDiv.appendChild(cardContainer);
    })
    const flipCard = document.querySelectorAll(".card");
    // LOOPS THROUGH ALL CARDS AND ADDS AN EVENT LISTENER
    for (let i = 0; i < flipCard.length; i++) {
        flipCard[i].addEventListener("click", function() {
            flipCard[i].classList.toggle("rotate");
            flipCard[i].classList.add("noClick");
            flippedArr.push(flipCard[i]);
        
            if(flippedArr.length === 2 && flippedArr[0].id === flippedArr[1].id) {
                clickBlock.style.display = "block";
                // WAITS 1 SECOND AFTER MATCH TO BEGIN ANIMATIONS
                setTimeout(function() {
                    flippedArr[0].classList.add("scale");
                    flippedArr[1].classList.add("scale");
                    flippedArr[0].classList.add("fadeOut");
                    flippedArr[1].classList.add("fadeOut");
                }, 1000)
                // WAITS 2.5 SECONDS AFTER ANIMATIONS BEGIN TO SET DISPLAY TO NONE
                setTimeout(function() {
                    flippedArr[0].classList.add("display");
                    flippedArr[1].classList.add("display");
                    flippedArr = [];
                    clickBlock.style.display = "none";
                }, 2500)
                // ADDS +1 TO MATCHES VARIABLE
                matches++;
            };
            
            if(flippedArr.length === 2 && flippedArr[0].id !== flippedArr[1].id) {
                clickBlock.style.display = "block";
                setTimeout(function() {
                    flippedArr[0].classList.remove("rotate", "noClick");
                    flippedArr[1].classList.remove("rotate", "noClick");
                    flippedArr = [];
                    clickBlock.style.display = "none";
                }, 1000);
            };

            if(matches === 6) {
                console.log("WINNER");
                setTimeout(function() {
                    winDiv.style.display = "block";
                }, 2000)
            }
        });
    }
}

// FUNCTION THAT SHUFFLES THE cards ARRAY
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // WHILE THERE REMAINS ELEMENTS TO SHUFFLE...
    while(0 !== currentIndex) {
        // PICK A REMAINING ELEMENT
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // AND SWAP IT WITH THE CURRENT ELEMENT
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}