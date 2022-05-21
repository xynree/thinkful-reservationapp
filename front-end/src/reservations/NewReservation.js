import FormField from "../helpers/FormField";
import reservationFormData from "../data/ReservationFormData";

function NewReservation() {
  const saveReservation = () => {};

  const goBack = () => {};

  return (
    <div className="h-100 overflow-auto">
      <div className="card w-75 m-4 ">
        <div className="card-body d-flex flex-column">
          <h1 className="card-title display-3">New Reservation</h1>
          <form onSubmit={saveReservation}>
            {reservationFormData.map((field) => (
              <FormField key={field.input.id} {...field} />
            ))}

            <div className="d-flex">
              <button type="submit" className="btn btn-primary m-1">
                <span className="oi oi-check" /> Submit
              </button>
              <button
                type="button"
                className="btn btn-secondary m-1"
                onClick={goBack}
              >
                <span className="oi oi-trash" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewReservation;
