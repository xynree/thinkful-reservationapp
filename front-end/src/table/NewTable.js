import tables from '../data/NewTableFormData';
import FormField from '../helpers/FormField';
import { useState } from 'react'
import SubmitCancel from '../helpers/SubmitCancel';
import { saveTable } from '../utils/api';
import { useHistory } from 'react-router-dom'; 
import ErrorAlert from "../layout/ErrorAlert";

const defTable = {
'table-name': '',
'capacity': 0
}
const NewTable = () => {
  const [table, setTable] = useState(defTable)
  const history = useHistory();
  const [err, setErr] = useState([])

  const updateTable = (e) => {
    if (err.length) setErr([]);
    setTable((table) => ({...table, [e.target.name]: e.target.value}));
  }
  const valTable = () => {

  }

  const saveNewTable =(e)=> {
    e.preventDefault();

    if (!valTable()) return;
    const abort = new AbortController();
    saveTable(table, abort.signal)
      .then((res) => history.push(`/dashboard`))
      .catch(console.log)
  };

  return (
    <div className='h-100 overflow-auto p-4'>
      <h1 className='display-4'>New Table</h1>
      <form onSubmit={saveNewTable}>
      {tables.map((field) => (
        <FormField key={field.input.id} onChange={updateTable} {...field}  />
      ))}
      <SubmitCancel />
    </form>
    {err?.map((error) => <ErrorAlert error={error} key={error.type} />)}
  </div>
  );
}

export default NewTable;