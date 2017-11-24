import React from 'react';

import './HelloWorld.css';

const HelloWorld = () => {
  console.log('Hello World!'); // eslint-disable-line no-console
  return (
    <p className="content">
       To get started, edit <code>src/HelloWorld/HelloWorld.component.js</code> and save to reload.
    </p>
  );
};

export default HelloWorld;
