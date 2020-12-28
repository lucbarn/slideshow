import { frontElement, card1Element, card2Element, card3Element, backElement } from "./html-elements";

class AnimationService {
  constructor() {
    this.forwardTransitionFront = null;
    this.forwardTransitionCard1 = null;
    this.forwardTransitionCard2 = null;
    this.forwardTransitionCard3 = null;

    this.backwardTransitionCard1 = null;
    this.backwardTransitionCard2 = null;
    this.backwardTransitionCard3 = null;
    this.backwardTransitionBack = null;
  }

  createAnimation(element, opacity) {
    const from = {};
    const to = {
      width: element.style.width,
      height: element.style.height,
      transform: element.style.transform
    };
  
    if (opacity !== undefined) {
      to.opacity = opacity;
    }
  
    return [from, to];
  }
    
  updateAnimations() {
    this.forwardTransitionFront = createAnimation(card1Element, 1);
    this.forwardTransitionCard1 = createAnimation(card2Element);
    this.forwardTransitionCard2 = createAnimation(card3Element);
    this.forwardTransitionCard3 = createAnimation(backElement, 0);
  
    this.backwardTransitionCard1 = createAnimation(frontElement, 0);
    this.backwardTransitionCard2 = createAnimation(card1Element);
    this.backwardTransitionCard3 = createAnimation(card2Element);
    this.backwardTransitionBack = createAnimation(card3Element, 1);
  }
}

export { AnimationService };
