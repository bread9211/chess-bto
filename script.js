import Chess from './chess.js'
import { getBestMove } from './chess.ai.js'
// copied the code from https://github.com/jhlywa/chess.js that simulates a chess game
const chess = new Chess(); 
// var moveUser;
// var color = "";
// var win = ""
// var botColor = "";

document.addEventListener('DOMContentLoaded', function () {
    // document.getElementById('output').innerHTML = `<pre>${chess.ascii()}</pre>`; 
    // $("#first").submit(function(e){
    //     color = document.querySelector("#color").value;
    //     document.querySelector("#choice").style.display = "none";
    //     document.querySelector("#after").style.display = "block";
    //     if (color == "Black")
    //     {
    //         chessMove();
    //         botColor = "White";
    //     }
    //     else
    //     {
    //         botColor = "Black";
    //     }
    //     e.preventDefault();
    // })   
    // $("#form").submit(function(e){
    //     moveUser = document.querySelector("#move").value;
    //     try{
    //         chess.move(moveUser);
    //         if(chess.isGameOver())
    //         {
    //             win = color;
    //             document.querySelector("#move").disabled = true;
    //             document.querySelector("#submit").style.display = "none";
    //         }
    //         else
    //         {
    //             // document.getElementById('output').innerHTML = `<pre>${chess.ascii()}</pre>`;
    //             var win = chessMove();
    //             // document.getElementById('output').innerHTML = `<pre>${chess.ascii()}</pre>`;
    //             if(chess.isGameOver())
    //             {
    //                 win = botColor;
    //                 document.querySelector("#move").disabled = true;
    //                 document.querySelector("#submit").style.display = "none";

    //             }
    //             document.querySelector("#error").style.display = "none";
    //         }
            
    //     } catch(error) {
    //         document.querySelector("#error").style.display = "block";
    //     }   


    //     // Winning Scenarios

    //     const winner = document.querySelector("#winner");

        
    //     if(chess.isGameOver())
    //     {
    //         if(chess.isDraw())
    //         {
    //             console.log("Draw");
    //             winner.innerHTML = "Draw";
    //         }
    //         else
    //         {
    //             console.log(win);
    //             winner.innerHTML = win + " Wins";
    //         }
    //     }
    //     e.preventDefault();
    // })  
    
});


var board1 = ChessBoard('board1', {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onMouseoutSquare: onMouseoutSquare,
    onMouseoverSquare: onMouseoverSquare,
    onSnapEnd: onSnapEnd
})

function makeBestMove() {
    var bestMove = getBestMove(chess);
    chess.ugly_move(bestMove);
    board1.position(chess.fen());
    // renderMoveHistory(chess.history());
    if (chess.game_over()) {
        alert('Game over');
    }
};

function onDragStart (source, piece, position, orientation) {
    if (chess.in_checkmate() === true || chess.in_draw() === true ||
        piece.search(/^b/) !== -1) {
        return false;
    }
};

function onDrop (source, target) {

    var move = chess.move({
        from: source,
        to: target,
        promotion: 'q'
    });

    removeGreySquares();
    if (move === null) {
        return 'snapback';
    }

    window.setTimeout(makeBestMove, 250);
};

function onSnapEnd() {
    board1.position(chess.fen());
};

function onMouseoverSquare(square, piece) {
    var moves = chess.moves({
        square: square,
        verbose: true
    });

    if (moves.length === 0) return;

    greySquare(square);

    for (var i = 0; i < moves.length; i++) {
        greySquare(moves[i].to);
    }
};

function onMouseoutSquare(square, piece) {
    removeGreySquares();
};

function removeGreySquares() {
    $('#board .square-55d63').css('background', '');
};

function greySquare(square) {
    var squareEl = $('#board .square-' + square);

    var background = '#a9a9a9';
    if (squareEl.hasClass('black-3c85d') === true) {
        background = '#696969';
    }

    squareEl.css('background', background);
};

// document.getElementById("submit1").addEventListener("click", () => {
//     board1.orientation(document.querySelector("#color").value.toLowerCase())
// })

