import React from 'react';

import './Flexbox.css';
import logo from './images/awesome-logo.svg';
import socialIcons from './images/social-icons.svg';
import one from './images/one.svg';
import two from './images/two.svg';
import three from './images/three.svg';
import four from './images/four.svg';
import five from './images/five.svg';

export default () => (
  <>
    <div className="menu-container">
      <div className="menu">
        <div className="date">
          {'Aug 14, 2016'}
        </div>
        <div className="signup">
          {'Sign Up'}
        </div>
        <div className="login">
          {'Login'}
        </div>
      </div>
    </div>
    <div className="header-container">
      <div className="header">
        <div className="header">
          <div className="subscribe">
            {'Subscribe '}
            &#9662;
          </div>
          <div className="logo">
            <img alt="logo" src={logo} />
          </div>
          <div className="social">
            <img alt="social media" src={socialIcons} />
          </div>
        </div>
      </div>
    </div>
    <div className="photo-grid-container">
      <div className="photo-grid">
        <div className="photo-grid-item first-item">
          <img alt="one" src={one} />
        </div>
        <div className="photo-grid-item">
          <img alt="two" src={two} />
        </div>
        <div className="photo-grid-item">
          <img alt="three" src={three} />
        </div>
        <div className="photo-grid-item">
          <img alt="four" src={four} />
        </div>
        <div className="photo-grid-item last-item">
          <img alt="five" src={five} />
        </div>
      </div>
    </div>
    <div className="footer">
      <div className="footer-item footer-one" />
      <div className="footer-item footer-two" />
      <div className="footer-item footer-three" />
    </div>
  </>
);
