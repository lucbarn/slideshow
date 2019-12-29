const front = document.getElementById('front');
const card1 = document.getElementById('card1');
const card2 = document.getElementById('card2');
const card3 = document.getElementById('card3');
const back = document.getElementById('back');

const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const hideModalButton = document.getElementById('modal-hide-button');

const backgrounds = ['green', 'blue', 'orange', 'red', 'purple'];
const bgLength = backgrounds.length;
let animationInProgress = false;
// head is the index of the front card in the backgrounds array
let head = 0;

function next() {
  if (animationInProgress) {
    return;
  }
  animationInProgress = true;
  // the slideshow animation gets triggered only if the screen is sufficiently large
  if (window.outerWidth > 800) {
    front.style.animationName = 'forward_transition_front';
    card1.style.animationName = 'forward_transition_card1';
    card2.style.animationName = 'forward_transition_card2';
    card3.style.animationName = 'forward_transition_card3';
    back.style.animationName = 'forward_transition_back';
  }

  head = (bgLength + head - 1) % bgLength;

  setTimeout(function() {
    front.style.backgroundColor = backgrounds[head];
    card1.style.backgroundColor = backgrounds[(head + 1) % bgLength];
    card2.style.backgroundColor = backgrounds[(head + 2) % bgLength];
    card3.style.backgroundColor = backgrounds[(head + 3) % bgLength];
    back.style.backgroundColor = backgrounds[(head + 4) % bgLength];
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

  head = (head + 1) % bgLength;

  setTimeout(function() {
    front.style.backgroundColor = backgrounds[head];
    card1.style.backgroundColor = backgrounds[(head + 1) % bgLength];
    card2.style.backgroundColor = backgrounds[(head + 2) % bgLength];
    card3.style.backgroundColor = backgrounds[(head + 3) % bgLength];
    back.style.backgroundColor = backgrounds[(head + 4) % bgLength];
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
  modalImg.style.backgroundColor = backgrounds[(head + 1) % bgLength];
}

function hideModal() {
  document.body.style.overflowY = 'auto';
  modal.style.display = 'none';
}
