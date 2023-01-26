var board1 = Chessboard('board1', 'start')

document.getElementById("submit1").addEventListener("click", () => {
    board1.orientation(document.querySelector("#color").value.toLowerCase())
})

window.updateBoard = (fen) => {
    board1.position(fen)
    console.log("sui")
}