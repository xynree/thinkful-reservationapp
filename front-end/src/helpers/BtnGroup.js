const BtnGroup = ({buttons}) => {
  const [left, mid, right] = buttons
  return (
  <div className="btn-group mt-2 mb-2 m-auto" role="group">
    <button type="button" className="btn btn-info" onClick={left.action}>{left.title}</button>
    <button type="button" className="btn btn-primary" onClick={mid.action}>{mid.title}</button>
    <button type="button" className="btn btn-info" onClick={right.action}>{right.title}</button>
  </div>
  );
}

export default BtnGroup;