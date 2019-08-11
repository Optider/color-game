var numSquares = 6;
var colors = [];
var pickedColor;				// the color to be guessed

var squares = document.getElementsByClassName("squares");
var colorDisplay = document.getElementById("colorDisplay");
var message = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
	modeChoice();
	squaresChoice();
	reset();
}

function modeChoice() {
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click",function () {
			//make buttons highlighted
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			//generate numSquares ( 3 or 6 ) colors
			this.textContent === "EASY" ? numSquares = 3 : numSquares = 6;
			
			reset();	////////////// $$$$$$&&&&@@@@&#* why is this reset required here if it is also called at line 17  ////////////// $$$$$$&&&&@@@@&#*
		});
	}
}

function squaresChoice() {
	for (var i = 0; i < squares.length; i++) {
		//listen to click on squares
		squares[i].addEventListener("click",function() {
			//compare clicked square color with ans
			if( this.style.backgroundColor === pickedColor ) {
				message.textContent = "Correct" ;
				changeColors(pickedColor);
				h1.style.backgroundColor = pickedColor;
				resetButton.textContent = "Play Again ?";
			}
			else {
				message.textContent = "Wrong" ;
				this.style.backgroundColor = "#232323";
			}
		});
	}
}

function reset() {
	//new colors are generated
	colors = generateRandomColors(numSquares);
	//a color is picked and RGB displayed in h1
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	//h1 background, button and message text changes to initial
	h1.style.backgroundColor = "steelblue";
	resetButton.textContent = "NEW COLORS";
	message.textContent = "";
	//colors are filled in squares
	for(var i = 0; i < squares.length; i++) {		// *********** change to colors.length
		if (colors[i]) {
			squares[i].style.backgroundColor = colors[i];
			// for HARD mode display all squares including those which had been hidden in easy mode
			squares[i].style.display = "block";	// can keep it "" i.e. empty also
		} else {
			//hide squares for EASY mode
			squares[i].style.display = "none";
			//alter to display = "none" is camouflaging to bgcolor, but not a good choice, as it still exists
 			// squares[i].style.backgroundColor = "#232323";
		}
	}
}

resetButton.addEventListener("click", function() {
	reset();
})

function pickColor() {
	var randomNo = Math.floor(Math.random() * numSquares);
	return colors[randomNo];
}

function changeColors() {
	//loop through all squares
	for (var i = 0; i < squares.length; i++) {
		//change all square colors to pickedColor (ans)
		squares[i].style.backgroundColor = pickedColor ;
	}
}
function generateRandomColors(num) {
	//create array
	var arr=[];
	//loop through array
	for (var i = 0; i < num; i++) {
		//insert random colors into the array
		//pick a "red", "green", "blue" from 0 - 255 
		var r = Math.floor(Math.random() * 256);
		var g = Math.floor(Math.random() * 256);
		var b = Math.floor(Math.random() * 256);
		arr.push("rgb(" + r + ", " + g + ", " + b + ")")
	}
	//return array
	return arr;
}