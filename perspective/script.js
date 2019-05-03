const front = document.getElementById('front');
const card1 = document.getElementById('card1');
const card2 = document.getElementById('card2');
const card3 = document.getElementById('card3');
const back = document.getElementById('back');
const cardsContainer = document.getElementById('cards-container');
const elements = [front, card1, card2, card3, back];
const x0 = 720;
const y0 = 240;
const widthHeightRatio = 4 / 3;
// px and py are the coordinates of the point of view
let px = x0;
let py = y0;
const cardsHeight = 480;
const spaceBetweenCards = 100;

function updateCards() {
  // y1 is the intersection between the line that connects the base of the card with
  // the point of view and the y axis
  let y1;
  // y2 is the intersection between the line that connects the top of the card with
  // the point of view and the y axis
  let y2;
  let scaleCoefficient;
  let height;
  let translation;
  for (let i = 0; i < 5; i++) {
    y1 = (py * spaceBetweenCards * i) / (px + spaceBetweenCards * i);
    y2 = (cardsHeight * px + py * spaceBetweenCards * i) / (px + spaceBetweenCards * i);
    scaleCoefficient = cardsHeight / px;
    height = (y2-y1) * scaleCoefficient;
    translation = y1 * scaleCoefficient;
    elements[i].style.height = height + 'px';
    elements[i].style.width = height * widthHeightRatio + 'px';
    // cards horizontally centered
    elements[i].style.left = (front.style.width.substring(0, front.style.width.length - 2) - height * widthHeightRatio) / 2 + 'px';
    elements[i].style.transform = 'translateY(' + -1 * translation + 'px)';
  }
  cardsContainer.style.width = front.style.width;
  cardsContainer.style.height = front.style.height;
}

updateCards();

const bars = document.getElementsByClassName('bar');
const circles = document.getElementsByClassName('circle');
let initialClientX;
const barWidth = bars[0].clientWidth;
const barX = bars[0].getBoundingClientRect().x;
const circleWidth = circles[0].clientWidth;
let circle;
let circleX;
// delta is the distance between the center of a circle and the center
// of the corresponding bar
let delta;
let sign;

function slide(event) {
  circleX = event.clientX - initialClientX + delta;
  circle.style.left = 'calc(50% ' + ((circleX < 0) ? '- ':'+ ') + Math.min(Math.abs(circleX), barWidth / 2) + 'px)';
  sign = ((circleX < 0) ? -1 : 1);
  if (circle.id === 'dx') {
    // update perspective height
    px = x0 + 1.5 * sign * Math.min(Math.abs(circleX), barWidth / 2);
  } else {
    // update perspective distance
    py = y0 + 2 * sign * Math.min(Math.abs(circleX), barWidth / 2);
  }
  updateCards();
}

for (let i = 0; i < circles.length; i++) {
  // closure necessary in order to keep the value of i
  (function(i) {
    circles[i].addEventListener('mousedown', function(event) {
      circle = circles[i];
      delta = (circle.getBoundingClientRect().x + circleWidth / 2) - (barX + barWidth / 2);
      initialClientX = event.clientX;
      document.addEventListener('mousemove', slide);
    });
  }(i));
}

document.addEventListener('mouseup', function() {
  document.removeEventListener('mousemove', slide);
});
