const Table = ({tbl}) => {
  const {table_id, table_name, capacity, reservation_id} = tbl;
  return (
    <table className='card mb-2'>
      <thead className='card-header'>Table: {table_name}</thead>
      <tbody className='card-body'>

        <p>Id: {table_id}</p>
        <p>Capacity: {capacity}</p>
        <p>Reserved?: {reservation_id? 'Yes': 'No'}</p>

      </tbody>
    </table>
  );
}

export default Table;