import { Link } from "react-router-dom";

const { iconStyle, navItem } = {
  iconStyle: { fontSize: "20px" },
  navItem: {
    flexContainer: "nav navbar-nav text-dark w-100 d-flex flex-column",
    childContainer:
      "nav-item p-2 ps-4 border-bottom border-1 border-opacity-50 border-white w-100",
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

const NavList = ({open}) => {
  return (
    <ul className={navItem.flexContainer}>
    {linkList.map(({ icon, title, to }) => (
      <li className={navItem.childContainer} key={title}>
        <Link className={navItem.link} to={`/${to}`}>
          <span className={`bi bi-${icon}`} style={iconStyle} />
          {open && (
            <span className={navItem.title}>{`${"  "}${title}`} </span>
          )}
        </Link>
      </li>
    ))}
  </ul>
  );
}

export default NavList;