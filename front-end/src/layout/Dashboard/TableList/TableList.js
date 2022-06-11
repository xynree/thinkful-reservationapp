import Table from "./Table";


const TableList = ({tbls, setErr}) => {
  return (
    <div className='w-full d-flex flex-column w-100 mt-2 gap-4'>
      <h2 className=''>Table Booking Status</h2>
    <table className='mb-2 table table-bordered table-hover '>
    <thead className='table-info'>
      <tr>
        <th>
        Table Name
        </th>
        <th scope="col">
          Id
        </th>
        <th scope="col">
        Capacity
        </th>
        <th scope="col">
        Reserved
        </th>
      </tr>
    </thead>

    <tbody >
    {tbls?.map((tbl) => 
        <Table tbl={tbl} key={tbl.table_id} setErr={setErr}/>
      )}
    </tbody>
  </table>
    </div>
  );
}

export default TableList;