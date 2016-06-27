# Chappie Brain
[Chappie](http://www.imdb.com/title/tt1823672) inspired Brain / Consciousness animation recreated in HTML, CSS & JavaScript, available in 3 flavors: React, Angular and Canvas.

#### Available branches (so far!):

1. [React demo](https://dimorphic.github.io/chappie-brain/react/) (branch brain-react)
2. Angular
  - [Angular 1 demo](https://dimorphic.github.io/chappie-brain/angular-1/) (branch brain-angular)
  - Angular 2 demo - coming soon
3. Canvas (brain-canvas)
  - [ES5 demo](https://dimorphic.github.io/chappie-brain/canvas-es5/) (branch brain-canvas)
  - [ES6 demo](http://dimorphic.github.io/chappie-brain/canvas-es6/) (branch brain-canvas-es6)

#### Preview

![brain-preview-demo](http://i.imgur.com/U0zdZkh.jpg)

This was used as reference for my 'insane' test case presentation @ [Angular-vs-React](http://bit.ly/angular-vs-react).
This test is focused on a specific case, update items that is, and it's scores should be taken as is, and not as an overall score of one framework vs another. There are other libs out there that handle animations better. Do not do this at home! :)

### Getting started

1. Clone the repo of desired flavor (brain-react, brain-angular or brain-canvas):
  
  `$ git clone -b brain-FLAVOR https://github.com/dimorphic/chappie-brain`

2. Get in there

  `$ cd chappie-brain`
  
3. Install dev & app depedencies:

  `$ npm install`
  `bower install` (not on ES6 branches, going npm all the way!)
  
4. Start it up:

  `$ npm start`

### Todo:

- [ ] Fix funky Angular 1 bug rendering only strings (hit refresh!)
- [ ] test more libs/frameworks?
- [ ] TBA

### Contribution:

I've tried to keep things simple and make'em as fast as possible with each method/framework used.
I'm looking forward to any contributions or even other 'flavor' branches and tests. Go fork, go hacking! :)

### Credits:

* @Chappie creators: Thanks for the awesome movie!
* @James Whayman: Thanks for the color ranges! Sharing is caring <3
