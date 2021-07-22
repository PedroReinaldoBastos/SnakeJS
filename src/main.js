import { map } from "/mapper.js";
import { snake, resetSnake, updateGame, drawScreen } from "/snake.js";
export let speed = 0.1;
let press = { y:0, x:0 };

map();

document.addEventListener('keydown', (e)=>{
    switch (e.key) {
        case "ArrowLeft":
            press = { y: 0, x:-1 };
        break;
        case "ArrowUp":
            press = { y: -1, x:0 };
        break;
        case "ArrowRight":
            press = { y: 0, x:1 };
        break;
        case "ArrowDown":
            press = { y: 1, x:0 };
        break;
    }
})

const gameSpeed = 1000*speed;
setInterval(function(){
    try {
        updateGame(press);
        drawScreen();
    } catch (error) {
        if (error.getError){
            window.alert(error.getError);
        }
        else{
            window.alert(error);
        }
        window.alert(error.getError);
        press = {y: 0, x: 0}
        resetSnake();
    }
}, gameSpeed); 
