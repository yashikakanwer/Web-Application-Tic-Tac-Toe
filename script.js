let boxes = document.querySelectorAll(".box");

let turn = "X";
let isGameover = false;

boxes.forEach(e => {
    e.addEventListener("click", () => {
        if (!isGameover && e.innerHTML === "") {
            e.innerHTML = turn;
            checkWin();
            checkDraw();
            if (!isGameover) changeTurn(); // Change turn only if the game is not over
        }
    });
});

function changeTurn() {
    if (turn === "X") {
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
    } else {
        turn = "X";
        document.querySelector(".bg").style.left = "0";
    }
}

function checkWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    winConditions.forEach(condition => {
        let [a, b, c] = condition;
        if (boxes[a].innerHTML && boxes[a].innerHTML === boxes[b].innerHTML && boxes[a].innerHTML === boxes[c].innerHTML) {
            isGameover = true;
            document.querySelector("#results").innerHTML = turn + " wins!";
            document.querySelector("#play-again").style.display = "inline";
            [a, b, c].forEach(i => {
                boxes[i].style.backgroundColor = "#08D9D6";
                boxes[i].style.color = "#000";
            });
        }
    });
}

function checkDraw() {
    if (!isGameover) {
        let isDraw = [...boxes].every(e => e.innerHTML !== "");
        if (isDraw) {
            isGameover = true;
            document.querySelector("#results").innerHTML = "Draw";
            document.querySelector("#play-again").style.display = "inline";
        }
    }
}

document.querySelector("#play-again").addEventListener("click", () => {
    isGameover = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff";
    });
});