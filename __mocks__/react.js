import React from 'react';

module.exports = {
  ...React,
  Suspense: ({ children }) => children,
  lazy: loader => {
    const module = loader();
    return module.default ? module.default : module;
  },
};
