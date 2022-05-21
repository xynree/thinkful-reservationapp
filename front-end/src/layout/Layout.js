import React from 'react';
import Menu from './Menu';
import Routes from './Routes';

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
*/

const {outerContainer, flexContainer, routes} = { 
  outerContainer: "container-fluid h-100",
  flexContainer: "row h-100",
  routes: 'col h-100 p-0'
}


function Layout() {
  return (
    <div className={outerContainer}>
      <div className={flexContainer}>
          <Menu />
        <div className={routes}>
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;
