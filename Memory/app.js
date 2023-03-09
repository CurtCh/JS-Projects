document.addEventListener('DOMContentLoaded', () => {

//card options
const cardArray = [
    {
        name: 'blastoise',
        img: 'images/blastoise_Art.png'
    },
    {
        name: 'blastoise',
        img: 'images/blastoise_Art.png'
    },
    {
        name: 'charizard',
        img: 'images/charizard_Art.png'
    },
    {
        name: 'charizard',
        img: 'images/charizard_Art.png'
    },
    {
        name: 'mew',
        img: 'images/mew_Art.png'
    },
    {
        name: 'mew',
        img: 'images/mew_Art.png'
    },
    {
        name: 'mewtwo',
        img: 'images/mewtwo_Art.png'
    },
    {
        name: 'mewtwo',
        img: 'images/mewtwo_Art.png'
    },
    {
        name: 'pikachu',
        img: 'images/pikachu_Art.png'
    },
    {
        name: 'pikachu',
        img: 'images/pikachu_Art.png'
    },
    {
        name: 'venusaur',
        img: 'images/venusaur_Art.png'
    },
    {
        name: 'venusaur',
        img: 'images/venusaur_Art.png'
    }
]

cardArray.sort(() => 0.5 - Math.random())


const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('#result')
var cardsChosen = []
var cardsChosenID = []
var cardsWon = [] 

//create board
function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        var card = document.createElement('img')
        card.setAttribute('src', 'images/card_Art.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        grid.appendChild(card)
    }
}

// check for matches
function checkForMatch() {
    var cards = document.querySelectorAll('img')
    const optionOneID = cardsChosenID[0]
    const optionTwoID = cardsChosenID[1]

    if(optionOneID == optionTwoID) {
        cards[optionOneID].setAttribute('src', 'images/empty_Art.png')
        cards[optionTwoID].setAttribute('src', 'images/empty_Art.png')
        alert('You have clicked the same image!')
    } else if (cardsChosen[0] === cardsChosen[1]) {
        alert('You found a match!!!')
        cards[optionOneID].setAttribute('src', 'images/empty_Art.png')
        cards[optionTwoID].setAttribute('src', 'images/empty_Art.png')
        cards[optionOneID].removeEventListener('click', flipCard)
        cards[optionTwoID].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
    } else {
        cards[optionOneID].setAttribute('src', 'images/card_Art.png')
        cards[optionTwoID].setAttribute('src', 'images/card_Art.png')
        alert('Sorry, try again!')
    }
    cardsChosen = []
    cardsChosenID = []
    resultDisplay.textContent = cardsWon.length
    if (cardsWon.length === cardArray.length/2) {
        resultDisplay.textContent = 'Congratulations! You found them all!'
    }
}

//filp your card
function flipCard() {
    var cardID = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardID].name)
    cardsChosenID.push(cardID)
    this.setAttribute('src', cardArray[cardID].img)
    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500)
    }
}

createBoard()


})