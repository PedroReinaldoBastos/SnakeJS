export const gameSize = {width: 20, height: 20};
const divGame = document.getElementById('game');

export function map(){
    for(let y = 1; y<= gameSize.height; y++)
    {
        for(let x = 1; x<= gameSize.width; x++)
        {
            const newdiv = document.createElement("div");
            newdiv.classList.add('grid');
            newdiv.setAttribute("yposition", y);
            newdiv.setAttribute("xposition", x);
            divGame.appendChild(newdiv);
        }
    }
}