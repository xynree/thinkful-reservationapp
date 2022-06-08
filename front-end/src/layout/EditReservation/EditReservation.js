import FormField from "../../helpers/FormField";
import reservationFormData from "../../data/ReservationFormData";
import { saveReservation } from "../../utils/api"
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import ErrorAlert from "../ErrorAlert";
import { isAfterToday, getDay, isBetweenTimes } from '../../utils/date-time';
import { CLOSED_DOW, REST_HRS } from '../../data/RestaurantData'
import SubmitCancel from '../../helpers/SubmitCancel';

const EditReservation = () => {
  const [err, setErr] = useState([])
  return (
    <div className="h-100 overflow-auto">
      <div className="card w-75 m-4 ">
        <div className="card-body d-flex flex-column">
          <h1 className="card-title display-3">New Reservation</h1>
          <form onSubmit={() => {}}>
            <SubmitCancel />
          </form>
        </div>
      </div>
      {err?.map((error) => <ErrorAlert error={error} key={error.type} />)}
    </div>
  );
}

export default EditReservation;