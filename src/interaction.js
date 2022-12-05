// Get the canvas element by ID

const canvas = document.getElementById('overlay-canvas');
const context = canvas.getContext('2d');


// Load the text file using the fetch API


const text = " TikTok's location-based recommendation algorithm works by first identifying the user's location, then analyzing the user's search history to determine what type of content they are likely to be interested in. The algorithm then uses machine learning to compare the user's interests with content that is popular in their local area and recommends content that fits the user's interests. By recommending content that is popular in the user's local area, the algorithm encourages them to explore new content and connect with people who share similar interests. "; 
// The text to be animated.
let pos = 0; // The current position in the text (i.e., the index of the next character to be drawn).

var cursorPosition = 0;
// Set the starting position of the text
var x = 50;
var y = 50;
// Set the position of the canvas to absolute.
canvas.style.position = "absolute";
canvas.style.zIndex = "3";

canvas.width = 400;
canvas.height = window.innerHeight *2 ;
// Center the canvas horizontally and vertically in the window.

// Set the font size and style.
context.font = "16px sans-serif";

// Set the text color to white.
context.fillStyle = "white";

// Center the text horizontally.
context.textAlign = "left";

// Center the text vertically.
context.textBaseline = "left";


function animate() {
  // Clear the canvas.
  context.clearRect(0, 0, canvas.width/2, canvas.height/2);
  var words = text.split(' ');

  var lineX = x;
  var lineY = y;

  for (var i = 0; i < words.length; i++) {
    // Get the current word
    var word = words[i];

    // Measure the width of the word
    var width = context.measureText(word).width;

    // If the word would overflow the canvas, wrap it to the next line
    if (lineX + width > canvas.width) {
      lineX = x;
      lineY += 40;
    }

    // Draw the word on the canvas
    context.fillText(word + " ", lineX, lineY);

    // Update the position of the text
    lineX += width;
  }

  // Update the cursor position
  cursorPosition++;

  // If the cursor has reached the end of the text, reset it
  if (cursorPosition > text.length) {
    cursorPosition = 0;
  }
  
  

  // Schedule the next frame of the animation.
  setTimeout(() => {
    requestAnimationFrame(animate);
  }, 50);
}

animate();

