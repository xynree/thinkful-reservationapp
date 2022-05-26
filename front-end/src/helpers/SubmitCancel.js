import { useHistory } from "react-router-dom";

const SubmitCancel = () => {
  const history = useHistory();
  const goBack = () => history.goBack();

  return (
    <div className="d-flex">
      <button type="submit" className="btn btn-primary m-1">
        <span className="bi bi-send" /> Submit
      </button>
      <button
        type="button"
        className="btn btn-secondary m-1"
        onClick={goBack}
      >
        <span className="bi bi-x" />
           Cancel
      </button>
    </div>
  );
}

export default SubmitCancel;