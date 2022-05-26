import tables from '../data/NewTableFormData';
import FormField from '../helpers/FormField';
import { useState } from 'react'
import SubmitCancel from '../helpers/SubmitCancel';

const defTable = {

}
const NewTable = () => {
  const [table, setTable] = useState(defTable)

  const updateTable = () => {

  }

  return (
    <form onSubmit={() => {}}>
    {tables.map((field) => (
      <FormField key={field.input.id} onChange={updateTable} {...field}  />
    ))}
    <SubmitCancel />
  </form>
  );
}

export default NewTable;