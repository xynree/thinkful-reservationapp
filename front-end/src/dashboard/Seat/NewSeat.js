import SubmitCancel from "../../helpers/SubmitCancel";
import { useState, useEffect } from "react";
import {
  listTables,
  listReservationById,
  seatReservation,
  updateBookingStatus
} from "../../utils/api";
import ResCard from "../ResList/ResCard";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../../layout/ErrorAlert";

const NewSeat = () => {
  const [tables, setTables] = useState([]);
  const [res, setRes] = useState(null);
  const [err, setErr] = useState(null);
  const { reservation_id } = useParams();
  const [table_id, setTableId] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    listTables(abortController.signal)
      .then(setTables)
      .catch(console.log)
      .then(() => listReservationById(reservation_id, abortController.signal))
      .then(setRes)
      .catch(console.log);
    return () => abortController.abort();
  }, [reservation_id]);

  const seatRes = (e) => {
    setErr(null);
    e.preventDefault();
    if (!table_id || !reservation_id) return;
    const body = {
      reservation_id,
      table_id,
    };
    const abort = new AbortController();
    seatReservation(body, abort.signal)
      .then(updateBookingStatus(reservation_id, {status: "seated" }, abort.signal))
      .then(()=> history.push('/dashboard'))
      .catch(setErr);
  };

  const selectTableId = (e) => {
    if (e.target.value === "Choose a Table") {
      setTableId(null);
      return;
    }
    const selectedId = tables.filter(
      (tbl) => tbl.table_name === e.target.value
    )[0].table_id;
    setTableId(selectedId);
  };

  return (
    <div className="m-4 w-75 d-flex flex-column gap-2">
      <div className="display-4">Seat This Reservation:</div>
      {res ? <ResCard res={res} /> : ""}
      <form onSubmit={seatRes}>
        <select
          className="form-select form-select-lg"
          name="table_id"
          onChange={selectTableId}
        >
          <option>Choose a Table</option>
          {tables?.map((table) => (
            <option key={table.table_name} value={table.table_name}>
              {table.table_name} - {table.capacity}
            </option>
          ))}
        </select>
        <div className="mt-2 mb-2">
          <SubmitCancel />
        </div>
      </form>
      <ErrorAlert error={err} />
    </div>
  );
};

export default NewSeat;
