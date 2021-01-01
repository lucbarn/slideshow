import { CardsService } from './cards-service';
import { Cards } from './cards';
import { PointOfViewController } from './point-of-view-controller';
import {
  leftArrowElement,
  rightArrowElement,
  card1PositionElement,
  modalHideButtonElement,
  customizeButtonElement,
  povElement,
  card1ProfileElement,
  card2ProfileElement,
  card3ProfileElement,
  backProfileElement,
  picturesToggleButtonElement,
  bordersToggleButtonElement
} from './html-elements';

function init() {
  const cardsService = new CardsService();
  const cards = new Cards(cardsService);
  const pointOfViewController = new PointOfViewController(cardsService);

  // set cards dimensions
  pointOfViewController.updateCards();

  // create initial animations
  cardsService.updateAnimations();

  // set images sources
  cards.setImgsSources();

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

  povElement.addEventListener('mousedown', () => pointOfViewController.onPovMouseDown());

  card1ProfileElement.addEventListener('mousedown', pointOfViewController.onCardProfileMouseDownFactory(1));
  card2ProfileElement.addEventListener('mousedown', pointOfViewController.onCardProfileMouseDownFactory(2));
  card3ProfileElement.addEventListener('mousedown', pointOfViewController.onCardProfileMouseDownFactory(3));
  backProfileElement.addEventListener('mousedown', pointOfViewController.onCardProfileMouseDownFactory(4));

  picturesToggleButtonElement.addEventListener('click', () => pointOfViewController.onToggleButtonClick(false));
  bordersToggleButtonElement.addEventListener('click', () => pointOfViewController.onToggleButtonClick(true));

  document.addEventListener('mouseup', event => pointOfViewController.onMouseUp(event));
  window.addEventListener('resize', () => pointOfViewController.getWindowInnerHeight());
}

export { init };
