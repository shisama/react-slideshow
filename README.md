# React SlideShow UI

[![Join the chat at https://gitter.im/shisama/react-slideshow-ui](https://badges.gitter.im/shisama/react-slideshow-ui.svg)](https://gitter.im/shisama/react-slideshow-ui?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
https://github.com/shisama/react-slideshow-ui

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/shisama/react-slideshow/blob/master/LICENSE)

React UI Component for slideshow like [SlideShare](https://www.slideshare.net/) or [SpeakerDeck](https://speakerdeck.com/).

[Demo](https://shisama.github.io/react-slideshow-ui/demo/)(Updated with every release)

## Installation
```
npm install --save react-slideshow-ui
```

## Usage
```javascript
import React from 'react';
import {render} from 'react-dom';
import SlideShow from 'react-slideshow-ui';

class App extends React.Component {
  render() {
    return (
      <div>
        <SlideShow
          style={{width: 400}}
          images={[
            './img/example1.png',
            './img/example2.png',
            './img/example3.png',
          ]}
          withTimestamp={true}
          pageWillUpdate={(index, image) => {
            console.log(`Page Update! index: ${index}, image: ${image}`);
          }}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('slideshow'));

```

## Props

|name|type|reqired|description|
|----|----|-------|-----------|
|style|Object|Yes|style of this component.|
|images|Array<string>|Yes|url strings of image for slide.|
|prevIcon|Dom|No|icon for button to move previous page.|
|nextIcon|Dom|No|icon for button to move next page.|
|withTimestamp|boolean|No|set true if you want to add timestamp to img url. i.e. `example.png?1483228800`|
|pageWillUpdate|function|No|function that is invoked when the page is turned.|

## License
This project is licensed under the terms of the
[MIT license](https://github.com/shisama/react-slideshow/blob/master/LICENSE)
