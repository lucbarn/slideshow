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
