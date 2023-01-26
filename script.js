import { Chess } from './chess.js'
// copied the code from https://github.com/jhlywa/chess.js that simulates a chess game
const chess = new Chess(); 
var moveUser;
var color = "";
var win = ""
var botColor = "";



document.addEventListener('DOMContentLoaded', function () {
    // document.getElementById('output').innerHTML = `<pre>${chess.ascii()}</pre>`; 
    $("#first").submit(function(e){
        color = document.querySelector("#color").value;
        document.querySelector("#choice").style.display = "none";
        document.querySelector("#after").style.display = "block";
        if (color == "Black")
        {
            chessMove();
            botColor = "White";
        }
        else
        {
            botColor = "Black";
        }
        e.preventDefault();
    })   
    $("#form").submit(function(e){
        moveUser = document.querySelector("#move").value;
        try{
            chess.move(moveUser);
            if(chess.isGameOver())
            {
                win = color;
                document.querySelector("#move").disabled = true;
                document.querySelector("#submit").style.display = "none";
            }
            else
            {
                // document.getElementById('output').innerHTML = `<pre>${chess.ascii()}</pre>`;
                var win = chessMove();
                // document.getElementById('output').innerHTML = `<pre>${chess.ascii()}</pre>`;
                if(chess.isGameOver())
                {
                    win = botColor;
                    document.querySelector("#move").disabled = true;
                    document.querySelector("#submit").style.display = "none";

                }
                document.querySelector("#error").style.display = "none";
            }
            
        } catch(error) {
            document.querySelector("#error").style.display = "block";
        }   


        // Winning Scenarios

        const winner = document.querySelector("#winner");

        
        if(chess.isGameOver())
        {
            if(chess.isDraw())
            {
                console.log("Draw");
                winner.innerHTML = "Draw";
            }
            else
            {
                console.log(win);
                winner.innerHTML = win + " Wins";
            }
        }
        e.preventDefault();
    })  
    
    
     




});

function chessMove()
{
    const moves = chess.moves()
    const move = moves[Math.floor(Math.random() * moves.length)]
    var win = chess.move(move);
    window.updateBoard(chess.fen())
    // document.getElementById('output').innerHTML = `<pre>${chess.ascii()}</pre>`; 
    
    document.querySelector("#compMove").innerHTML = "Bot moved: " + move;   
    return win;
}