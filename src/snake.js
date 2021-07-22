import { gameSize } from "/mapper.js";

export let snake = [{ypos:(gameSize.height/2), xpos:gameSize.width/2}];
let food= [];
var oldSnake = [];
let oldFood = [];
let diedSnake = [];


class GameError{
    constructor(descError){
        this.Error = descError;
    }
    get getError(){
        return `${this.Error}`;
    }
}

function foodRandomize(){
    do {
        food = { xpos: Math.floor((Math.random()*20)+1), ypos: Math.floor((Math.random()*20)+1)};
    }
    while(snake.some(snakeSlice=>( snakeSlice.xpos == food.xpos && snakeSlice.ypos == food.ypos )));
}


let lastDirection = {y: 0, x:0};
export function updateGame(direction){
    let newSnake = [];
    oldSnake = [];

    for(let i = 0; i < snake.length; i++){
        oldSnake[i] = {... snake[i]};
    }
    if (!(direction.y == 0 && direction.x == 0)){
        if((lastDirection.y == 1 && direction.y == -1 || lastDirection.y == -1 && direction.y == 1)
        ||(lastDirection.x == 1 && direction.x == -1 || lastDirection.x == -1 && direction.x == 1)){
            direction = lastDirection;
        }

        for(let i = snake.length - 2; i >= 0; i--){
            snake[i+1] = { ...snake[i] };
        };
        snake[0].ypos += direction.y;
        snake[0].xpos += direction.x;
        lastDirection = direction;
    }

    if( food.length == 0){
        foodRandomize();
        const snakeElement = document.querySelector("[yposition='"+food.ypos+"'][xposition='"+food.xpos+"']")
        snakeElement.classList.add("food");
    }
    if(snake[0].xpos == food.xpos && snake[0].ypos == food.ypos){
        snake[snake.length] = oldSnake[oldSnake.length-1];
        const snakeElement = document.querySelector("[yposition='"+food.ypos+"'][xposition='"+food.xpos+"']")
        snakeElement.classList.remove("food");
        food = [];
    }

    if (snake[0].xpos > 20 || snake[0].ypos > 20 || snake[0].xpos < 1 || snake[0].ypos < 1){
        diedSnake = oldSnake;
        throw new GameError("Você excedeu o limite da tela, então você perdeu...");
    }
    snake.forEach((snakeSlice, i)=>{
        if (i != 0){
            newSnake.push(snakeSlice);
        }
    });
    if (newSnake.some(snakeSlice=> snake[0].xpos == snakeSlice.xpos && snake[0].ypos == snakeSlice.ypos)){
        diedSnake = oldSnake;
        throw new GameError("Você bateu em si mesmo, então você perdeu...");
    }

}

export function drawScreen(){
    
    if(diedSnake.length){
        diedSnake.forEach(snakeSlice=>{
            const snakeElement = document.querySelector("[yposition='"+snakeSlice.ypos+"'][xposition='"+snakeSlice.xpos+"']");
            snakeElement.classList.remove("snake");
        });
    }

    oldSnake.forEach(snakeSlice=>{
        const snakeElement = document.querySelector("[yposition='"+snakeSlice.ypos+"'][xposition='"+snakeSlice.xpos+"']");
        snakeElement.classList.remove("snake");
    });

    snake.forEach(snakeSlice=>{
        const snakeElement = document.querySelector("[yposition='"+snakeSlice.ypos+"'][xposition='"+snakeSlice.xpos+"']");
        snakeElement.classList.add("snake");
    });

}

export function resetSnake(){

    lastDirection = {y: 0, x:0};
    snake = [{ ypos:(Math.floor(Math.random()*20)+1), xpos:(Math.floor(Math.random()*20)+1) }];
}