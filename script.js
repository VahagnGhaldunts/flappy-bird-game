const move_speed = 7, gravity = 0.5;
let bird = document.querySelector('.bird');
let img = document.getElementById('bird-1');
let soundPoint = new Audio('sounds/point.mp3');
let soundDie = new Audio('sounds/die.mp3');

// getting bird element properties
let birdProps = bird.getBoundingClientRect();

// This method returns DOMReact -> top, right, bottom, left, x, y, width and height
let background = document.querySelector('.background').getBoundingClientRect();

let scoreVal = document.querySelector('.scoreVal');
let message = document.querySelector('.message');
let scoreTitle = document.querySelector('.scoreTitle');

let gameState = 'Start';
img.style.display = 'none';
message.classList.add('messageStyle');

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && gameState !== 'Play') {
        document.querySelectorAll('.pipeSprite').forEach((element) => {
            element.remove();
        });
        startGame();
    }
    if ((e.key === 'ArrowUp' || e.key === ' ') && gameState === 'Play') {
        img.src = 'images/Bird-2.png';
        bird_dy = -7.6;
    }
});

document.addEventListener('keyup', (e) => {
    if ((e.key === 'ArrowUp' || e.key === ' ') && gameState === 'Play') {
        img.src = 'images/Bird.png';
    }
});

function startGame() {
    img.style.display = 'block';
    bird.style.top = '40vh';
    gameState = 'Play';
    message.innerHTML = '';
    scoreTitle.innerHTML = 'Score: ';
    scoreVal.innerHTML = '0';
    message.classList.remove('messageStyle');
    play();
}

function play() {
    function move() {
        if (gameState !== 'Play') return;
        updatePipes();
        checkCollisions();
        updateScore();
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

function updatePipes() {
    let pipeSprites = document.querySelectorAll('.pipeSprite');
    pipeSprites.forEach((pipe) => {
        let pipeProps = pipe.getBoundingClientRect();
        if (pipeProps.left <= -100) {
            pipe.remove();
        } else {
            pipe.style.left = pipeProps.left - move_speed + 'px';
        }
    });
    
}
function checkCollisions() {
    let pipeSprites = document.querySelectorAll('.pipeSprite');
    let birdProps = bird.getBoundingClientRect();
    pipeSprites.forEach((pipe) => {
        let pipeProps = pipe.getBoundingClientRect();
        if (birdProps.left < pipeProps.left + pipeProps.width &&
            birdProps.left + birdProps.width > pipeProps.left &&
            birdProps.top < pipeProps.top + pipeProps.height &&
            birdProps.top + birdProps.height > pipeProps.top) {
            gameState = 'End';
            displayGameOver();
            return;
        }
    });
}

function displayGameOver() {
    message.innerHTML = 'Game Over'.fontcolor('red') + '<br>Press Enter To Restart';
    message.classList.add('messageStyle');
    img.style.display = 'none';
    soundDie.play();
}
function updateScore() {
    let pipeSprites = document.querySelectorAll('.pipeSprite');
    let birdProps = bird.getBoundingClientRect();
    pipeSprites.forEach((pipe) => {
        let pipeProps = pipe.getBoundingClientRect();
        if (pipeProps.right < birdProps.left && pipeProps.right + move_speed >= birdProps.left && pipe.increase_score == '1') {
            scoreVal.innerHTML = parseInt(scoreVal.innerHTML) + 1;
            soundPoint.play();
            pipe.increase_score = '0'; // Ensure score is increased only once per pipe
        }
    });
}
    let bird_dy = 0;
    function applyGravity(){
        if(gameState != 'Play') return;
        bird_dy = bird_dy + gravity;
        document.addEventListener('keydown', (e) => {
            if ((e.key === 'ArrowUp' || e.key === ' ') && gameState === 'Play') {
                img.src = 'images/Bird-2.png';
                bird_dy = -8;
            }
        });

        document.addEventListener('keyup', (e) => {
            if ((e.key === 'ArrowUp' || e.key === ' ') && gameState === 'Play') {
                img.src = 'images/Bird.png';
            }
        });

        if(birdProps.top <= 0 || birdProps.bottom >= background.bottom){
            gameState = 'End';
            message.style.left = '28vw';
            window.location.reload();
            message.classList.remove('messageStyle');
            return;
        }
        bird.style.top = birdProps.top + bird_dy + 'px';
        birdProps = bird.getBoundingClientRect();
        requestAnimationFrame(applyGravity);
    }
    requestAnimationFrame(applyGravity);

    let pipeSeperation = 0;

    let pipe_gap = 40;

    function create_pipe(){
        if(gameState != 'Play') return;

        if(pipeSeperation > 115){
            pipeSeperation = 0;

            let pipe_posi = Math.floor(Math.random() * 43) + 12;
            let pipeSprite_inv = document.createElement('div');
            pipeSprite_inv.className = 'pipeSprite';
            pipeSprite_inv.style.top = pipe_posi - 70 + 'vh';
            pipeSprite_inv.style.left = '100vw';

            document.body.appendChild(pipeSprite_inv);
            let pipeSprite = document.createElement('div');
            pipeSprite.className = 'pipeSprite';
            pipeSprite.style.top = pipe_posi + pipe_gap + 'vh';
            pipeSprite.style.left = '100vw';
            pipeSprite.increase_score = '1';

            document.body.appendChild(pipeSprite);
        }
        pipeSeperation++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}
