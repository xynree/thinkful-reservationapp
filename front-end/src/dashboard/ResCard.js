const ResCard = ({res}) => {
  const { first_name, last_name, mobile_number, reservation_date, reservation_time, people } = res;
  return (
    <div className="card"> 
     {res.map((field) => <p className="card card-text">{field}</p>)}
    </div>
  );
}

export default ResCard;