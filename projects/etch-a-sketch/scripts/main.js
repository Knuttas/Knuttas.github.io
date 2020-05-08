let numberOfSquares = 16;
let squaresPerRow = Math.sqrt(numberOfSquares);
let squareWidth = 960 / squaresPerRow;

const container = document.querySelector("#container");

for (let i = 0; i < numberOfSquares; i++) {
    let content = document.createElement("div");
    content.style.width = squareWidth + "px";
    content.style.height = squareWidth + "px";
    content.style.backgroundColor = "white";
    content.addEventListener("mouseover", () => content.style.backgroundColor = "rgb" + (randomRGB(content.style.backgroundColor)));
    content.addEventListener("mouseleave", () => content.classList.remove("squarehover"));
    content.classList.add("square");
    container.appendChild(content);
}

function resetGrid() {
    numberOfSquares = prompt("Choose new number of squares in grid");
    numberOfSquares = +numberOfSquares;
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }
    squaresPerRow = Math.sqrt(numberOfSquares);
    squareWidth = 960 / squaresPerRow;

    for (let i = 0; i < numberOfSquares; i++) {
        let content = document.createElement("div");
        content.style.width = squareWidth + "px";
        content.style.height = squareWidth + "px";
        content.style.backgroundColor = "white";
        content.addEventListener("mouseover", () => content.style.backgroundColor = "rgb" + (randomRGB(content.style.backgroundColor)));
        content.addEventListener("mouseleave", () => content.classList.remove("squarehover"));
        content.classList.add("square");
        container.appendChild(content);
    }
}

function randomRGB(currentColor) {
    if (currentColor == "white") {
        let R = Math.round(Math.random()*255);
        let B = Math.round(Math.random()*255);
        let G = Math.round(Math.random()*255);
        return ("(" + R + ", " + B + ", " + G + ")");
    } else {
        currentColor = currentColor.split(",");
        R = +currentColor[0].slice(4);
        B = +currentColor[1].slice(1);
        G = +currentColor[2].slice(1).slice(0, currentColor[2].length - 2);
        R *= 0.9;
        B *= 0.9;
        G *= 0.9;
        return ("(" + R + ", " + B + ", " + G + ")");
    }
}