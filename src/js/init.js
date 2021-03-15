import '../style/style.scss';
import { cardsService, cards, pointOfViewController } from './singletons';
import { onResize } from './resize';
import {
  leftArrowContainerElement,
  rightArrowContainerElement,
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

  // set initial style settings based on window's width
  onResize(pointOfViewController);

  // add event listeners
  leftArrowContainerElement.addEventListener('click', () => cards.previous());
  rightArrowContainerElement.addEventListener('click', () => cards.next());

  card1PositionElement.addEventListener('click', () => cards.showModal());
  modalHideButtonElement.addEventListener('click', () => cards.hideModal());
  customizeButtonElement.addEventListener('click', () => pointOfViewController.onCustomizeBtnClick());

  povElement.addEventListener('mousedown', () => pointOfViewController.onPovMouseDown());

  card1ProfileElement.addEventListener('mousedown', pointOfViewController.onCardProfileMouseDownFactory(1));
  card2ProfileElement.addEventListener('mousedown', pointOfViewController.onCardProfileMouseDownFactory(2));
  card3ProfileElement.addEventListener('mousedown', pointOfViewController.onCardProfileMouseDownFactory(3));
  backProfileElement.addEventListener('mousedown', pointOfViewController.onCardProfileMouseDownFactory(4));

  picturesToggleButtonElement.addEventListener('click', () => pointOfViewController.setBordersMode(false));
  bordersToggleButtonElement.addEventListener('click', () => pointOfViewController.setBordersMode(true));

  document.addEventListener('mouseup', event => pointOfViewController.onMouseUp(event));
  window.addEventListener('resize', () => onResize(pointOfViewController));
}

export { init };
