import { Link, useHistory } from "react-router-dom";
import { cancelReservation }from '../../../utils/api'

const ResCardFull = ({ res, setReservations, query, setErr }) => {
  const history = useHistory();

  const {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    reservation_id,
    people,
    status,
  } = res;

  const cancelPrompt = () => {
    if (window.confirm('Do you want to cancel this reservation? This cannot be undone.')) {
      const abort = new AbortController();
      if (setReservations) {
        cancelReservation(reservation_id, abort.signal)
        .then(res => setReservations(reserv => reserv.filter(({reservation_id}) => reservation_id !== res.reservation_id)))
        .then(() => history.push(`/reservations/?date=${query}`))
        .catch(setErr)
      } else {
        cancelReservation(reservation_id, abort.signal)
        .then(() => window.location.reload())
        .catch(setErr)
      }
    }
  }

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
          <span data-reservation-id-status={reservation_id}>{status}</span>
        </li>
        <li className="list-group-item d-flex gap-2">
          {status === "booked" ? (
            <Link
              to={`/reservations/${reservation_id}/seat`}
              href={`/reservations/${reservation_id}/seat`}
              className="btn btn-primary"
            >
              Seat
            </Link>
          ) : (
            ""
          )}

          {status === 'cancelled' || status ==='finished' ? ''
          :
          <>
          <Link
            to={`/reservations/${reservation_id}/edit`}
            href={`/reservations/${reservation_id}/edit`}
            className="btn btn-secondary"
          >
            Edit
          </Link>
          <button
            onClick={cancelPrompt}
            type='button'
            className="btn btn-danger"
            data-reservation-id-cancel={reservation_id}
          >
            Cancel
          </button>
          </>
          }
        </li>
      </ul>
    </div>
  );
};

export default ResCardFull;
