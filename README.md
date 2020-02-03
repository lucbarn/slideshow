# Slideshow

The `slideshow` folder contains the source code of the JavaScript slideshow,
which consists of a sequence of images that move forwards and backwards.
In the mobile version of the slideshow the animation is simpler, with
only one image visible at a time.

## Dependencies

Run the following command from the `slideshow` folder to install the dependencies:

```bash
npm install
```

## Slideshow Style

If changes are made to the style of the slideshow in the `slideshow/style.less`  stylesheet, the new
css stylesheet has to be created running the following command from the `slideshow` folder:

```bash
node_modules/less/bin/lessc style.less style.css
```

## Example

An example of the slideshow can be found at https://codepen.io/lucbarn/full/YRwYVM

# Perspective tool

The `perspective` folder contains the code of a JavaScript tool that can be used to try
different perspectives by changing the distance and the height of the point of view.
In the bottom-right corner there is a 2D representation of the slideshow in the xy plane.
The blue dot represents the point of view and it can be dragged to change its position.
A summary of the new CSS values of each image is available by clicking on the button in the bottom-left corner, so that these new values can be assigned to the respective variables in the less stylesheet `slideshow/style.less`.

The tool is meant to be used for development so only the desktop version is available.

## Perspective tool's CSS and JS placeholders

In order to keep some values consistent between CSS and JavaScript code, placeholders in the template files have to be replaced with the values found in the `perspective/values.txt` file running the following command from the `perspective` folder:

```bash
bash placeholders.sh values.txt
```

## Example

The tool can be tried at http://slideshow-perspective-tool.s3-website.eu-central-1.amazonaws.com/
