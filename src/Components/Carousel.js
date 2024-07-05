import React from 'react';
import Carousel from './Carousel';

const images = [
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  'https://example.com/image3.jpg',
];

const App = () => {
  return (
    <div className="App">
      <h1>Carousel Slideshow</h1>
      <Carousel images={images} />
    </div>
  );
};

export default App;
