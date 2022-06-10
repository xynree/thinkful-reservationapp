import FormField from "../../helpers/FormField";
import ResList from "../Dashboard/ResList/ResList";
import { useState } from "react";
import SearchForm from "../../data/SearchReservation";
import { listByNum } from '../../utils/api'
import NoRes from '../Dashboard/ResList/NoRes'
import { useHistory } from 'react-router-dom'
import ErrorAlert from '../ErrorAlert'

const Search = () => {
  const [searchVal, setSearchVal] = useState("");
  const [fetchedRes, setFetchedRes] = useState(null);
  const [err, setErr] = useState([])
  const history = useHistory();

  const searchRes = (e) => {
    e.preventDefault();
    const abort = new AbortController();
    if (!searchVal) return;
    listByNum(searchVal, abort.signal)
    .then(setFetchedRes)
    .then(history.push({search: `?mobile_number=${searchVal}`}))
    .then(setSearchVal(''))
    .catch((error)=> setErr(err => [...err, error]))
  };

  const setSearch = (e) => {
    if (err) setErr([]);
    if (fetchedRes === []) setFetchedRes(null)
    const phone = e.target.value;
    if (phone.slice(-1) === '-') return;
    if ((phone.length === 3 || phone.length === 7) && (searchVal.length < phone.length)) {
        setSearchVal(phone.concat("-"));
    } else setSearchVal(phone);
  };

  return (
    <div className="h-100 overflow-auto p-4">
      <h1 className="display-4">Search For A Reservation</h1>
      <form onSubmit={searchRes}>
        <FormField {...SearchForm(searchVal)} onChange={setSearch} inputVal={searchVal}/>
        <button className="btn btn-primary" type="submit">
          Find
        </button>
      </form>
      { fetchedRes? fetchedRes.length ? <ResList reservations={fetchedRes} /> : <div className='mt-4'><NoRes /></div>: ''}
      {err?.map((error) => <ErrorAlert error={error} key={error.message} />)}
    </div>
  );
};

export default Search;
