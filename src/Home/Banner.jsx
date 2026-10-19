import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

function Banner() {
  return (
    <div>
        <div className="main-banner">
  <OwlCarousel items={1} loop nav className="owl-carousel owl-banner">
    <div className="item item-1">
      <div className="header-text">
        <span className="category">
          Toronto, <em>Canada</em>
        </span>
        <h2>
          Hurry!
          <br />
          Get the Best Villa for you
        </h2>
      </div>
    </div>
    <div className="item item-2">
      <div className="header-text">
        <span className="category">
          Melbourne, <em>Australia</em>
        </span>
        <h2>
          Be Quick!
          <br />
          Get the best villa in town
        </h2>
      </div>
    </div>
    <div className="item item-3">
      <div className="header-text">
        <span className="category">
          Miami, <em>South Florida</em>
        </span>
        <h2>
          Act Now!
          <br />
          Get the highest level penthouse
        </h2>
      </div>
     </div>
    </OwlCarousel>
  </div>
</div>
  );
}

export default Banner