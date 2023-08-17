import { CardsService } from './cards-service';
import { Cards } from './cards';
import { PointOfViewController } from './point-of-view-controller';

const cardsService = new CardsService();
const cards = new Cards(cardsService);
const pointOfViewController = new PointOfViewController(cardsService);

export { cardsService, cards, pointOfViewController };
