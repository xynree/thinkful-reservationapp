import FormField from "../helpers/FormField";
import reservationFormData from "../data/ReservationFormData";
import { saveReservation } from '../utils/api'
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

const defaultRes = {
  "first_name": '',
  'last_name': '',
  'mobile_number': '',
  'reservation_date': '',
  'reservation_time': '',
  'people': '',
}

function NewReservation() {
  const [newRes, setNewRes] = useState(defaultRes)
  const history = useHistory()

  const saveRes =(e)=> {
    e.preventDefault();
    const abort = new AbortController();
    let form = new FormData();
    for (let field in newRes) {
      form.append(field, newRes[field])
    }

    saveReservation(form, abort.signal)
      .then(console.log)
      .catch(console.log)

  };

  const updateRes = (e) => {
    setNewRes((newRes) => ({...newRes, [e.target.name]: e.target.value}))
  }

  const goBack = () => history.goBack();

  return (
    <div className="h-100 overflow-auto">
      <div className="card w-75 m-4 ">
        <div className="card-body d-flex flex-column">
          <h1 className="card-title display-3">New Reservation</h1>
          <form onSubmit={saveRes}>
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
