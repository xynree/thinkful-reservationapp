import FormField from "../../helpers/FormField";
import reservationFormData from "../../data/ReservationFormData";
import { saveReservation } from "../../utils/api"
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import ErrorAlert from "../ErrorAlert";
import valRes from '../../utils/validateRes';
import SubmitCancel from '../../helpers/SubmitCancel';

const defaultRes = {
  "first_name": "",
  "last_name": "",
  "mobile_number": "",
  "reservation_date": "",
  "reservation_time": "",
  "people": 0,
  "status": "booked"
}

function NewReservation() {
  const [newRes, setNewRes] = useState(defaultRes)
  const [err, setErr] = useState([])
  const history = useHistory();

  const saveNewRes =(e)=> {
    e.preventDefault();

    if (!valRes(newRes, setErr)) return;
    const abort = new AbortController();
    saveReservation(newRes, abort.signal)
      .then((res) => history.push(`/dashboard?date=${res.reservation_date}`))
      .catch((err) => setErr(error => [...error, err]))
  };

  const updateRes = (e) => {
    if (err.length) setErr([]);
    if (e.target.name === "people") setNewRes((newRes) => ({...newRes, [e.target.name]: parseInt(e.target.value)}));
    else setNewRes((newRes) => ({...newRes, [e.target.name]: e.target.value}));
  }

  return (
    <div className="h-100 overflow-auto m-auto">
      <div className="card w-75 m-4">
      <h1 className="card-header display-3">New Reservation</h1>
        <div className="card-body d-flex flex-column">
          <form onSubmit={saveNewRes}>
            {reservationFormData.map((field) => (
              <FormField key={field.input.id} onChange={updateRes} {...field} inputVal={newRes[field.input.name]}  />
            ))}
            <SubmitCancel />
          </form>
        </div>
      </div>
      {err?.map((error) => <ErrorAlert error={error} key={error.type} />)}
    </div>
  );
}

export default NewReservation;
