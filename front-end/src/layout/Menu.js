import React, { useState } from "react";

import { Link } from "react-router-dom";
import SidebarToggle from "./SidebarToggle";

const { menu, headline, iconStyle, navItem } = {
  menu: "navbar navbar-dark col-sm-3 h-100 bg-secondary shadow-sm flex-column align-items-start p-0",
  flexContainer: "container-fluid p-3",
  headline: {
    link: "d-flex flex-nowrap justify-content-between text-decoration-none align-items-center w-100 p-2 ps-3 pb-3 border-bottom border-1 border-opacity-25  border-white ",
    title: "w-75 text-left text-nowrap text-white fs-5 fw-bold",
    icon: "navbar-brand bi bi-table",
    style: {
      fontSize: '30px',
      color: 'black'
  }
  },
  iconStyle: { fontSize: "24px" },
  navItem: {
    flexContainer: "nav navbar-nav text-light w-100 d-flex flex-column",
    childContainer: "nav-item p-2 ps-3 border-bottom border-1 border-opacity-25 border-white w-100",
    link: "nav-link d-flex justify-content-between align-items-center",
    title: "w-75 text-left ps-1 text-nowrap",
  },
};

const linkList = [
  { icon: "speedometer2", title: "Dashboard", to: "dashboard" },
  { icon: "search", title: "Search", to: "search" },
  { icon: "plus", title: "New Reservation", to: "reservations/new" },
  { icon: "layers", title: "New Table", to: "tables/new" },
];

function Menu() {
  const [open, toggleOpen] = useState(true);

  return (
    <nav
      className={menu}
      style={{ transition: "all 0.5s", width: open? '15.2rem':'4rem' }}
    >
      <Link to="/" className={headline.link}>
        <span className={headline.icon} style={headline.style} />
        {open && <span className={headline.title}>Periodic Tables</span>}
      </Link>
      <ul className={navItem.flexContainer}>
        {linkList.map(({ icon, title, to }) => (
          <li className={navItem.childContainer} key={title}>
            <Link className={navItem.link} to={`/${to}`}>
              <span className={`bi bi-${icon}`} style={iconStyle} />
              {open && (
                <span className={navItem.title}>{`${"  "}${title}`}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
      <SidebarToggle open={open} toggleOpen={() => toggleOpen(!open)} />
    </nav>
  );
}

export default Menu;
