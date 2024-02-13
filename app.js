let board = document.getElementById('board');
let boardHeight = board.height;
let boardWidth = board.width;
let context = board.getContext('2d');

let xWidth = 10;
let yHeight = 50;
let velocity = 0;

let ballHeight = 10;
let ballWidth = 10;
let ball = {x:boardWidth/2,y:boardHeight/2,
            width:ballWidth,height:ballHeight,
            xspeed:1,yspeed:2};

let player1Score = 0;
let player2Score = 0;
let player1 = {x:10,y:boardHeight/2,width:xWidth,height:yHeight,velocity:velocity};
let player2 = {x:boardWidth-xWidth-10,y:boardHeight/2,width:xWidth,height:yHeight,velocity:velocity};

let start = false;

window.onload = function()
{
    requestAnimationFrame(update);
    document.addEventListener('keyup',movePlayer);
    let strbtn = document.querySelector('.strbtn');
    let resbtn = document.querySelector('.reset');

    resbtn.addEventListener('click',()=>
    {
        window.location.reload();
    })
    strbtn.addEventListener('click',()=>
    {
        if(!start)
        {
        start = true;
        }
        else
        start = false;
    })
    const arrows = document.querySelectorAll('#arrow');
    arrows.forEach((arrow) => {
        arrow.addEventListener('click',(e)=>
        {
            let side = e.target.getAttribute('class');
            manualKey(side);
        })
    });
}
// function to draw and check the player
function update()
{
    requestAnimationFrame(update);
    context.clearRect(0,0,boardWidth,boardHeight)
    context.fillStyle = "white";

// checking and moving the player position    
    let player1position = player1.y + player1.velocity;
    if(!boundery(player1position))
    {
        player1.y = player1position;
    }
    context.fillRect(player1.x,player1.y,player1.width,player1.height);
   
    let player2position = player2.y + player2.velocity;
    if(!boundery(player2position))
    {
        player2.y = player2position;
    }
    context.fillRect(player2.x,player2.y,player2.width,player2.height);

    if(start)
    {
// moving and drawing the ball    
    ball.x += ball.xspeed;
    ball.y += ball.yspeed;
    context.fillStyle = "darkgreen";
    context.fillRect(ball.x,ball.y,ball.width,ball.height);

//checking the ball position    
    if(ball.y < 0 || ball.y + ballHeight >= boardHeight)//up and down
    {
        ball.yspeed *= -1;
    }
    if(ball.y < 0)
    {
        ball.yspeed = 2;
    }
    else if(ball.y + ballHeight >= boardHeight)
    {
        ball.yspeed =-2;
    }

    if(collision(ball,player1))
    {
        if(ball.x <= player1.x + player1.width)
        {
            ball.xspeed *= -1;
        }
    }
    else if(collision(ball,player2))
    {
        if(ball.x + ballWidth >= player2.x)
        {
            ball.xspeed *= -1;
        }
    }
    if(ball.x < 0)
    {
       player2Score++;
       resetBall(1);
    }
    else if(ball.x + ballWidth >= boardWidth)
    {
        player1Score++;
        resetBall(-1)
    }
let winText;
if(player1Score >=10)
{
    context.fillStyle ="green";
    context.font = "20px sans-serif";
    winText = "Player 1 won!"
    context.fillText(winText,boardWidth*1/3-30,boardHeight/2);
    setTimeout(()=>
    {
        window.location.reload();
    },2000)
}
else if(player2Score >=10)
{
    context.fillStyle ="green";
    context.font = "20px sans-serif";
    winText = "Player 2 won!"
    context.fillText(winText,boardWidth*1/3-30,boardHeight/2);
    start = false;  
    context.fillText(winText,boardWidth*1/3-30,boardHeight/2);
    setTimeout(()=>
    {
        window.location.reload();
    },2000)
}
}  
// score display
context.fillStyle ="red";
context.font = "23px sans-serif";
context.fillText(player1Score,boardWidth/4,40);
context.fillText(player2Score,boardWidth*4/5-30,40);


// middle line  
for(let i=5;i<boardHeight;i+=20)
{
    context.fillStyle = "purple"
    context.fillRect(boardWidth/2,i,5,5)
}
}


// function to move player by clicking keys in pad
function movePlayer(e)
{
    if(e.code == "KeyW")
    {
     player1.velocity = -3;
    }
    else if(e.code == "KeyS")
    {
     player1.velocity = 3;
    }
    else if(e.code == "ArrowUp")
    {
     player2.velocity = -3;
    }
    else if(e.code == "ArrowDown")
    {
     player2.velocity = 3;
    } 
}

// funtion to check whether the player are in bounderies
function boundery(position)
{
return position < 0 || position + yHeight > boardHeight;
}

// function to check whether the ball has touch with players
function collision(a,b)
{
return a.x < b.x + b.width &&
       a.x + a.width > b.x && 
       a.y < b.y + b.height && 
       a.y + a.height > b.y;
}

// function to reset the ball side 
function resetBall(direction)
{
    ball = {x:boardWidth/2,y:boardHeight/2,
            width:ballWidth,height:ballHeight,
            xspeed:direction,yspeed:2}
}

//functio for manualkeys 
function manualKey(side)
{
    if(side === "top1")
    {
    player1.velocity = -3;
    }
    else if(side === "down1")
    {
    player1.velocity = 3;
    }
    else if(side === "top2")
    {
    player2.velocity = -3;
    }
    else if(side === "down2")
    {
    player2.velocity = 3;
    }
}