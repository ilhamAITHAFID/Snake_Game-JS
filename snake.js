const BG_COLOUR ='#231f20';
const SNAKE_COLOUR ='#c2c2c2';
const FOOD_COLOUR = '#e66916';

const canvas = document.getElementById('canvas');
const Canvas_context = canvas.getContext('2d');

canvas.width = canvas.height = 400;
const FR = 10;
const Scren = 20;
const Tile = canvas.width / Scren;

let position, velocity, food, snake;

function init(){
    position= { x: 10, y:10};
    velocity= { x: 0 , y:0};

    snake = [
        { x: 8, y:10},
        { x: 9, y:10},
        { x: 10, y:10},
    ]
    randomFood();
}

init();

function randomFood(){
    food = {
        x: Math.floor(Math.random() * Tile),
        y: Math.floor(Math.random() * Tile),
    }
    for(let cell of snake){
        if(cell.x === food.x && food.y === cell.y){
            return randomFood();
        }
    }
}

document.addEventListener('keydown', keydown);

function keydown(e){
    switch(e.keyCode){
        case 37:{
            return velocity = { x: -1, y: 0}
        }
        case 38:{
            return velocity = { x: 0, y: -1}
        }
        case 39: {
            return velocity = {x: 1, y: 0}
        }
        case 40: {
            return velocity = {x: 0, y: 1}
        }
    }
}

setInterval(()=>{
    requestAnimationFrame(gameLoop);
   }, 1000 /FR
);

function gameLoop(){
    Canvas_context.fillStyle = BG_COLOUR;
    Canvas_context.fillRect(0,0,canvas.width, canvas.height);
    Canvas_context.fillStyle = SNAKE_COLOUR;

    for(let cell of snake){
        Canvas_context.fillRect(cell.x*Scren, cell.y*Scren, Scren,Scren);
    }

   Canvas_context.fillStyle = FOOD_COLOUR;
   Canvas_context.fillRect(food.x*Scren, food.y*Scren, Scren,Scren);

   position.x += velocity.x;
   position.y += velocity.y;

   if(position.x < 0 || position.x > Tile || position.y < 0 || position.y > Tile ){
    init();
   }
   if(food.x === position.x && food.y === position.y){
     snake.push({...position});
     position.x += velocity.x;
     position.y += velocity.y;
     randomFood();
   }
   if(velocity.x || velocity.y){
    for(let cell of snake){
        if(cell.x === position.x && cell.y === position.y){
            return init();
        }
    }
    snake.push({...position});
    snake.shift();
   }

}   

