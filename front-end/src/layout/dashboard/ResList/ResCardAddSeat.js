import { Link } from 'react-router-dom';

const ResCardAddSeat = ({ res }) => {
  const {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    reservation_id,
    people,
    status
  } = res;
  return (
    <div className="card border-secondary mb-2">
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
          <span className="fw-semibold">Status: </span>
          <span data-reservation-id-status={reservation_id}>{status}</span></li>
        <li className="list-group-item">
          {status === 'booked'?
          <Link to={`/reservations/${reservation_id}/seat`} href={`/reservations/${reservation_id}/seat`}
          className="btn btn-primary">Seat</Link>:''
        }

        </li>
      </ul>
    </div>
  );
};

export default ResCardAddSeat;
