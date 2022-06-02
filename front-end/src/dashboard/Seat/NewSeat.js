import SubmitCancel from '../../helpers/SubmitCancel';
import { useState, useEffect } from 'react';
import { listTables, listReservationById } from '../../utils/api'
import ResCard from '../ResList/ResCard';
import { useParams } from 'react-router-dom'

const NewSeat = () => {
  const [tables, setTables ] = useState([])
  const [res, setRes] = useState(null)
  const { reservation_id } = useParams();

  useEffect(() => { 
    const abortController = new AbortController();
    listTables(abortController.signal)
    .then(setTables)
    .catch(console.log)
    .then(() => listReservationById(reservation_id, abortController.signal))
    .then(setRes)
    .catch(console.log)
  return () => abortController.abort();

},[reservation_id])


console.log('res', res, reservation_id)
  return (
    <div className='m-4 w-75 d-flex flex-column gap-2'>
      <div className='display-4'>Seat This Reservation:</div>
        {res ? <ResCard res={res}/>:''}
    <form>
      <select className="form-select form-select-lg " name='table_id'>
        {tables?.map((table) => 
        <option>{table.table_name} - {table.capacity}</option>)
        }
      </select>
      <div className='mt-2 mb-2'>
        <SubmitCancel  />
      </div>
    </form>
    </div>
  );
}

export default NewSeat;