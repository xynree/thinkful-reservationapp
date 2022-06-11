import { deleteSeatReservation } from '../../../utils/api';

const Table = ({tbl, setErr}) => {
  const {table_id, table_name, capacity, reservation_id} = tbl;

  const confirm = () => {
      if (window.confirm ('Is this table ready to seat new guests? This cannot be undone.')) {
        const abort = new AbortController()
        deleteSeatReservation(table_id, abort.signal)
          .then(() => window.location.reload())
          .catch((err)=> setErr(err))
      }
  }

  return (
    <tr>
      <td>{table_name}</td>
      <td>{table_id}</td>
      <td>{capacity}</td>
      <td ><p data-table-id-status={`${table_id}`}>{reservation_id? 'occupied': 'free'}</p>
      {reservation_id? <p data-table-id-finish={`${table_id}`}>
        <button className='btn btn-primary' onClick={confirm}>Finish</button>
        </p> : ''}
      </td>

    </tr>
  );
}

export default Table;