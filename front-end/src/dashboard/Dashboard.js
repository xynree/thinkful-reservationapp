import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
import ResCard from "./ResCard";
import NoRes from "./NoRes";
import formatReservationTime from "../utils/format-reservation-time";
import BtnGroup from "../helpers/BtnGroup";
import { previous, next, today } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

const formatRes = (res) =>
  formatReservationTime(res).sort((prev, curr) =>
    prev.reservation_time < curr.reservation_time ? -1 : 1
  );

function Dashboard({ dateToday }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const query = useQuery().get("date");
  const [date, setDate] = useState(query ? query : dateToday);

  const loadDashboard = () => {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  };

  useEffect(loadDashboard, [dateToday, query, date]);

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
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <BtnGroup buttons={buttons} />

      {reservations?.length ? (
        formatRes(reservations).map((res) => (
          <ResCard key={res.mobile_number} res={res} />
        ))
      ) : (
        <NoRes />
      )}
    </main>
  );
}

export default Dashboard;
