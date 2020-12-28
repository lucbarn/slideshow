import { AnimationService } from './animation-service';
import { Cards } from './cards';
import {
  leftArrowElement,
  rightArrowElement,
  card1PositionElement,
  modalHideButtonElement,
  frontElement,
  card1Element,
  card2Element,
  card3Element,
  backElement,
  card1PositionElement
} from './html-elements';

function init() {
  const animationService = new AnimationService();
  const cards = new Cards(animationService);
  const pointOfViewController = new pointOfViewController(animationService);

  pointOfViewController.updateCards();
  animationService.updateAnimations();

  // show cards after their dimensions have been set
  const cardsElements = [frontElement, card1Element, card2Element, card3Element, backElement];
  cardsElements
    .concat(card1PositionElement)
    .forEach(element => element.style.visibility = 'visible');

  // init pov container
  povContainer.style.width = `${povContainerSide}px`;
  povContainer.style.height = `${povContainerSide}px`;
  povContainer.style.margin = `10px 10px 10px ${povContainerCardsDistance}px`;

  const cardsProfiles = [frontProfile, card1Profile, card2Profile, card3Profile, backProfile];

  // init cards profiles
  let cardProfile;
  for (let i = 0; i < cardsProfiles.length; i++) {
    cardProfile = cardsProfiles[i];
    cardProfile.style.height = `${cardsHeight / controlsContainerScale}px`;
    if (i < cardsProfiles.length-1) {
      cardProfile.style.margin = `auto 0 auto ${space / controlsContainerScale}px`;
    } else {
      // backProfile has no left margin
      cardProfile.style.margin = 'auto 0';
    }
  }

  leftArrowElement.addEventListener('click', () => cards.previous());
  rightArrowElement.addEventListener('click', () => cards.next());
  card1PositionElement.addEventListener('click', () => cards.showModal());
  modalHideButtonElement.addEventListener('click', () => cards.hideModal());
}

export { init };
