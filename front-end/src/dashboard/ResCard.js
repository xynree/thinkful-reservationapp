import { Link } from 'react-router-dom';

const ResCard = ({ res }) => {
  const {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    reservation_id,
    people,
  } = res;
  return (
    <div className="card border-secondary w-75 mb-2">
      <h3 className="card-header text-dark ">
        {first_name} {last_name}
      </h3>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <span className="fw-semibold">Reservation Date: </span>
          {reservation_date}
        </li>
        <li className="list-group-item">
          <span className="fw-semibold">Reservation Time: </span>
          {reservation_time}
        </li>
        <li className="list-group-item">
          <span className="fw-semibold">Number of People: </span>
          {people}
        </li>
        <li className="list-group-item">
          <span className="fw-semibold">Contact Number: </span>
          {mobile_number}
        </li>
        <li className="list-group-item">
          <Link to={`/reservations/${reservation_id}/seat`} href={`/reservations/${reservation_id}/seat`}
           className="btn btn-primary">Reservation Date: </Link>
          {reservation_date}
        </li>
      </ul>
    </div>
  );
};

export default ResCard;
