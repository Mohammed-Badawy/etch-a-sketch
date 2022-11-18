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
const paintBtn = document.querySelector("#painting");
const eraseBtn = document.querySelector("#eraser");

let brush = "";
let background = "";
let divNumber = 16;

setupBtn.addEventListener("click", initializeCanvas);

measureLabel.textContent = "Size: " + divNumber +  " x " + divNumber;
measureSize.oninput = function () {
    measureLabel.textContent = "Size: " + this.value +  " x " + this.value;
    return this.value;
}

// setup environment
function setupCanvas(){

    removeOldDivs(); //remove old divs from canvas

    let Number = measureSize.value;
    background = getBackgroundColor();
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

    adjustBtnText();
    paint();
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

// create function to remove old divs from canvas
// to maintain the size of the child divs
function removeOldDivs(){
    let oldDivs = canvas.querySelectorAll("div");
    oldDivs.forEach(div => div.remove());
}


// change button inner text
function adjustBtnText(){
    if(setupBtn.textContent === "Setup"){
        setupBtn.textContent = "Reset";
    }
    else if(setupBtn.textContent === "Reset"){
        setupBtn.textContent = "Setup";
    }
}


// clear canvas
function clearCanvas(){
    removeOldDivs();
    canvas.style.backgroundColor = getBackgroundColor();
    adjustBtnText();
}

// add initialize function
// change the function of the main button interchangeably
function initializeCanvas(){
    if(setupBtn.textContent === "Setup"){
        setupCanvas();
    }
    else if(setupBtn.textContent === "Reset"){
        clearCanvas();
    }
}


// paint function
function paint(){
    let divs = canvas.querySelectorAll("div");

    for(let div of divs){
        let innerDiv = div.querySelectorAll("div");

        innerDiv.forEach(smallDiv => {
            smallDiv.addEventListener("mouseover", () => {
                if(paintBtn.checked === true){
                    smallDiv.style.backgroundColor = getForgroundColor();
                }
                else if(eraseBtn.checked === true){
                    smallDiv.style.backgroundColor = background;
                }
            })
        })
    }
}