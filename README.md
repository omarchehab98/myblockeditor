# myblockeditor

This project is for educational purposes only.

## Installation

To avoid copyright infringement the assets folder of this project is omitted
from this repository. It is taken from [LEGO's EV3 Mindstorms Programming
Software](https://www.lego.com/en-us/mindstorms/downloads/download-software).

* Copy the contents of `/Resources/MyBlocks/images` from EV3's directory to
`/public/assets/import`

A **My Block** in the EV3 programming language is the equivalent of a
**function** in written programming language. To modify a **My Block's**
parameters and options in LEGO's software is to delete it and create it again,
which causes all the wiring to mess up.

## About

This web application fills in the gaps of LEGO's EV3 Mindstorms Programming
Software, introducing **My Block** refactoring and viewing your program as
an abstracted set of functions.

It allows users to upload their `.ev3` source file and

* rename My Blocks
* change the description of My Blocks
* change the icon of My Blocks
* add parameters
* remove parameters
* change parameters
* change parameter data types
* change parameter icons
* change parameter handles

All processing is done in the browser which makes it possible to run locally

## Development

This project was written when I was in highschool, I did know the importance of
documentation in software development.

[index.js](https://github.com/omarchehab98/myblockeditor/edit/master/src/js/index.js)
holds all the code specific to this project. Despite it being monolithic and
undocumented, it can be worked with if the top level functions are collapsed as
it becomes self explanatory to navigate the file.

### Dependencies

* [jQuery](https://github.com/jquery/jquery)
* [Font Awesome](https://github.com/FortAwesome/Font-Awesome)
* [Dagre D3](https://github.com/cpettitt/dagre-d3) - laying out the
**My Blocks**
* [JSPlumb](https://github.com/jsplumb/jsPlumb) - connecting the **My Blocks**
* [VexJS](https://github.com/hubspot/vex) - popup dialog boxes
* [JSZip](https://github.com/Stuk/jszip) - creating, reading, and editing `zip`
files. LEGO's file extension `ev3` is actually just a `zip` file, containing
`xml` files representing the block instructions.
* [JSXML](https://github.com/colorhook/jsxml) - parsing the `xml` files, I
slightly modified JSXML because LEGO use non-standard characters in their XML
tags.
* [Filesaver.js](https://github.com/eligrey/FileSaver.js) - saving the
refactored `ev3` file.

### Dev Dependencies

* [Browserify](https://github.com/substack/browserify-website) - bundling the
JavaScript
* [Babelify](https://github.com/babel/babelify) - see
[BabelJS](https://github.com/babel/babel)
* [Less](https://github.com/less/less.js) - CSS preprocessor

### Building

* Run `npm install` to install the dev dependencies.
* Run `npm run build` to compile the source files.
