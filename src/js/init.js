import { CardsService } from './cards-service';
import { Cards } from './cards';
import { PointOfViewController } from './point-of-view-controller';
import {
  leftArrowElement,
  rightArrowElement,
  card1PositionElement,
  modalHideButtonElement,
  customizeButtonElement,
  povElement
} from './html-elements';

function init() {
  const cardsService = new CardsService();
  const cards = new Cards(cardsService);
  const pointOfViewController = new PointOfViewController(cardsService);

  // set cards dimensions
  pointOfViewController.updateCards();

  // create initial animations
  cardsService.updateAnimations();

  // show cards after their dimensions have been set
  cards.showCards();

  // init pov controller container and cards profiles
  pointOfViewController.initPovController();

  // add event listeners
  leftArrowElement.addEventListener('click', () => cards.previous());
  rightArrowElement.addEventListener('click', () => cards.next());
  card1PositionElement.addEventListener('click', () => cards.showModal());
  modalHideButtonElement.addEventListener('click', () => cards.hideModal());
  customizeButtonElement.addEventListener('click', () => pointOfViewController.onCustomizeBtnClick());
  povElement.addEventListener('mousedown', () => pointOfViewController.onMouseDown());
  document.addEventListener('mouseup', () => pointOfViewController.onMouseUp());
  window.addEventListener('resize', () => pointOfViewController.getWindowInnerHeight());
}

export { init };
