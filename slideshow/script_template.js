const front = document.getElementById('front');
const card1 = document.getElementById('card1');
const card2 = document.getElementById('card2');
const card3 = document.getElementById('card3');
const back = document.getElementById('back');

const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const hideModalButton = document.getElementById('modal-hide-button');

const srcs = [
  "https://source.unsplash.com/1fUu0dratoM/1200x900",
  "https://source.unsplash.com/n20DUSVsUk8/1200x900",
  "https://source.unsplash.com/ppnnu5-9bgI/1200x900",
  "https://source.unsplash.com/vgxIfXwsUAE/1200x900",
  "https://source.unsplash.com/KhhOAsE5M6Y/1200x900"
];
const srcsLength = srcs.length;
let animationInProgress = false;
// head is the index of the front card in the srcs array
let head = 0;

function next() {
  if (animationInProgress) {
    return;
  }
  animationInProgress = true;
  // the slideshow animation is triggered only if the screen is sufficiently large
  if (window.outerWidth > 800) {
    front.style.animationName = 'forward_transition_front';
    card1.style.animationName = 'forward_transition_card1';
    card2.style.animationName = 'forward_transition_card2';
    card3.style.animationName = 'forward_transition_card3';
    back.style.animationName = 'forward_transition_back';
  }

  head = (srcsLength + head - 1) % srcsLength;

  setTimeout(function() {
    front.src = srcs[head];
    card1.src = srcs[(head + 1) % srcsLength];
    card2.src = srcs[(head + 2) % srcsLength];
    card3.src = srcs[(head + 3) % srcsLength];
    back.src = srcs[(head + 4) % srcsLength];
    front.style.animationName = 'none';
    card1.style.animationName = 'none';
    card2.style.animationName = 'none';
    card3.style.animationName = 'none';
    back.style.animationName = 'none';
    animationInProgress = false;
  }, (window.outerWidth > 800) ? 500:50);
}

function previous() {
  if (animationInProgress) {
    return;
  }
  animationInProgress = true;
  if (window.outerWidth > 800) {
    back.style.animationName = 'backward_transition_back';
    card3.style.animationName = 'backward_transition_card3';
    card2.style.animationName = 'backward_transition_card2';
    card1.style.animationName = 'backward_transition_card1';
    front.style.animationName = 'backward_transition_front';
  }

  head = (head + 1) % srcsLength;

  setTimeout(function() {
    front.src = srcs[head];
    card1.src = srcs[(head + 1) % srcsLength];
    card2.src = srcs[(head + 2) % srcsLength];
    card3.src = srcs[(head + 3) % srcsLength];
    back.src = srcs[(head + 4) % srcsLength];
    back.style.animationName = 'none';
    card3.style.animationName = 'none';
    card2.style.animationName = 'none';
    card1.style.animationName = 'none';
    front.style.animationName = 'none';
    animationInProgress = false;
  }, (window.outerWidth > 800) ? 500:50);
}

function showModal() {
  document.body.style.overflowY = 'hidden';
  modal.style.display = 'block';
  modalImg.src = srcs[(head + 1) % srcsLength];
}

function hideModal() {
  document.body.style.overflowY = 'auto';
  modal.style.display = 'none';
}







const controlsContainer = document.getElementById('controls-container');
const pov = document.getElementById('pov');
const povArea = document.getElementById('pov-area');
const cardsContainer = document.getElementById('cards-container');
const card1Position = document.getElementById('card1-position');
const imagesWrapper = document.getElementById('images-wrapper');
const cards = [front, card1, card2, card3, back];

const povContainerCardsDistance = @povContainerCardsDistanceIntPlaceholder;
const povContainerSide = @povContainerSideIntPlaceholder;
// ratio between theoretical cards dimensions and positions and relative values as
// displayed in the controls container
const controlsContainerScale = @controlsContainerScalePlaceholder;
// theoretical height of each card
const cardsHeight = @cardsHeightIntPlaceholder;
// space between cards, the first card is placed on the y-axis, the others to its left
const spaceBetweenCards = @spaceBetweenCardsIntPlaceholder;

// (x0, y0) -> initial position of the point of view
const x0 = (povContainerCardsDistance + povContainerSide / 2) * controlsContainerScale;
const y0 = cardsHeight / 2;
// ratio between width and height of each card
const widthHeightRatio = 4 / 3;
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

  const styleUpdatedValues = [];

  for (let i = 0; i < 5; i++) {
    y1 = (py * spaceBetweenCards * i) / (px + spaceBetweenCards * i);
    y2 = (cardsHeight * px + py * spaceBetweenCards * i) / (px + spaceBetweenCards * i);
    scaleCoefficient = windowHeight / (2 * px);
    height = (y2-y1) * scaleCoefficient;
    width = height * widthHeightRatio;
    verticalTranslation = y1 * scaleCoefficient;
    // cards[i].style.height = `${height}px`;
    // cards[i].style.width =  `${width}px`;
    // cards[i].style.transform = `translateY(${-1 * verticalTranslation}px) translateX(-50%)`;
    styleUpdatedValues.push({height, width, verticalTranslation});
  }

  const card1VerticalTranslation = styleUpdatedValues[1]['verticalTranslation'];
  const heightDifference = styleUpdatedValues[0]['height'] - styleUpdatedValues[1]['height'];

  for (let i = 0; i < 5; i++) {
    const { height, width, verticalTranslation } = styleUpdatedValues[i];
    cards[i].style.height = `${height}px`;
    cards[i].style.width =  `${width}px`;
    // vertical translation of each card is divided as follows:
    // 1) verticalTranslation -> specific to each card
    // 2) card1VerticalTranslation -> relative to card 1, this is in order to push card 1
    //    to the bottom of cards container
    // 3) heightDifference / 2 -> relative to card 1 and cards container, this is in order
    //    to push card 1 from the bottom of cards container (see previous point) to the
    //    center of cards container
    // without points 2 and 3 card 1 would not be aligned with arrows (which are vertically
    // aligned with the center of cards container) and would move up and down while draggind
    // the pov
    cards[i].style.transform = `translate3d(-50%, ${card1VerticalTranslation - verticalTranslation - heightDifference / 2}px, 0)`;
  }

  cardsContainer.style.width = front.style.width;
  cardsContainer.style.height = front.style.height;

  card1Position.style.width = card1.style.width;
  card1Position.style.height = card1.style.height;
  card1Position.style.transform = card1.style.transform;
}

let cornerX;
let cornerY;
const xLimit = povContainerSide;
const yLimit = povContainerSide;

function movePov(event) {
  // prevent elements highlighting while dragging the pov
  event.preventDefault();
  const x = event.clientX;
  const y = event.clientY;
  let xPos;
  let yPos;

  // keep pov inside its container
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
  px = (xPos + povContainerCardsDistance) * controlsContainerScale;
  py = ((yLimit - yPos) - (yLimit - cardsHeight / controlsContainerScale) / 2) * controlsContainerScale;
  updateCards();
}

let controlsVisible = false;

function onCustomizeBtnClick(event) {
  if (!controlsVisible) {
    controlsContainer.classList.add('visible');
    controlsVisible = true;
  } else {
    controlsContainer.classList.remove('visible');
    controlsVisible = false;
  }
}

pov.addEventListener('mousedown', function() {
  povArea.style.backgroundColor = 'rgba(150,150,150,0.1)';
  cornerX = povArea.getBoundingClientRect().x;
  cornerY = povArea.getBoundingClientRect().y;
  document.addEventListener('mousemove', movePov);
});

document.addEventListener('mouseup', function(event) {
  povArea.style.backgroundColor = '';
  document.removeEventListener('mousemove', movePov);

  // when the controls container div is visible close it if
  // an element outside of its area is clicked; if the element
  // is customize button then the closing action is handled by
  // onCustomizeBtnClick method
  if (controlsVisible
        && event.target.closest('div#controls-container') === null
        && event.target.closest('div#customize-btn') === null) {
    controlsContainer.classList.remove('visible');
    controlsVisible = false;
  }
});

window.addEventListener('resize', function() {
  windowHeight = window.innerHeight
});
