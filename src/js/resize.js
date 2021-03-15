const smallSizeWidth = 1000;
const mediumSizeWidth = 1400;

function onResize(pointOfViewController) {
  const currentWindowWidth = window.innerWidth;
  if (currentWindowWidth < smallSizeWidth) {
    document.body.classList.add('small-size');
    document.body.classList.add('medium-size');
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
