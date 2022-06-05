import { useState } from 'react'
import tables from '../../data/NewTableFormData';
import FormField from '../../helpers/FormField';
import ErrorAlert from "../../layout/ErrorAlert";
import SubmitCancel from '../../helpers/SubmitCancel';
import { saveTable } from '../../utils/api';
import { useHistory } from 'react-router-dom'; 

const defTable = {
'table_name': '',
'capacity': 0
}
const NewTable = () => {
  const [table, setTable] = useState(defTable)
  const history = useHistory();
  const [err, setErr] = useState([])

  const updateTable = (e) => {
    if (err.length) setErr([]);
    let value = e.target.value;
    if (e.target.name === 'capacity') value = Number(value);
    setTable((table) => ({...table, [e.target.name]: value}));
  }
  const valTable = () => {
    if (!table.capacity || table.table_name === '' || table.table_name.length < 2) return false;
    else return true;
  }

  const saveNewTable =(e)=> {
    e.preventDefault();

    if (!valTable()) return;
    const abort = new AbortController();
    saveTable(table, abort.signal)
      .then(() => history.push(`/dashboard`))
      .catch((error) => setErr([...err,error]))
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
    {err?.map((error) => <ErrorAlert error={error} key={error.message} />)}
  </div>
  );
}

export default NewTable;