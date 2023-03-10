document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 10
    let currentIndex = 0 // so frist div in our grid
    let appleIndex = 0 // so first div in our grid
    let currentSnake = [2,1,0] // so the div in our grid being 2 (or the head), and 0 being the end (TAIL, with all 1's being the body)
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0

    // to start, and restart the game
    function startGame () {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText= score
        intervalTime = 1000
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutComes, intervalTime)
    }

    // functiuons that deal  with ALL the outcomes of the snake
    function moveOutComes() {

    
    // deals with the snake hitting border and snake hitting self
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) || // if snake hits bottom
            (currentSnake[0] % width === width -1 && direction ===1) || // if snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || // if snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) || // if snake hits the top wall
            squares[currentSnake[0] + direction].classList.contains('snake') // if snake hits itself
        ) {
            return clearInterval(interval) // this will clear the interval if any of the above happen
        }

            const tail = currentSnake.pop() // remove tlast ite of the array and shows it
            squares[tail].classList.remove('snake') // removes class of snake from the TAIL
            currentSnake.unshift(currentSnake[0] + direction) // gives direction to the head of the snake
        
        // deals with snake getting apple
        if(squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutComes, intervalTime) 
        }
        squares[currentSnake[0]].classList.add('snake')
    }

        // generate new apple once apple is eaten
        function randomApple () {
            do{
                appleIndex = Math.floor(Math.random() * squares.length)
            } while(squares[appleIndex].classList.contains('snake')) // makeing sure the apple doesn't appear where the snake is
            squares[appleIndex].classList.add('apple')

        }

    // assign functions to keycodes
    function control(e) {
        squares[currentIndex].classList.remove('snake') // we are removing the class of snake from ALL the squares

        if (e.keyCode === 39) {
            direction = 1 // we press the right arrow on the keyboard, the snake will go right one div
        } else if (e.keyCode === 38) {
            direction = -width // press up arrow on keyboard, the snake go back ten divs, appearing to go up
        } else if (e.keyCode === 37) {
            direction = -1 // press left arrow, the snake will go left one div
        } else if (e.keyCode === 40) {
            direction = +width // press down arrow, snake will go forward 10 divs, appearing to move down
        }
    }

    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)

})