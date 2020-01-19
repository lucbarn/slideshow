# Slideshow

The `slideshow` folder contains the source code of the JavaScript slideshow,
which consists of a sequence of images that move forwards and backwards.
In the mobile version of the slideshow this animation is not available and
only one image is visible at a time.

# Style

If changes are made to the style of the slideshow in the less stylesheet, the new
css stylesheet has to be created using the following command:

```bash
node_modules/less/bin/lessc style.less style.css
```


# Perspective tool

The `perspective` folder contains the code of a JavaScript tool that can be used to try
different perspectives by changing the distance and the height of the point of view.
In the bottom-right corner there is a 2D representation of the slideshow in the xy plane.
The blue dot represents the point of view and it can be dragged to change its position.
A summary of the new CSS values of each image is available by clicking on the
bottom-left button, so that these new values can be assigned to the respective variables
in the less stylesheet `slideshow/style.less`.


# Example

An example of this slideshow is available at https://codepen.io/lucbarn/pen/YRwYVM
