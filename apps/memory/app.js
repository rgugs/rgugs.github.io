// Variables

const cardArray = [
    {
        name: 'bluePles',
        img:'images/bluePles.png'
    },
    {
        name: 'greenPles',
        img:'images/greenPles.png'
    },
    {
        name: 'purplePles',
        img:'images/purplePles.png'
    },
    {
        name: 'halloweenRex',
        img:'images/halloweenRex.png'
    },
    {
        name: 'skateboarderRex',
        img:'images/skateboarderRex.png'
    },
    {
        name: 'tutuRex',
        img:'images/tutuRex.png'
    },
    {
        name: 'bluePles',
        img:'images/bluePles.png'
    },
    {
        name: 'greenPles',
        img:'images/greenPles.png'
    },
    {
        name: 'purplePles',
        img:'images/purplePles.png'
    },
    {
        name: 'halloweenRex',
        img:'images/halloweenRex.png'
    },
    {
        name: 'skateboarderRex',
        img:'images/skateboarderRex.png'
    },
    {
        name: 'tutuRex',
        img:'images/tutuRex.png'
    },
]

const attemptsDisplay = document.getElementById("attempts")
const scoreDisplay = document.getElementById('result')
const gridDisplay = document.querySelector('#grid')
const setButton = document.querySelector('#button')

let cardsChosen = []
let selectedCard = []
let attempts = 5
let score = 0

// Set variable displays in HTML
scoreDisplay.innerHTML = score
attemptsDisplay.innerHTML = attempts

// Randomly sort the cards
cardArray.sort(() => 0.5 - Math.random())


//-------------Functions-----------------------------

// Create the Board
function createBoard(){
    for(let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.src = 'images/back.png'
        card.id =  i
        card.classList = 'card'
        card.style.width = '100px'
        card.addEventListener('click', flipCard)
        gridDisplay.append(card) 
    }
}

// Flip card from back to front to see image
function flipCard() {
    const cardID = this.getAttribute('id') //Gets data-id from clicked card

    selectedCard = cardArray.find((card, index) => index == cardID) // Finds selected object based on ID
    selectedCard.ID = cardID    // Adds data-id to object
    cardsChosen.push(selectedCard)    // Adds selected card object to chosen cards array
    this.src = cardArray[cardID].img // Sets card to img
    this.removeEventListener('click', flipCard) // Removes event listener
    console.log(cardsChosen)
    
    //Wait until 2 cards have been selected
    if(cardsChosen.length === 2) {
        checkMatch()
    }
}

// Check for a match
function checkMatch() {
    if (cardsChosen[0].name === cardsChosen[1].name) {
        ++score
        scoreDisplay.innerHTML = score
        ++attempts
        attemptsDisplay.innerHTML = attempts
        if (score == 6) {
            delay(500).then(() => alert('You found a match!'))
            delay(500).then(() => alert('You won!!'))
            delay(1000).then(() => location.reload())
        } else {
        delay(500).then(() => alert('You found a match!'))
        delay(500).then(() => setWhite())
        }
    } else {
        delay(1000).then(() => flipBack())
        --attempts
        attemptsDisplay.innerHTML = attempts
        if (attempts == 0){
            delay(500).then(() => alert('You Lost!'))
            delay(1000).then(() => location.reload())
        }
    }
}

// Set completed matches to white
// This logic is ugly, but works well enough to not spend more time streamlining.
function setWhite() {
    const cards = document.querySelectorAll('.card')

    cards[cardsChosen[0].ID].src = 'images/white.png'
    cards[cardsChosen[1].ID].src = 'images/white.png'
    cardsChosen = []  
}

//Delays a function from happening for x number of miliseconds.
function delay(time){
    return new Promise(resolve => setTimeout(resolve, time));
}

// Flip cards back over
// This logic is ugly, but works well enough to not spend more time streamlining.
function flipBack() {
    const cards = document.querySelectorAll('.card')

    cards[cardsChosen[0].ID].src = 'images/back.png'
    cards[cardsChosen[1].ID].src = 'images/back.png'
    cards[cardsChosen[0].ID].addEventListener('click', flipCard)
    cards[cardsChosen[1].ID].addEventListener('click', flipCard)
    cardsChosen = []
}

//Page counter 
function liveViews(response) {
    document.getElementById('visits').innerText = response.value;
}

//------------------Code--------------------

createBoard()



