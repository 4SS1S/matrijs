const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789あかさたなはまやらわがざだばぱいきしちにひみりゐぎじぢびぴうく';
const fontSize = 16;
let fallingLetters = [];
const maxLetterCount = Math.floor(canvas.width / fontSize) * 10;
let framers = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class MatrixEffect {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    const letter = chars[Math.floor(Math.random() * chars.length)];
    this.speed = Math.random() * 0.1 + 0.1;

    const fontColor = `rgba(
      ${this.randomNumberGenerator(0, 100)},
      ${this.randomNumberGenerator(200, 255)},
      ${this.randomNumberGenerator(0, 100)},
      ${Math.random() * (1 - 0.4) + 0.4})`;
    ctx.fillStyle = fontColor;
    ctx.font = `${fontSize}px pan-serif`;
    ctx.fillText(letter, this.x, this.y);
    this.y += this.speed * 100;

    if (this.y > canvas.height) {
      this.y = (Math.random() * canvas.height) - fontSize / 2 - 50;
      this.x = this.randomNumberGenerator(0, canvas.width);
    }

    this.speed = this.randomNumberGenerator(1, 100);
  }

  randomNumberGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}


const drawBlack = () => {
  ctx.beginPath();
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fill();
}

let row = 0;

drawBlack();

const animation = () => {
  if(fallingLetters.length < maxLetterCount) {
    let fallingChar = new MatrixEffect(
      Math.floor(Math.random() * canvas.width),
      Math.floor(Math.random() * canvas.height)
    );

    fallingLetters.push(fallingChar);
  }

  ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * (0.25 - 0.1) + 0.1})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < fallingLetters.length && framers % 2 === 0; i++) {
    fallingLetters[i].draw();
  }


  setTimeout(() => {
    requestAnimationFrame(animation);
  }, 25);
  
  framers++;
}

animation();