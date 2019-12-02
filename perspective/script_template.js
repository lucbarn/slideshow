const front = document.getElementById('front');
const card1 = document.getElementById('card1');
const card2 = document.getElementById('card2');
const card3 = document.getElementById('card3');
const back = document.getElementById('back');
const cardsContainer = document.getElementById('cards-container');
const modalBtn = document.getElementById("modal-btn");
const modal = document.getElementById("modal");
const elements = [front, card1, card2, card3, back];
// (x0, y0) -> initial position of the point of view
const x0 = (pov_container_cards_distance_int_placeholder + pov_container_side_int_placeholder / 2) * cards_scale_placeholder;
const y0 = cards_height_int_placeholder / 2;
const widthHeightRatio = 4 / 3;
// the theoretical values of the height of each card and the space between the
// the cards; the first card is placed on the y-axis, the others to its left
const cardsHeight = cards_height_int_placeholder;
const spaceBetweenCards = space_between_cards_int_placeholder;
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
  let width;
  let verticalTranslation;
  for (let i = 0; i < 5; i++) {
    y1 = (py * spaceBetweenCards * i) / (px + spaceBetweenCards * i);
    y2 = (cardsHeight * px + py * spaceBetweenCards * i) / (px + spaceBetweenCards * i);
    scaleCoefficient = windowHeight / (2 * px);
    height = (y2-y1) * scaleCoefficient;
    width = height * widthHeightRatio;
    verticalTranslation = y1 * scaleCoefficient;
    elements[i].style.height = `${height}px`;
    elements[i].style.width =  `${width}px`;
    elements[i].style.transform = `translateY(${-1 * verticalTranslation}px) translateX(-50%)`;
  }
  cardsContainer.style.width = front.style.width;
  cardsContainer.style.height = front.style.height;
}

updateCards();

const pov = document.getElementById('pov');
const povArea = document.getElementById('pov-area');
let cornerX = povArea.getBoundingClientRect().x;
let cornerY = povArea.getBoundingClientRect().y;
const xLimit = pov_container_side_int_placeholder;
const yLimit = pov_container_side_int_placeholder;

function movePov(event) {
  event.preventDefault();
  const x = event.clientX;
  const y = event.clientY;
  let xPos;
  let yPos;
  if (x > cornerX + xLimit / 2) {
    xPos = Math.min(x - cornerX, xLimit);
  } else {
    xPos = Math.max(x - cornerX, 0);
  }
  if (y > cornerY + yLimit / 2) {
    yPos = Math.min(y - cornerY, yLimit);
  } else {
    yPos = Math.max(y - cornerY, 0);
  }
  pov.style.left = `${xPos}px`;
  pov.style.top = `${yPos}px`;
  px = (xPos + pov_container_cards_distance_int_placeholder) * cards_scale_placeholder;
  py = ((yLimit - yPos) - (yLimit - cards_height_int_placeholder / cards_scale_placeholder) / 2) * cards_scale_placeholder;
  updateCards();
}

function showModal() {
  modal.style.display = 'block';
  setTimeout(function() {
    modal.style.opacity = '1';
  }, 1);
}

function hideModal() {
  modal.style.display = 'none';
  modal.style.opacity = '0';
}

modalBtn.addEventListener('click', showModal);
modal.addEventListener('click', hideModal);

pov.addEventListener('mousedown', function() {
  povArea.style.backgroundColor = 'rgba(0,0,100,0.1)';
  document.addEventListener('mousemove', movePov);
});

document.addEventListener('mouseup', function() {
  povArea.style.backgroundColor = '';
  document.removeEventListener('mousemove', movePov);
});
