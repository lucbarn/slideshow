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
  frontProfileElement,
  card1ProfileElement,
  card2ProfileElement,
  card3ProfileElement,
  backProfileElement
} from "./html-elements";

class CardsService {

  constructor() {
    this.cardsElements = [frontElement, card1Element, card2Element, card3Element, backElement];
    this.cardsImgsElements = [frontImgElement, card1ImgElement, card2ImgElement, card3ImgElement, backImgElement];
    this.cardsProfiles = [frontProfileElement, card1ProfileElement, card2ProfileElement, card3ProfileElement, backProfileElement];

    this.forwardTransitionFront;
    this.forwardTransitionCard1;
    this.forwardTransitionCard2;
    this.forwardTransitionCard3;

    this.backwardTransitionCard1;
    this.backwardTransitionCard2;
    this.backwardTransitionCard3;
    this.backwardTransitionBack;

    this.isBordersMode = false;
  }

  updateBordersMode(isBordersMode) {
    this.isBordersMode = isBordersMode;
  }

  createAnimation(element, opacity) {
    const from = {};
    const to = {
      width: element.style.width,
      height: element.style.height,
      transform: element.style.transform
    };
  
    if (opacity != null) {
      to.opacity = opacity;
    }
  
    return [from, to];
  }
    
  updateAnimations() {
    this.forwardTransitionFront = this.createAnimation(card1Element, 1);
    this.forwardTransitionCard1 = this.createAnimation(card2Element);
    this.forwardTransitionCard2 = this.createAnimation(card3Element);
    this.forwardTransitionCard3 = this.createAnimation(backElement, 0);
  
    this.backwardTransitionCard1 = this.createAnimation(frontElement, 0);
    this.backwardTransitionCard2 = this.createAnimation(card1Element);
    this.backwardTransitionCard3 = this.createAnimation(card2Element);
    this.backwardTransitionBack = this.createAnimation(card3Element, 1);
  }

  getCardsElements() {
    return this.cardsElements;
  }

  getCardsImgsElements() {
    return this.cardsImgsElements;
  }

  getCardsProfiles() {
    return this.cardsProfiles;
  }
}

export { CardsService };
