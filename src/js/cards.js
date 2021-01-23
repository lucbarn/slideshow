import { srcs } from './images-sources';
import {
  frontElement,
  card1Element,
  card2Element,
  card3Element,
  backElement,
  frontImgElement,
  card1ImgElement,
  card2ImgElement,
  card3ImgElement,
  backImgElement,
  modalElement,
  modalImgElement,
  card1PositionElement
} from './html-elements';

class Cards {

  constructor(cardsService) {
    this.cardsService = cardsService;

    this.basicAnimationDuration = 50;
    this.animationOptions = {
      duration: 300,
      fill: 'forwards',
      easing: 'ease-in-out'
    };
    this.srcsLength = srcs.length;
    this.isAnimationInProgress = false;
    // head is the index of the front card in the srcs array
    this.headPosition = 0;
    this.cardsElements = this.cardsService.getCardsElements();
  }

  /**
   * Returns whether the window's width is sufficient in order to display the animation.
   */
  get isMinWidthWindow() {
    const minWidth = 800;
    return window.outerWidth > minWidth;
  }

  setImgsSources() {
    const imgsElements = this.cardsService.getCardsImgsElements();
    imgsElements.forEach((img, i) => img.src = srcs[i]);
  }

  showCards() {
    this.cardsElements
      .concat(card1PositionElement)
      .forEach(element => element.style.visibility = 'visible');
  }

  showModal() {
    if (this.cardsService.isBordersMode) {
      return;
    }
    document.body.style.overflowY = 'hidden';
    modalElement.style.display = 'block';
    modalImgElement.src = srcs[(this.headPosition + 1) % this.srcsLength];
  }
  
  hideModal() {
    document.body.style.overflowY = 'auto';
    modalElement.style.display = 'none';
  }

  next() {
    if (this.isAnimationInProgress) {
      return;
    }

    let forwardFrontAnimation;
    let forwardCard1Animation;
    let forwardCard2Animation;
    let forwardCard3Animation;

    this.isAnimationInProgress = true;

    if (this.isMinWidthWindow) {
      forwardFrontAnimation = frontElement.animate(this.cardsService.forwardTransitionFront, this.animationOptions);
      forwardCard1Animation = card1Element.animate(this.cardsService.forwardTransitionCard1, this.animationOptions);
      forwardCard2Animation = card2Element.animate(this.cardsService.forwardTransitionCard2, this.animationOptions);
      forwardCard3Animation = card3Element.animate(this.cardsService.forwardTransitionCard3, this.animationOptions);
    }

    this.headPosition = (this.srcsLength + this.headPosition - 1) % this.srcsLength;

    setTimeout(() => {
      frontImgElement.src = srcs[this.headPosition];
      card1ImgElement.src = srcs[(this.headPosition + 1) % this.srcsLength];
      card2ImgElement.src = srcs[(this.headPosition + 2) % this.srcsLength];
      card3ImgElement.src = srcs[(this.headPosition + 3) % this.srcsLength];
      backImgElement.src = srcs[(this.headPosition + 4) % this.srcsLength];

      forwardFrontAnimation.cancel();
      forwardCard1Animation.cancel();
      forwardCard2Animation.cancel();
      forwardCard3Animation.cancel();

      this.isAnimationInProgress = false;
    }, this.isMinWidthWindow ? this.animationOptions.duration : this.basicAnimationDuration);
  }

  previous() {
    if (this.isAnimationInProgress) {
      return;
    }

    let backwardBackAnimation;
    let backwardCard3Animation;
    let backwardCard2Animation;
    let backwardCard1Animation;

    this.isAnimationInProgress = true;

    if (this.isMinWidthWindow) {
      backwardBackAnimation = backElement.animate(this.cardsService.backwardTransitionBack, this.animationOptions);
      backwardCard3Animation = card3Element.animate(this.cardsService.backwardTransitionCard3, this.animationOptions);
      backwardCard2Animation = card2Element.animate(this.cardsService.backwardTransitionCard2, this.animationOptions);
      backwardCard1Animation = card1Element.animate(this.cardsService.backwardTransitionCard1, this.animationOptions);
    }

    this.headPosition = (this.headPosition + 1) % this.srcsLength;

    setTimeout(() => {
      frontImgElement.src = srcs[this.headPosition];
      card1ImgElement.src = srcs[(this.headPosition + 1) % this.srcsLength];
      card2ImgElement.src = srcs[(this.headPosition + 2) % this.srcsLength];
      card3ImgElement.src = srcs[(this.headPosition + 3) % this.srcsLength];
      backImgElement.src = srcs[(this.headPosition + 4) % this.srcsLength];

      backwardBackAnimation.cancel();
      backwardCard3Animation.cancel();
      backwardCard2Animation.cancel();
      backwardCard1Animation.cancel();

      this.isAnimationInProgress = false;
    }, this.isMinWidthWindow ? this.animationOptions.duration : this.basicAnimationDuration);
  }

}

export { Cards };
