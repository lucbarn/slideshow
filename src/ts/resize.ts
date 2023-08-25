import { PointOfViewController } from './point-of-view-controller';

const smallSizeWidth = 1000;
const mediumSizeWidth = 1400;

function onResize(pointOfViewController: PointOfViewController) {
  const currentWindowWidth = window.innerWidth;
  if (currentWindowWidth < smallSizeWidth) {
    document.body.classList.add('small-size');
    document.body.classList.remove('medium-size');
    // the controls panel is hidden if the viewport is small
    pointOfViewController.closeControlsPanel();
    pointOfViewController.setBordersMode(false);
  } else {
    document.body.classList.remove('small-size');
    if (currentWindowWidth < mediumSizeWidth) {
      document.body.classList.add('medium-size');
    } else {
      document.body.classList.remove('medium-size');
    }
  }
  pointOfViewController.updateWindowInnerHeight();
}

export { smallSizeWidth, mediumSizeWidth, onResize };
