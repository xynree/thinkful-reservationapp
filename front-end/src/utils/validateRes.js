import { CLOSED_DOW, REST_HRS } from '../data/RestaurantData'
import { isAfterToday, getDay, isBetweenTimes } from './date-time';

export default function valRes(newRes, setErr){
  if (!isAfterToday(newRes.reservation_date)) {
    setErr(err => [...err,{ type: 'PastDateErr',message: 'Only future reservations are allowed.' }])
    return false;
  }
  if (getDay(newRes.reservation_date) === CLOSED_DOW) {
    setErr(err => [...err, { type: 'ResClosedError', message: 'Restaurant is closed on Tuesdays.' }])
    return false;
  }

  if (!isBetweenTimes(newRes.reservation_time, REST_HRS)) {
    setErr(err => [...err, { type: 'ResHoursError', message: `Restaurant is only open for booking between ${REST_HRS.open.hr}:${REST_HRS.open.min} AM and ${REST_HRS.close.hr-12}:${REST_HRS.close.min} PM. `}]);
    return false;
  }
  return true;
}

