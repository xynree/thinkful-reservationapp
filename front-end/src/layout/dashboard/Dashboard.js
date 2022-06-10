import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";
import useQuery from "../../utils/useQuery";
import BtnGroup from "../../helpers/BtnGroup";
import { previous, next, today } from "../../utils/date-time";
import ResList from "./ResList/ResList";
import TableList from "./TableList/TableList";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();

  const loadDashboard = () => {
    const abortController = new AbortController();
    setReservationsError(null);
    setTablesError(null);
    listReservations({ date }, abortController.signal)
      .then((res) =>
        res.filter(
          ({ status }) => status !== "finished" && status !== "cancelled"
        )
      )
      .then(setReservations)
      .then(history.push({ search: `?date=${date}` }))
      .catch(setReservationsError);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  };

  useEffect(loadDashboard, [dateToday, query, date, history]);

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
    <main className="h-100 overflow-auto p-4">
      <div className='card h-100'>
      <h1 className="display-4 text-center card-header">Dashboard</h1>
      <div className="d-flex flex-sm-column flex-md-row justify-content-around card-body overflow-auto">
        <div className="d-flex flex-column mt-2 gap-2">
          <h2 className="mb-0 text-center">Reservations for {date}</h2>
          <BtnGroup buttons={buttons} />
          <ResList
            reservations={reservations}
            setReservations={setReservations}
            query={query}
          />
          <ErrorAlert error={reservationsError} />
        </div>
        <div className="d-flex flex-column justify-content-start">
          <TableList tbls={tables} setErr={setTablesError} />
          <ErrorAlert error={tablesError} />
        </div>
      </div>
      </div>
    </main>
  );
}

export default Dashboard;
