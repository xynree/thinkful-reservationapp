import FormField from "../../helpers/FormField";
import ResList from "../Dashboard/ResList/ResList";
import { useState } from "react";
import SearchForm from "../../data/SearchReservation";
import { listByNum } from '../../utils/api'
import ErrorAlert from '../ErrorAlert'

const Search = () => {
  const [searchVal, setSearchVal] = useState("");
  const [fetchedRes, setFetchedRes] = useState([]);
  const [err, setErr] = useState(null)

  const searchRes = (e) => {
    e.preventDefault();
    console.log('find run')
    const abort = new AbortController();
    if (!searchVal) return;
    listByNum(searchVal, abort.signal)
    .then(setFetchedRes)
    .then(setSearchVal(''))
    .catch(setErr)
  };

  const setSearch = (e) => {
    if (err) setErr(null);
    const phone = e.target.value;
    if ((phone.length === 3 || phone.length === 7) && searchVal.length < phone.length ) {
        setSearchVal(phone.concat("-"));
    } else setSearchVal(phone);
  };

  return (
    <div className="h-100 overflow-auto p-4">
      <h1 className="display-4">Search For A Reservation</h1>
      <form onSubmit={searchRes}>
        <FormField {...SearchForm(searchVal)} onChange={setSearch} />
        <button className="btn btn-primary" type="submit">
          Find
        </button>
      </form>
      {fetchedRes.length ? <ResList reservations={fetchedRes} /> : ""}
      <ErrorAlert error={err} />
    </div>
  );
};

export default Search;
