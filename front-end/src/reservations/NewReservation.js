import FormField from "../helpers/FormField";
import reservationFormData from "../data/ReservationFormData";
import { saveReservation } from "../utils/api"
import { useHistory } from "react-router-dom";
import { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { isAfterToday, getDay, isBetweenTimes } from '../utils/date-time';
import { CLOSED_DOW, REST_HRS } from '../data/RestaurantData'


const defaultRes = {
  "first_name": "",
  "last_name": "",
  "mobile_number": "",
  "reservation_date": "",
  "reservation_time": "",
  "people": 0,
}

function NewReservation() {
  const [newRes, setNewRes] = useState(defaultRes)
  const [err, setErr] = useState([])
  const history = useHistory()

  const valRes = () => {
    if (!isAfterToday(newRes.reservation_date)) {
      setErr(err => [...err,{ type: 'PastDateErr',message: 'Only future reservations are allowed.' }])
      return false;
    }
    if (getDay(newRes.reservation_date) === CLOSED_DOW) {
      setErr(err => [...err, { type: 'ResClosedError', message: 'Restaurant is closed on Tuesdays.' }])
      return false;
    }

    if (!isBetweenTimes(newRes.reservation_time, REST_HRS)) {
      setErr(err => [...err, { type: 'ResHoursError', message: `Restaurant is only open for booking between ${REST_HRS.open.hr}:${REST_HRS.open.min} AM and ${REST_HRS.close.hr-12}:${REST_HRS.close.min} PM. `}]);
      return false;
    }
    return true;
  }

  const saveNewRes =(e)=> {
    e.preventDefault();

    if (!valRes()) return;
    const abort = new AbortController();
    saveReservation(newRes, abort.signal)
      .then((res) => history.push(`/dashboard?date=${res.reservation_date}`))
      .catch(console.log)
  };

  const updateRes = (e) => {
    if (err.length) setErr([]);
    if (e.target.name === "people") setNewRes((newRes) => ({...newRes, [e.target.name]: parseInt(e.target.value)}));
    else setNewRes((newRes) => ({...newRes, [e.target.name]: e.target.value}));
  }

  const goBack = () => history.goBack();

  return (
    <div className="h-100 overflow-auto">
      <div className="card w-75 m-4 ">
        <div className="card-body d-flex flex-column">
          <h1 className="card-title display-3">New Reservation</h1>
          <form onSubmit={saveNewRes}>
            {reservationFormData.map((field) => (
              <FormField key={field.input.id} onChange={updateRes} {...field}  />
            ))}
            <div className="d-flex">
              <button type="submit" className="btn btn-primary m-1">
                <span className="bi bi-send" /> Submit
              </button>
              <button
                type="button"
                className="btn btn-secondary m-1"
                onClick={goBack}
              >
                <span className="bi bi-x" />
                   Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      {err?.map((error) => <ErrorAlert error={error} key={error.type} />)}
    </div>
  );
}

export default NewReservation;
