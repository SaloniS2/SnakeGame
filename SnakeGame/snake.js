const bg_color='#544C4A';
const snake_color='#00ff41';
const food_color='#ff0012';

const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');
canvas.width=canvas.height=500;

const fr = 10;
const s = 20;
const t = canvas.width / s;

let pos,vel,food,snake;

function init(){
    pos={x:10, y:10};
    vel={x:0, y:0};

    snake = [
        {x:8 ,y:10},
        {x:9 ,y:10},
        {x:10 ,y:10},
    ]

    randomFood();
}
init();
function randomFood(){
    food={
        x: Math.floor(Math.random()*t),
        y: Math.floor(Math.random()*t),
    }

    for(let cell of snake){
        if(cell.x===food.x && food.y===cell.y){
            return randomFood();
        }
    }
}

document.addEventListener('keydown',keydown);

function keydown(e){

    switch(e.keyCode){
        case 37:{
            return vel={x:-1,y:0}
        }
        case 38:{
            return vel={x:0,y:-1}
        }
        case 39:{
            return vel={x:1,y:0}
        }
        case 40:{
            return vel={x:0,y:1}
        }
    }
}

setInterval(()=>{
    requestAnimationFrame(gameLoop);
},1000/ fr);

function gameLoop(){
    ctx.fillStyle = bg_color;
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = snake_color;

    for(let cell of snake){
        ctx.fillRect(cell.x*s,cell.y*s,s,s);
    }

    ctx.fillStyle=food_color;
    ctx.fillRect(food.x*s,food.y*s,s,s);
        pos.x += vel.x;
        pos.y += vel.y;
    

    if(pos.x<0 || pos.x>t || pos.y<0 || pos.y>t){
        init();
    }
    if(food.x===pos.x && food.y===pos.y){
        snake.push({...pos});
        pos.x += vel.x;
        pos.y += vel.y;
        randomFood();
    }

    if(vel.x || vel.y){
        for(let cell of snake){
            if(cell.x === pos.x && cell.y === pos.y){
                return init();
            }
        }
        snake.push({...pos});
        snake.shift();
    }
}









































