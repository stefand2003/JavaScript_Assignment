const canvas = document.getElementById('myCanvas');
// paintBrush is my brush I use to draw the canvas
const paintBrush = canvas.getContext('2d');

// Calculate each square by obtaining the canvas and dividing it in 5 equal squares
const squareWidth = canvas.width / 5;
const selectedSquares = []; // this is an array that stores each of the squares

// Generate the initial pattern of white and blue squares
// Later implement it with actual animals
// BLUE = FISH, WHITE = SNOWMAN
const initialPattern = generatePattern();

// Display a random sentence above the canvas
// At the moment this is "Select a blue square / white square" for simplicity
const randomSentenceElement = document.getElementById('randomSentence');
randomSentenceElement.textContent = getRandomSentence();

// Count for consecutive incorrect answers
let consecutiveIncorrectCount = 0;
const MAX_CONSECUTIVE_INCORRECT = 2;

// Add an event listener for mouse clicks
canvas.addEventListener('click', handleClick);

// Function to handle mouse clicks
function handleClick(event) {
  // getting the X coordinate of the mouse
  const x = event.clientX - canvas.getBoundingClientRect().left;
  const clickedSquare = Math.floor(x / squareWidth);

  // Check if the canvas is already selected
  const isSelected = selectedSquares.includes(clickedSquare);

  // Toggle between selected and !selected
  if (isSelected) {
    // If the square is already selected, remove it from the selected squares array
    const index = selectedSquares.indexOf(clickedSquare);
    if (index !== -1) {
      selectedSquares.splice(index, 1);
    }
  } else {
    // If the square is not selected, add it to the selected squares array
    selectedSquares.push(clickedSquare);
  }

  // Redraw without reloading the pattern
  redrawSelectedSquares();
}

// Function to redraw only the selected squares
function redrawSelectedSquares() {
  // Clear the canvas
  paintBrush.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the initial pattern of white and blue squares
  drawPattern(initialPattern);

  // Draw ticks on the selected squares
  selectedSquares.forEach((squareIndex) => {
    const x = squareIndex * squareWidth;

    // Draw a tick in the top right corner
    // ASCII tick to highlight the selected square canvas
    paintBrush.fillStyle = 'black';
    paintBrush.font = 'bold 20px Arial';
    const tickX = x + squareWidth - 20; // getting the x coordinates
    const tickY = 20; // getting the y coordinates
    paintBrush.fillText('✔', tickX, tickY);
  });
}

// Function to draw the initial pattern of white and blue squares on canvas
function drawPattern(pattern) {
  pattern.forEach((color, i) => {
    const x = i * squareWidth;
    const radius = squareWidth / 2;

    // Draw border for each square
    paintBrush.strokeStyle = 'black';
    paintBrush.lineWidth = 1.5;
    paintBrush.strokeRect(x, 0, squareWidth, canvas.height);

    // Set the fill style before drawing
    paintBrush.fillStyle = color;

    if (color === 'white') {
      // SNOWMAN
      // Draw big circle
      paintBrush.beginPath();
      paintBrush.arc(x + radius, radius + 20, radius - 25, 0, 2 * Math.PI);
      paintBrush.fillStyle = '#a6d9ff'; // Set fill color
      paintBrush.fill();

      // Draw small circle on top of the big circle
      paintBrush.beginPath();
      paintBrush.arc(x + radius, radius - 15, radius - 35, 0, 2 * Math.PI);
      paintBrush.fillStyle = '#a6d9ff'; // Set fill color
      paintBrush.fill();
      paintBrush.strokeStyle = color; // Set stroke color
      paintBrush.stroke();

      // Eye Left
      const leftEyeRadius = 2;
      const leftEyeOffsetX = 5;
      const leftEyeOffsetY = 38;
      paintBrush.beginPath();
      paintBrush.arc(
        x + radius - leftEyeOffsetX,
        radius + 20 - leftEyeOffsetY,
        leftEyeRadius,
        0,
        2 * Math.PI
      );
      paintBrush.fillStyle = 'black';
      paintBrush.fill();

      // Eye Right
      const rightEyeRadius = 2;
      const rightEyeOffsetX = -5;
      const rightEyeOffsetY = 38;
      paintBrush.beginPath();
      paintBrush.arc(
        x + radius - rightEyeOffsetX,
        radius + 20 - rightEyeOffsetY,
        rightEyeRadius,
        0,
        2 * Math.PI
      );
      paintBrush.fillStyle = 'black';
      paintBrush.fill();

      // Nose - Carrot
      const triangleSize = 15;
      const triangleOffsetX = 0;
      const triangleOffsetY = -12;
      paintBrush.beginPath();
      paintBrush.moveTo(
        x + radius + triangleOffsetX,
        radius + triangleOffsetY - triangleSize / 8
      );
      paintBrush.lineTo(
        x + radius + triangleOffsetX,
        radius + triangleOffsetY + triangleSize / 8
      );
      paintBrush.lineTo(
        x + radius + triangleOffsetX + triangleSize,
        radius + triangleOffsetY
      );
      paintBrush.closePath();
      paintBrush.fillStyle = 'orange'; // Set fill color for the nose
      paintBrush.fill();
      paintBrush.strokeStyle = 'black'; // Set stroke color for the nose
      paintBrush.stroke();

      // Draw black rectangle for a hat
      const hatWidth = 25;
      const hatHeight = 20;
      paintBrush.fillStyle = 'black';
      paintBrush.fillRect(x + radius - hatWidth / 2, 6, hatWidth, hatHeight);

      // Button
      const buttonRadius = 2;
      const buttonOffsetX = 0;
      const buttonOffsetY = 10;
      paintBrush.beginPath();
      paintBrush.arc(
        x + radius - buttonOffsetX,
        radius + 20 - buttonOffsetY,
        buttonRadius,
        0,
        2 * Math.PI
      );
      paintBrush.fillStyle = 'black';
      paintBrush.fill();
    } else {
      // FISH
      // Draw fish inside the blue square
      paintBrush.beginPath();
      paintBrush.arc(
        x + squareWidth / 2,
        canvas.height / 2,
        15,
        0,
        Math.PI * 2
      );
      paintBrush.fillStyle = '#FFAE42';
      paintBrush.fill();
      paintBrush.closePath();

      // Tail
      paintBrush.beginPath();
      paintBrush.moveTo(x + squareWidth / 2 + 15, canvas.height / 2);
      paintBrush.lineTo(x + squareWidth / 2 + 30, canvas.height / 2 - 5);
      paintBrush.lineTo(x + squareWidth / 2 + 30, canvas.height / 2 + 5);
      paintBrush.fillStyle = '#FFAE42';
      paintBrush.fill();
      paintBrush.closePath();

      // Eye
      paintBrush.beginPath();
      paintBrush.arc(
        x + squareWidth / 2 - 5,
        canvas.height / 2 - 5,
        3,
        0,
        Math.PI * 2
      );
      paintBrush.fillStyle = 'white';
      paintBrush.fill();
      paintBrush.closePath();
    }
  });
}

// Function to generate the initial pattern of white and blue squares
function generatePattern() {
  let pattern = [];
  let consecutiveCount = 0;

  for (let i = 0; i < 5; i++) {
    let color;

    if (consecutiveCount >= 2) {
      color = 'white';
      consecutiveCount = 0;
    } else if (consecutiveCount === 0 && i === 4) {
      // Ensure the last square is different from the previous one
      color = pattern[i - 1] === 'white' ? 'blue' : 'white';
    } else {
      color = Math.random() < 0.5 ? 'blue' : 'white';
      consecutiveCount = color === 'blue' ? consecutiveCount + 1 : 0;
    }

    pattern.push(color);
  }

  // Shuffle the pattern to add randomness
  pattern = shuffleArray(pattern);

  return pattern;
}

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to get a random sentence with specific instructions
function getRandomSentence() {
  const sentences = [
    'Select all the squares that contain a snowman',
    'Select all the squares that contain a fish',
  ];

  const randomIndex = Math.floor(Math.random() * sentences.length);
  return sentences[randomIndex];
}

// Function to verify the selected squares
function verifySelection() {
  const messageDisplay = document.getElementById('messageDisplay');
  const requiredColor = randomSentenceElement.textContent.includes('snowman')
    ? 'white'
    : 'blue';

  const correctSquares = initialPattern.reduce((acc, color, index) => {
    if (color === requiredColor) {
      acc.push(index);
    }
    return acc;
  }, []);

  const incorrectSquares = selectedSquares.filter(
    (squareIndex) => !correctSquares.includes(squareIndex)
  );

  if (
    incorrectSquares.length === 0 &&
    selectedSquares.length === correctSquares.length
  ) {
    messageDisplay.textContent = 'Hooray, Correct!';
    messageDisplay.style.color = 'green'; // Set color to green
    // Reset consecutive incorrect count on correct answer
    consecutiveIncorrectCount = 0;
  } else {
    // Increment consecutive incorrect count on incorrect answer
    consecutiveIncorrectCount++;

    // Check if consecutive incorrect count exceeds 2 tries
    if (consecutiveIncorrectCount >= MAX_CONSECUTIVE_INCORRECT) {
      messageDisplay.textContent =
        'You are out of guesses. Hit reinitialise button to restart the game.';
      messageDisplay.style.color = 'red'; // Set color to red for error
      // Disable the verify button so user can no longer trigger incorrect answers
      verifyButton.disabled = true;
      return; // Exit the function to prevent showing "Oops, Try Again!" message
    }

    messageDisplay.textContent = 'Oops, Try Again!';
    messageDisplay.style.color = 'red'; // Set color to red for error
  }
}

// Function to reinitialize the canvas and selected squares
function reinitialiseCanvas() {
  selectedSquares.length = 0;
  initialPattern.length = 0;

  // Generate a new pattern
  initialPattern.push(...generatePattern());

  // Display a random sentence
  randomSentenceElement.textContent = getRandomSentence();

  // Redraw the canvas
  redrawSelectedSquares();

  // Enable the verify button
  verifyButton.disabled = false;

  // Reset consecutive incorrect count
  consecutiveIncorrectCount = 0;
}

// Add event listener for the verifyButton
const verifyButton = document.querySelector('.buttons button:nth-child(1)');
verifyButton.addEventListener('click', verifySelection);

// Add event listener for the Reinitialise button
const reinitialiseButton = document.querySelector(
  '.buttons button:nth-child(2)'
);
reinitialiseButton.addEventListener('click', reinitialiseCanvas);

// Initial draw
drawPattern(initialPattern);
