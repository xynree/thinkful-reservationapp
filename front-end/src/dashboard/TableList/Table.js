const Table = ({tbl}) => {
  const {table_id, table_name, capacity, reservation_id} = tbl;
  return (
    <tr>
      <td>{table_name}</td>
      <td>{table_id}</td>
      <td>{capacity}</td>
      <td ><p data-table-id-status={`${table_id}`}>{reservation_id? 'occupied': 'free'}</p></td>
    </tr>
  );
}

export default Table;