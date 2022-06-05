import ResCardAddSeat from "./ResCardAddSeat";
import NoRes from "./NoRes";
import formatReservationTime from "../../utils/format-reservation-time";

const ResList = ({ reservations }) => {
  const formatRes = (res) =>
    formatReservationTime(res).sort((prev, curr) =>
      prev.reservation_time < curr.reservation_time ? -1 : 1
    );

  return (
    <div className="d-flex flex-column w-100 mt-2">
      {reservations?.length ? (
        formatRes(reservations).map((res) => 
          res.status !== "finished" ?
              <ResCardAddSeat
                key={`${res.last_name}-${res.mobile_number}-${res.reservation_date}`}
                res={res}
              /> :''
        )
      ) : (
        <NoRes />
      )}
    </div>
  );
};

export default ResList;
