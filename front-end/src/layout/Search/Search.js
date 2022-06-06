import FormField from '../../helpers/FormField';
import {useState} from 'react';

const Search = () => {
  const [searchVal, setSearchVal] = useState('')

  const searchRes = (e) => {
    e.preventDefault();
  }

  const setSearch = (e) => setSearchVal(e.target.value);

  const SearchForm = {
    label: {name: 'Search', htmlFor: 'mobile_number'},
    title: "Format: xxx-xxx-xxxx", 
    input: {
      name: 'mobile_number',
      placeholder: `Enter a customer's phone number`,
      value: searchVal,
      type: 'tel',
      required: true,
      className: 'form-control',
      pattern:'[0-9]{3}-[0-9]{3}-[0-9]{4}'
    }, 
    onChange: setSearch
  }
  return (
    <div className='h-100 overflow-auto p-4'>
            <h1 className='display-4'>Search For A Reservation</h1>
            <form onSubmit={searchRes}>
              <FormField {...SearchForm}/>
              <button className='btn btn-primary' type='submit'>Find</button>
            </form>
    </div>
  );
}

export default Search;