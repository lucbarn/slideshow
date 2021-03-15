import {
  povWrapperElement,
  povContainerElement,
  povAreaElement,
  cardsContainerElement,
  cardsProfilesContainerElement,
  controlsContainerElement,
  card1PositionElement,
  picturesToggleButtonElement,
  bordersToggleButtonElement
} from './html-elements';

class PointOfViewController {

  constructor(cardsService) {
    this.cardsService = cardsService;

    // distance between the container of the point of view and the first card
    this.povContainerCardsDistance = 80;
    // side length of the container of the point of view
    this.povContainerSide = 200;
    // ratio between theoretical cards dimensions and positions and relative values as
    // displayed in the controls container
    this.controlsContainerScale = 4;
    // theoretical height of each card
    this.cardsHeight = 390;
    // space between cards, the first card is placed on the y-axis, the others to its left
    this.spaceBetweenCards = 100;
    // max space between cards
    this.maxSpaceBetweenCards = 150;
    // min space between cards
    this.minSpaceBetweenCards = 50;
    // keeps track of the previous value of the space between cards and is used while dragging the cards profiles
    this.previousSpaceBetweenCards;

    // ratio between width and height of each card
    this.cardsWidthHeightRatio = 4 / 3;
    // povX and povY are the coordinates of the point of view on the cartesian plane
    this.povX = (this.povContainerCardsDistance + this.povContainerSide / 2) * this.controlsContainerScale;
    this.povY = this.cardsHeight / 2;

    // width of each card profile (in pixels)
    this.cardProfileWidth = 3;

    this.cornerX;
    this.cornerY;

    this.controlsVisible = false;
    this.windowHeight = window.innerHeight;

    this.boundMovePov = this.movePov.bind(this);
    this.moveCardProfileFunction;
    this.cardProfileClickPoint;
  }

  initPovController() {
    povContainerElement.style.width = `${this.povContainerSide}px`;
    povContainerElement.style.height = `${this.povContainerSide}px`;
    povContainerElement.style.margin = `10px 10px 10px ${this.povContainerCardsDistance}px`;

    const cardsProfiles = this.cardsService.getCardsProfiles();

    const cardsProfilesWidthsSum = this.cardProfileWidth * cardsProfiles.length;
    const cardsProfilesMarginsMaxSum = (this.maxSpaceBetweenCards / this.controlsContainerScale) * (cardsProfiles.length - 1);
    cardsProfilesContainerElement.style.width = `${cardsProfilesWidthsSum + cardsProfilesMarginsMaxSum}px`;

    // init cards profiles
    let cardProfile;
    for (let i = 0; i < cardsProfiles.length; i++) {
      cardProfile = cardsProfiles[i];
      cardProfile.style.width = `${this.cardProfileWidth}px`;
      cardProfile.style.height = `${this.cardsHeight / this.controlsContainerScale}px`;
      if (i < cardsProfiles.length-1) {
        cardProfile.style.margin = `auto 0 auto ${this.spaceBetweenCards / this.controlsContainerScale}px`;
      } else {
        // backProfile has no left margin
        cardProfile.style.margin = 'auto 0';
      }
    }
  }

  updateCards() {
    // y1 is the intersection between the line that connects the base of the card with
    // the point of view and the y axis
    let y1;
    // y2 is the intersection between the line that connects the top of the card with
    // the point of view and the y axis
    let y2;
    // given a viewing angle of 90 degrees, the height of the field of view is twice
    // the distance of the point of view from the y axis; assuming that the field of
    // view covers the height of the browser window, then the ratio between the
    // height of the field of view and the height of each card is equal to the height
    // of the browser window and the height of the first card displayed on the screen;
    // 2*povX / cardsHeight == windowHeight / displayedCardsHeight or
    // displayedCardsHeight / cardsHeight == windowHeight / 2*povX;
    // the scale coefficient is the ratio between the height of the displayed first
    // card and the theoretical height of each card
    let scaleCoefficient;
    let height;
    let width;
    let verticalTranslation;

    const styleUpdatedValues = [];

    for (let i = 0; i < 5; i++) {
      y1 = (this.povY * this.spaceBetweenCards * i) / (this.povX + this.spaceBetweenCards * i);
      y2 = (this.cardsHeight * this.povX + this.povY * this.spaceBetweenCards * i) / (this.povX + this.spaceBetweenCards * i);
      scaleCoefficient = this.windowHeight / (2 * this.povX);
      height = (y2-y1) * scaleCoefficient;
      width = height * this.cardsWidthHeightRatio;
      verticalTranslation = y1 * scaleCoefficient;
      styleUpdatedValues.push({height, width, verticalTranslation});
    }

    const card1VerticalTranslation = styleUpdatedValues[1]['verticalTranslation'];
    const heightDifference = styleUpdatedValues[0]['height'] - styleUpdatedValues[1]['height'];

    const cards = this.cardsService.getCardsElements();

    for (let i = 0; i < 5; i++) {
      const { height, width, verticalTranslation } = styleUpdatedValues[i];
      cards[i].style.height = `${height}px`;
      cards[i].style.width =  `${width}px`;
      // vertical translation of each card is divided as follows:
      // 1) verticalTranslation -> specific to each card
      // 2) card1VerticalTranslation -> relative to card 1, this is in order to push card 1
      //    to the bottom of cards container
      // 3) heightDifference / 2 -> relative to card 1 and cards container, this is in order
      //    to push card 1 from the bottom of cards container (see previous point) to the
      //    center of cards container
      // without points 2 and 3 card 1 would not be aligned with arrows (which are vertically
      // aligned with the center of cards container) and would move up and down while dragging
      // the point of view
      cards[i].style.transform = `translate3d(-50%, ${card1VerticalTranslation - verticalTranslation - heightDifference / 2}px, 0)`;
    }

    // cards container has the same domensions as the first card
    cardsContainerElement.style.width = cards[0].style.width;
    cardsContainerElement.style.height = cards[0].style.height;

    card1PositionElement.style.width = cards[1].style.width;
    card1PositionElement.style.height = cards[1].style.height;
    card1PositionElement.style.transform = cards[1].style.transform;
  }

  setBordersMode(isBordersMode) {
    if (isBordersMode === this.cardsService.isBordersMode) {
      return;
    }
    this.cardsService.updateBordersMode(isBordersMode);
    const cardsElements = this.cardsService.getCardsElements();
    const imgsElements = this.cardsService.getCardsImgsElements();
    if (isBordersMode) {
      cardsElements.forEach(cardElement => cardElement.classList.add('hidden-img'));
      imgsElements.forEach(imgElement => imgElement.classList.add('hidden-img'));
      picturesToggleButtonElement.classList.remove('selected');
      bordersToggleButtonElement.classList.add('selected');
      card1PositionElement.classList.add('disabled');
    } else {
      cardsElements.forEach(cardElement => cardElement.classList.remove('hidden-img'));
      imgsElements.forEach(imgElement => imgElement.classList.remove('hidden-img'));
      bordersToggleButtonElement.classList.remove('selected');
      picturesToggleButtonElement.classList.add('selected');
      card1PositionElement.classList.remove('disabled');
    }
  }

  onCardProfileMouseDownFactory(k) {
    const f = event => {
      if (this.moveCardProfileFunction) {
        document.removeEventListener('mousemove', this.moveCardProfileFunction);
      }
      this.cardProfileClickPoint = event.clientX;
      this.previousSpaceBetweenCards = this.spaceBetweenCards;
      this.moveCardProfileFunction = this.moveCardProfileFactory(k).bind(this);
      document.addEventListener('mousemove', this.moveCardProfileFunction);
    };

    return f;
  }

  onCardProfileMouseUp() {
    document.removeEventListener('mousemove', this.moveCardProfileFunction);
  }

  moveCardProfileFactory(k) {
    const f = event => {
      // prevent elements highlighting while dragging the card profile
      event.preventDefault();

      const x = event.clientX;
      const scaledValue = (this.cardProfileClickPoint - x) / k * this.controlsContainerScale + this.previousSpaceBetweenCards;
      const boundedValue = Math.max(this.minSpaceBetweenCards, Math.min(scaledValue, this.maxSpaceBetweenCards));
      this.spaceBetweenCards = boundedValue;
      this.updateSpaceBetweenCardsProfiles();
      this.updateCards();
    };

    return f;
  }

  updateSpaceBetweenCardsProfiles() {
    const cardsProfiles = this.cardsService.getCardsProfiles();
    let cardProfile;
    // backProfile has no left margin so it is not updated
    for (let i = 0; i < cardsProfiles.length-1; i++) {
      cardProfile = cardsProfiles[i];
      cardProfile.style.marginLeft = `${this.spaceBetweenCards / this.controlsContainerScale}px`;
    }
  }

  movePov(event) {
    // prevent elements highlighting while dragging the point of view
    event.preventDefault();

    const xLimit = this.povContainerSide;
    const yLimit = this.povContainerSide;
    const x = event.clientX;
    const y = event.clientY;
    let xPos;
    let yPos;

    // keep pov inside its container
    if (x > this.cornerX + xLimit / 2) {
      xPos = Math.min(x - this.cornerX, xLimit);
    } else {
      xPos = Math.max(x - this.cornerX, 0);
    }
    if (y > this.cornerY + yLimit / 2) {
      yPos = Math.min(y - this.cornerY, yLimit);
    } else {
      yPos = Math.max(y - this.cornerY, 0);
    }

    povWrapperElement.style.left = `${xPos}px`;
    povWrapperElement.style.top = `${yPos}px`;
    this.povX = (xPos + this.povContainerCardsDistance) * this.controlsContainerScale;
    this.povY = ((yLimit - yPos) - (yLimit - this.cardsHeight / this.controlsContainerScale) / 2) * this.controlsContainerScale;
    this.updateCards();
  }

  openControlsPanel() {
    controlsContainerElement.classList.add('visible');
    this.controlsVisible = true;
  }

  closeControlsPanel() {
    controlsContainerElement.classList.remove('visible');
    this.controlsVisible = false;
  }

  onCustomizeBtnClick() {
    if (!this.controlsVisible) {
      this.openControlsPanel();
    } else {
      this.closeControlsPanel();
    }
  }

  onPovMouseDown() {
    if (this.boundMovePov) {
      document.removeEventListener('mousemove', this.boundMovePov);
    }
    povAreaElement.style.backgroundColor = 'rgba(150,150,150,0.1)';
    this.cornerX = povAreaElement.getBoundingClientRect().x;
    this.cornerY = povAreaElement.getBoundingClientRect().y;
    document.addEventListener('mousemove', this.boundMovePov);
  }

  onPovMouseUp() {
    povAreaElement.style.backgroundColor = '';
    document.removeEventListener('mousemove', this.boundMovePov);
    this.cardsService.updateAnimations();
  }

  onMouseUp(event) {
    // when the controls container div is visible close it if
    // an element outside of its area is clicked; if the element
    // is customize button then the closing action is handled by
    // onCustomizeBtnClick method
    if (this.controlsVisible
          && event.target.closest('div#controls-container') === null
          && event.target.closest('div#customize-btn') === null) {
      this.closeControlsPanel();
    }

    this.onCardProfileMouseUp();
    this.onPovMouseUp();
  }

  updateWindowInnerHeight() {
    this.windowHeight = window.innerHeight;
  }

}

export { PointOfViewController };
