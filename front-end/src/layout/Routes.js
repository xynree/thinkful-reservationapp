import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { today } from '../utils/date-time';
import Dashboard from '../layout/Dashboard/Dashboard';
import NotFound from './NotFound';
import NewReservation from './NewReservation/NewReservation'
import EditReservation from './EditReservation/EditReservation'
import NewTable from './NewTable/NewTable'
import NewSeat from './Dashboard/ResList/Seat/NewSeat'
import Search from './Search/Search';

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
      <Route exact path="/reservations/:reservation_id/edit">
        <EditReservation />
      </Route>
      <Route path="/tables/new">
        <NewTable/>
      </Route>
      <Route path="/dashboard">
        <Dashboard dateToday={today()} />
      </Route>
      <Route path="/search">
        <Search/>
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
