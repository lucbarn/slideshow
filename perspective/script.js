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
// the theoretical values of the height of each card and the space between the
// the cards; the first card is placed on the y-axis, the others to its left
const cardsHeight = 480;
const spaceBetweenCards = 100;
// px and py are the coordinates of the point of view on the cartesian plane
let px = x0;
let py = y0;
let windowHeight = window.innerHeight;

function updateCards() {
  // y1 is the intersection between the line that connects the base of the card with
  // the point of view and the y axis
  let y1;
  // y2 is the intersection between the line that connects the top of the card with
  // the point of view and the y axis
  let y2;
  // given a viewing angle of 90 degrees, the height of the field of view is twice
  // the distance of the point of view from the y axis; assuming that the field of
  // view covers the height of the browser window, then the ratio between the
  // height of the field of view and the height of each card is equal to the height
  // of the browser window and the height of the first card displayed on the screen;
  // 2*px / cardsHeight == windowHeight / displayedCardsHeight or
  // displayedCardsHeight / cardsHeight == windowHeight / 2*px;
  // the scale coefficient is the ratio between the height of the displayed first
  // card and the theoretical height of each card
  let scaleCoefficient;
  let height;
  let translation;
  for (let i = 0; i < 5; i++) {
    y1 = (py * spaceBetweenCards * i) / (px + spaceBetweenCards * i);
    y2 = (cardsHeight * px + py * spaceBetweenCards * i) / (px + spaceBetweenCards * i);
    scaleCoefficient = windowHeight / (2 * px);
    height = (y2-y1) * scaleCoefficient;
    translation = y1 * scaleCoefficient;
    elements[i].style.height = height + 'px';
    elements[i].style.width = height * widthHeightRatio + 'px';
    elements[i].style.transform = 'translateY(' + -1 * translation + 'px) translateX(-50%)';
  }
  cardsContainer.style.width = front.style.width;
  cardsContainer.style.height = front.style.height;
}

updateCards();

const pov = document.getElementById('pov');
const povArea = document.getElementById('pov-area');
let cornerX = povArea.getBoundingClientRect().x;
let cornerY = povArea.getBoundingClientRect().y;
const xLimit = 200;
const yLimit = 150;

function movePov(event) {
  const x = event.clientX;
  const y = event.clientY;
  if (x > cornerX + xLimit / 2) {
    pov.style.left = `${ Math.min(x - cornerX, xLimit) }px`;
  } else {
    pov.style.left = `${ Math.max(x - cornerX, 0) }px`;
  }
  if (y > cornerY + yLimit / 2) {
    pov.style.top = `${ Math.min(y - cornerY, yLimit) }px`;
  } else {
    pov.style.top = `${ Math.max(y - cornerY, 0) }px`;
  }
}

pov.addEventListener('mousedown', function() {
  document.addEventListener('mousemove', movePov);
});

document.addEventListener('mouseup', function() {
  document.removeEventListener('mousemove', movePov);
});
