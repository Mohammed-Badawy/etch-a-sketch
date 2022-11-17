// References to DOM elements
const canvas = document.querySelector(".canvas");
const setupBtn = document.querySelector(".btn");
const whiteBrush = document.querySelector("#white-brush");
const blackBrush = document.querySelector("#black-brush");
const colorfulBrush = document.querySelector("#colorful-brush");
const whiteBackground = document.querySelector("#white-back");
const blackBackground = document.querySelector("#black-back");
const randomBackground = document.querySelector("#colorful-back");
const measureSize = document.querySelector("#measure-size");
const measureLabel = document.querySelector(".measure");

let brush = "";
let divNumber = 16;

setupBtn.addEventListener("click", setupCanvas);

measureLabel.textContent = "Size: " + divNumber +  " x " + divNumber;
measureSize.oninput = function () {
    measureLabel.textContent = "Size: " + this.value +  " x " + this.value;
    return this.value;
}


// setup environment
function setupCanvas(){
    let Number = measureSize.value;
    let background = getBackgroundColor();
    brush = getForgroundColor();

    canvas.style.backgroundColor = background;

    
    for(let i = 0; i < Number; i++){
        const rowDiv = document.createElement("div");
        rowDiv.className = "row-div";

        for(let j = 0; j < Number; j++){
            const childDiv = document.createElement("div");
            childDiv.className = "child-div";
            rowDiv.appendChild(childDiv);
        }

        canvas.appendChild(rowDiv);
    }
}

// get foreground color
function getForgroundColor(){
    if(whiteBrush.checked === true){
        return "#ffffff";
    }
    else if(blackBrush.checked === true){
        return "#000000";
    }
    else if(colorfulBrush.checked === true){
        return getRandomColor();
    }
}


// get background color
function getBackgroundColor(){
    if(blackBackground.checked === true) {
        return "#000000";
    }
    else if(whiteBackground.checked === true){
        return "#ffffff";
    }
    else if(randomBackground.checked === true){
        return getRandomColor();
    }
}

// get random color
function getRandomColor() {
    let randomColor = "#";
    randomColor += Math.floor(Math.random()* 16777215).toString(16);
    return randomColor;
}