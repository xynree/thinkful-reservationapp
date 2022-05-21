
const ResCard = ({res}) => {
  const { first_name, last_name, mobile_number, reservation_date, reservation_time, people } = res;
  return (
    <div className="card m-2 w-75"> 
    <p className='card-header'>{first_name} {last_name}</p>
    <div className='card-body'>
      
      <p>Reservation Date: {reservation_date}</p>
      <p>Reservation Time: {reservation_time}</p>
      <p>Number of People: {people}</p>
      <p>Contact Number: {mobile_number}</p>

      </div>
    </div>
  );
}

export default ResCard;