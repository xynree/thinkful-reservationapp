import React, { useState } from "react";
import Headline from "./Headline";
import NavList from "./NavList";
import SidebarToggle from "./SidebarToggle";

const { menu } = {
  menu: "navbar navbar-dark col-sm-3 h-100 bg-primary shadow-sm flex-column align-items-start p-0",
  flexContainer: "container-fluid p-3"
};

function Menu() {
  const [open, toggleOpen] = useState(true);

  return (
    <nav
      className={menu}
      style={{ transition: "all 0.5s", width: open ? "14.5rem" : "4.5rem" }}
    >
      <Headline open={open}/>
      <NavList open={open}/>
      <SidebarToggle open={open} toggleOpen={() => toggleOpen(!open)} />
    </nav>
  );
}

export default Menu;
