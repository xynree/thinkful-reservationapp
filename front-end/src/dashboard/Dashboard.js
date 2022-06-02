import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
import BtnGroup from "../helpers/BtnGroup";
import { previous, next, today } from "../utils/date-time";
import ResList from "./ResList/ResList";
import TableList from "./TableList/TableList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ dateToday }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [reservationsError, setReservationsError] = useState(null);
  const query = useQuery().get("date");
  const [date, setDate] = useState(query ? query : dateToday);

  useEffect(() => {
    const abortController = new AbortController();
    setReservationsError(null);
    setTablesError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError)
      .then(() => listTables(abortController.signal))
      .then(setTables)
      .catch(setTablesError);
    return () => abortController.abort();
  }, [dateToday, query, date]);

  const buttons = [
    {
      title: "Previous",
      action: () => setDate((date) => previous(date)),
    },
    {
      title: "Today",
      action: () => setDate(today()),
    },
    {
      title: "Next",
      action: () => setDate((date) => next(date)),
    },
  ];

  return (
    <main className="h-100 overflow-auto p-4 ">
      <h1 className="display-4">Dashboard</h1>
      <p className="mb-0">Reservations for {date}</p>
      <BtnGroup buttons={buttons} />
      <div className="d-flex justify-content-start gap-4 w-75">
        <div className="d-flex flex-column justify-content-start">
          <ResList reservations={reservations} />
          <ErrorAlert error={reservationsError} />
        </div>
        <div className="d-flex flex-column justify-content-start">
          <TableList tbls={tables} setErr={setTablesError} />
          <ErrorAlert error={tablesError} />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
