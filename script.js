var backgrounds = ['green',
                   'blue',
                   'orange',
                   'red',
                   'purple']

var front = document.getElementById('front');
var tile1 = document.getElementById('tile1');
var tile2 = document.getElementById('tile2');
var tile3 = document.getElementById('tile3');
var back = document.getElementById('back');

function next() {
  if (window.outerWidth > 800) {
    front.style.animationName = 'forward_transition_front';
    tile1.style.animationName = 'forward_transition_tile1';
    tile2.style.animationName = 'forward_transition_tile2';
    tile3.style.animationName = 'forward_transition_tile3';
    back.style.animationName = 'forward_transition_back';
  }
  backgrounds = [backgrounds.pop()].concat(backgrounds);
  setTimeout(function() {
    front.style.backgroundColor = backgrounds[0];
    tile1.style.backgroundColor = backgrounds[1];
    tile2.style.backgroundColor = backgrounds[2];
    tile3.style.backgroundColor = backgrounds[3];
    back.style.backgroundColor = backgrounds[4];
    front.style.animationName = 'none';
    tile1.style.animationName = 'none';
    tile2.style.animationName = 'none';
    tile3.style.animationName = 'none';
    back.style.animationName = 'none';
  }, (window.outerWidth > 800) ? 500:50);
}

function previous() {
  if (window.outerWidth > 800) {
    back.style.animationName = 'backward_transition_back';
    tile3.style.animationName = 'backward_transition_tile3';
    tile2.style.animationName = 'backward_transition_tile2';
    tile1.style.animationName = 'backward_transition_tile1';
    front.style.animationName = 'backward_transition_front';
  }
  backgrounds = backgrounds.concat([backgrounds.shift()]);
  setTimeout(function() {
    front.style.backgroundColor = backgrounds[0];
    tile1.style.backgroundColor = backgrounds[1];
    tile2.style.backgroundColor = backgrounds[2];
    tile3.style.backgroundColor = backgrounds[3];
    back.style.backgroundColor = backgrounds[4];
    back.style.animationName = 'none';
    tile3.style.animationName = 'none';
    tile2.style.animationName = 'none';
    tile1.style.animationName = 'none';
    front.style.animationName = 'none';
  }, (window.outerWidth > 800) ? 500:50);
}

var modal = document.getElementById('modal');
var modalImg = document.getElementById('modal-img');
function showModal() {
  document.body.style.overflowY = 'hidden';
  modal.style.display = 'block';
  modalImg.style.backgroundColor = backgrounds[1];
}

var hideModalButton = document.getElementById('modal-hide-button');
function hideModal() {
  document.body.style.overflowY = 'auto';
  modal.style.display = 'none';
}
