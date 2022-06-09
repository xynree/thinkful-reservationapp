import FormField from "../../helpers/FormField";
import { listReservationById, updateReservation } from "../../utils/api";
import reservationFormData from "../../data/ReservationFormData";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ErrorAlert from "../ErrorAlert";
import valRes from "../../utils/validateRes";

import SubmitCancel from "../../helpers/SubmitCancel";

const EditReservation = () => {
  const [err, setErr] = useState([]);
  const [reservation, setReservation] = useState(null);
  const { reservation_id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abort = new AbortController();
    listReservationById(reservation_id, abort.signal)
      .then(setReservation)
      .catch((error) => setErr([...err,error]));
  }, [reservation_id, err]);

  const updateRes = (e) => {
    if (err.length) setErr([]);
    setReservation({ ...reservation, [e.target.name]: e.target.value });
  };

  const sendEditedRes = (e) => {
    e.preventDefault();

    if (!valRes(reservation, setErr)) return;
    const abort = new AbortController();
    updateReservation(reservation, abort.signal)
      .then((res) => history.push(`/dashboard?date=${res.reservation_date}`))
      .catch((error) => setErr([...err,error]));
  };

  return (
    <div className="h-100 overflow-auto">
      <div className="card w-75 m-4 ">
        <div className="card-body d-flex flex-column">
          <h1 className="card-title display-3">Edit Reservation</h1>
          <form onSubmit={sendEditedRes}>
            {reservation &&
              reservationFormData.map((field) => (
                <FormField
                  key={field.input.id}
                  onChange={updateRes}
                  {...field}
                  inputVal={reservation[field.input.name]}
                />
              ))}
            <SubmitCancel />
          </form>
        </div>
      </div>
      {err?.map((error) => (
        <ErrorAlert error={error} key={error.type} />
      ))}
    </div>
  );
};

export default EditReservation;
