import React, { useEffect, useState } from 'react';
import { listReservations } from '../utils/api';
import ErrorAlert from '../layout/ErrorAlert';
import useQuery from '../utils/useQuery';
import ResCard from './ResCard';
import NoRes from './NoRes';

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ dateToday }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [resDate, setResDate]  = useState(dateToday)
  const query = useQuery().get("date")


  const loadDashboard = () => {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date: dateToday }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const setReservationDate = () => {
    if (query) setResDate(query);
    else if (dateToday) setResDate(dateToday);
  }

  
  useEffect(setReservationDate,[dateToday, query])
  useEffect(loadDashboard, [dateToday, query, resDate]);

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date {resDate}</h4>
      </div>
      <ErrorAlert error={reservationsError} />

      {reservations.length? reservations.map((res) => <ResCard key={res.created_at} res={res}/>) : <NoRes/> }
    </main>
  );
}

export default Dashboard;
