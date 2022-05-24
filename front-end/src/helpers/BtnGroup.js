const BtnGroup = ({buttons}) => {
  const [left, mid, right] = buttons
  return (
  <div className="btn-group mt-2 mb-2" role="group">
    <button type="button" className="btn btn-secondary" onClick={left.action}>{left.title}</button>
    <button type="button" className="btn btn-secondary" onClick={mid.action}>{mid.title}</button>
    <button type="button" className="btn btn-secondary" onClick={right.action}>{right.title}</button>
  </div>
  );
}

export default BtnGroup;