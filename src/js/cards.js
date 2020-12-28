import { srcs } from './images-sources';
import {
  frontElement,
  card1Element,
  card2Element,
  card3Element,
  backElement,
  modalElement,
  modalImgElement
} from './html-elements';

class Cards {

  #basicAnimationDuration = 50;
  #animationOptions = {
    duration: 300,
    fill: 'forwards'
  };
  #srcsLength = srcs.length;
  #isAnimationInProgress = false;
  // head is the index of the front card in the srcs array
  #headPosition = 0;

  constructor(animationService) {
    this.animationService = animationService;
  }

  /**
   * Returns whether the window's width is sufficient in order to display the animation.
   */
  get isMinWidthWindow() {
    const minWidth = 800;
    return window.outerWidth > minWidth;
  }

  initCardsSources() {
    frontElement.src = srcs[0];
    card1Element.src = srcs[1];
    card2Element.src = srcs[2];
    card3Element.src = srcs[3];
    backElement.src = srcs[4];
  }

  showModal() {
    document.body.style.overflowY = 'hidden';
    modalElement.style.display = 'block';
    modalImgElement.src = srcs[(this.#headPosition + 1) % this.#srcsLength];
  }
  
  hideModal() {
    document.body.style.overflowY = 'auto';
    modalElement.style.display = 'none';
  }

  next() {
    if (this.#isAnimationInProgress) {
      return;
    }

    let forwardFrontAnimation;
    let forwardCard1Animation;
    let forwardCard2Animation;
    let forwardCard3Animation;

    this.#isAnimationInProgress = true;

    if (this.isMinWidthWindow) {
      forwardFrontAnimation = frontElement.animate(this.animationService.forwardTransitionFront, this.#animationOptions);
      forwardCard1Animation = card1Element.animate(this.animationService.forwardTransitionCard1, this.#animationOptions);
      forwardCard2Animation = card2Element.animate(this.animationService.forwardTransitionCard2, this.#animationOptions);
      forwardCard3Animation = card3Element.animate(this.animationService.forwardTransitionCard3, this.#animationOptions);
    }

    this.#headPosition = (this.#srcsLength + this.#headPosition - 1) % this.#srcsLength;

    setTimeout(function() {
      frontElement.src = srcs[this.#headPosition];
      card1Element.src = srcs[(this.#headPosition + 1) % this.#srcsLength];
      card2Element.src = srcs[(this.#headPosition + 2) % this.#srcsLength];
      card3Element.src = srcs[(this.#headPosition + 3) % this.#srcsLength];
      backElement.src = srcs[(this.#headPosition + 4) % this.#srcsLength];

      forwardFrontAnimation.cancel();
      forwardCard1Animation.cancel();
      forwardCard2Animation.cancel();
      forwardCard3Animation.cancel();

      this.#isAnimationInProgress = false;
    }, this.isMinWidthWindow ? this.#animationOptions.duration : this.#basicAnimationDuration);
  }

  previous() {
    if (this.#isAnimationInProgress) {
      return;
    }

    let backwardBackAnimation;
    let backwardCard3Animation;
    let backwardCard2Animation;
    let backwardCard1Animation;

    this.#isAnimationInProgress = true;

    if (this.isMinWidthWindow) {
      backwardBackAnimation = backElement.animate(this.animationService.backwardTransitionBack, this.#animationOptions);
      backwardCard3Animation = card3Element.animate(this.animationService.backwardTransitionCard3, this.#animationOptions);
      backwardCard2Animation = card2Element.animate(this.animationService.backwardTransitionCard2, this.#animationOptions);
      backwardCard1Animation = card1Element.animate(this.animationService.backwardTransitionCard1, this.#animationOptions);
    }

    this.#headPosition = (this.#headPosition + 1) % this.#srcsLength;

    setTimeout(function() {
      frontElement.src = srcs[this.head];
      card1Element.src = srcs[(this.head + 1) % this.#srcsLength];
      card2Element.src = srcs[(this.head + 2) % this.#srcsLength];
      card3Element.src = srcs[(this.head + 3) % this.#srcsLength];
      backElement.src = srcs[(this.head + 4) % this.#srcsLength];

      backwardBackAnimation.cancel();
      backwardCard3Animation.cancel();
      backwardCard2Animation.cancel();
      backwardCard1Animation.cancel();

      this.#isAnimationInProgress = false;
    }, this.isMinWidthWindow ? this.#animationOptions.duration : this.#basicAnimationDuration);
  }

}
