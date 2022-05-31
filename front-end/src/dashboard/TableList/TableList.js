import Table from "./Table";


const TableList = ({tbls}) => {
  return (
    <div className='w-full d-flex flex-column w-100 mt-2'>
      {tbls?.map((tbl) => 
        <Table tbl={tbl} key={tbl.table_id}/>
      )}
    </div>
  );
}

export default TableList;