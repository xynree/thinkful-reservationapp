import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard'
import NotFound from './NotFound';
import { today } from '../utils/date-time';
import NewReservation from './reservations/NewReservation'
import NewTable from './table/NewTable'
import NewSeat from './Seat/NewSeat'

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/dashboard/" />
      </Route>
      <Route exact path="/reservations">
        <Redirect to="/dashboard" />
      </Route>
      <Route exact path="/reservations/new">
        <NewReservation />
      </Route>
      <Route exact path="/reservations/:reservation_id/seat">
        <NewSeat />
      </Route>
      <Route path="/tables/new">
        <NewTable/>
      </Route>
      <Route path="/dashboard">
        <Dashboard dateToday={today()} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
