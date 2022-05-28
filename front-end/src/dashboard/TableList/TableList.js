import Table from "./Table";
import { useState } from 'react';

const TableList = () => {
  let tables = useState([])
  return (
    <ul>
      {tables?.map((tbl) => {
        <Table />
      })}
    </ul>
  );
}

export default TableList;