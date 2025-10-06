const display = document.getElementById('display');      
const expressionEl = document.getElementById('expression'); 
const buttons = document.querySelectorAll('.btn');
const clearBtn = document.getElementById('clear');
const equalBtn = document.getElementById('equal');

let currentInput = '';

// Update both displays
function updateDisplay(result = '') {
  expressionEl.textContent = currentInput;   // show full expression
  display.value = result || '';              // show result if available
  display.scrollLeft = display.scrollWidth;  // auto-scroll horizontally
  expressionEl.scrollLeft = expressionEl.scrollWidth; // scroll expression too
}

// Button clicks
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    if (value) {
      currentInput += value;
      updateDisplay();
    }
  });
});

// Clear button
clearBtn.addEventListener('click', () => {
  currentInput = '';
  updateDisplay();
});

// Equal button
equalBtn.addEventListener('click', () => {
  try {
    const result = eval(currentInput);
    updateDisplay(result); // keep expression above, show result below
  } catch {
    display.value = 'Error';
  }
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  if ((e.key >= '0' && e.key <= '9') || ['+', '-', '*', '/', '.', '(', ')'].includes(e.key)) {
    currentInput += e.key;
    updateDisplay();
  } else if (e.key === 'Enter') {
    try {
      const result = eval(currentInput);
      updateDisplay(result);
    } catch {
      display.value = 'Error';
    }
  } else if (e.key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
  } else if (e.key.toLowerCase() === 'c') {
    currentInput = '';
    updateDisplay();
  }
});


// ======================
// 🎨 Math Background Animation
// ======================
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const symbols = ["1","2","3","4","5","6","7","8","9","0","+","−","×","÷","π","√","e"];
const fontSize = 20;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

function draw() {
  ctx.fillStyle = "rgba(13, 27, 42, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff99"; // neon green
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = symbols[Math.floor(Math.random() * symbols.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(draw, 50);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
