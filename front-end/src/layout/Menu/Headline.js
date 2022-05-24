import { Link } from "react-router-dom";

const { headline} = {
  headline: {
    link: "d-flex flex-nowrap justify-content-between text-decoration-none align-items-center w-100 p-3 ps-4 border-bottom border-1 border-opacity-50 border-white ",
    title: "w-75 text-left text-nowrap fs-5 fw-bold text-white",
    icon: "navbar-brand bi bi-table",
    style: {
      fontSize: "24px",
    },
  }
};

const Headline = ({open}) => {
  return (
    <Link to="/" className={headline.link}>
    <span className={headline.icon} />
    {open && (
      <span className={headline.title} style={headline.style}>
        Periodic Tables
      </span>
    )}
  </Link>
  );
}

export default Headline;