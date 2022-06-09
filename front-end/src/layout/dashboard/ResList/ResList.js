import ResCardFull from "./ResCardFull";
import NoRes from "./NoRes";
import formatReservationTime from "../../../utils/format-reservation-time";

const ResList = ({ reservations, setReservations, query }) => {
  const formatRes = (res) =>
    formatReservationTime(res).sort((prev, curr) =>
      prev.reservation_time < curr.reservation_time ? -1 : 1
    );

  return (
    <div className="d-flex flex-column w-100 mt-2">
      {reservations.length ? (
        formatRes(reservations).map((res) => (
          <ResCardFull
            key={`${res.last_name}-${res.mobile_number}-${res.reservation_date}`}
            res={res}
            setReservations={setReservations}
            query={query}
          />
        ))
      ) : (
        <NoRes />
      )}
    </div>
  );
};

export default ResList;
