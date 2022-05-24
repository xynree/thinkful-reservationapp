import FormField from "../helpers/FormField";
import reservationFormData from "../data/ReservationFormData";
import { saveReservation } from "../utils/api"
import { useHistory } from "react-router-dom";
import { useState } from "react";

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
  const history = useHistory()

  const saveNewRes =(e)=> {
    e.preventDefault();
    const abort = new AbortController();
    saveReservation(newRes, abort.signal)
      .then((res) => history.push(`/dashboard?date=${res.reservation_date}`))
      .catch(console.log)
  };

  const updateRes = (e) => {
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
    </div>
  );
}

export default NewReservation;
