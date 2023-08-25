import { srcs } from './images-sources';
import { smallSizeWidth } from './resize';
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
  cardsService: any;
  basicAnimationDuration: number;
  animationOptions: any;
  srcsLength: number;
  isAnimationInProgress: boolean;
  headPosition: number;
  cardsElements: HTMLElement[];

  constructor(cardsService: any) {
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
   * Returns whether the window's width is large enough to display the animation.
   */
  get isMinWidthWindow() {
    const minWidth = smallSizeWidth;
    return window.innerWidth > minWidth;
  }

  setImgsSources() {
    const imgsElements = this.cardsService.getCardsImgsElements();
    imgsElements.forEach((img: HTMLImageElement, i: number) => img.src = srcs[i]);
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
    (modalImgElement as HTMLImageElement).src = srcs[(this.headPosition + 1) % this.srcsLength];
  }
  
  hideModal() {
    document.body.style.overflowY = 'auto';
    modalElement.style.display = 'none';
  }

  next() {
    if (this.isAnimationInProgress) {
      return;
    }

    let animationsAvailable = false;

    let forwardFrontAnimation: Animation;
    let forwardCard1Animation: Animation;
    let forwardCard2Animation: Animation;
    let forwardCard3Animation: Animation;

    this.isAnimationInProgress = true;

    if (this.isMinWidthWindow) {
      animationsAvailable = true;
      forwardFrontAnimation = frontElement.animate(this.cardsService.forwardTransitionFront, this.animationOptions);
      forwardCard1Animation = card1Element.animate(this.cardsService.forwardTransitionCard1, this.animationOptions);
      forwardCard2Animation = card2Element.animate(this.cardsService.forwardTransitionCard2, this.animationOptions);
      forwardCard3Animation = card3Element.animate(this.cardsService.forwardTransitionCard3, this.animationOptions);
    }

    this.headPosition = (this.srcsLength + this.headPosition - 1) % this.srcsLength;

    setTimeout(() => {
      (frontImgElement as HTMLImageElement).src = srcs[this.headPosition];
      (card1ImgElement as HTMLImageElement).src = srcs[(this.headPosition + 1) % this.srcsLength];
      (card2ImgElement as HTMLImageElement).src = srcs[(this.headPosition + 2) % this.srcsLength];
      (card3ImgElement as HTMLImageElement).src = srcs[(this.headPosition + 3) % this.srcsLength];
      (backImgElement as HTMLImageElement).src = srcs[(this.headPosition + 4) % this.srcsLength];

      if (animationsAvailable) {
        forwardFrontAnimation.cancel();
        forwardCard1Animation.cancel();
        forwardCard2Animation.cancel();
        forwardCard3Animation.cancel();
      }

      this.isAnimationInProgress = false;
    }, this.isMinWidthWindow ? this.animationOptions.duration : this.basicAnimationDuration);
  }

  previous() {
    if (this.isAnimationInProgress) {
      return;
    }

    let animationsAvailable = false;

    let backwardBackAnimation: Animation;
    let backwardCard3Animation: Animation;
    let backwardCard2Animation: Animation;
    let backwardCard1Animation: Animation;

    this.isAnimationInProgress = true;

    if (this.isMinWidthWindow) {
      animationsAvailable = true;
      backwardBackAnimation = backElement.animate(this.cardsService.backwardTransitionBack, this.animationOptions);
      backwardCard3Animation = card3Element.animate(this.cardsService.backwardTransitionCard3, this.animationOptions);
      backwardCard2Animation = card2Element.animate(this.cardsService.backwardTransitionCard2, this.animationOptions);
      backwardCard1Animation = card1Element.animate(this.cardsService.backwardTransitionCard1, this.animationOptions);
    }

    this.headPosition = (this.headPosition + 1) % this.srcsLength;

    setTimeout(() => {
      (frontImgElement as HTMLImageElement).src = srcs[this.headPosition];
      (card1ImgElement as HTMLImageElement).src = srcs[(this.headPosition + 1) % this.srcsLength];
      (card2ImgElement as HTMLImageElement).src = srcs[(this.headPosition + 2) % this.srcsLength];
      (card3ImgElement as HTMLImageElement).src = srcs[(this.headPosition + 3) % this.srcsLength];
      (backImgElement as HTMLImageElement).src = srcs[(this.headPosition + 4) % this.srcsLength];

      if (animationsAvailable) {
        backwardBackAnimation.cancel();
        backwardCard3Animation.cancel();
        backwardCard2Animation.cancel();
        backwardCard1Animation.cancel();
      }

      this.isAnimationInProgress = false;
    }, this.isMinWidthWindow ? this.animationOptions.duration : this.basicAnimationDuration);
  }

}

export { Cards };
