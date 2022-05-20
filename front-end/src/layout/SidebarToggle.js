const SidebarToggle = ({open,toggleOpen}) => {
  return (
    <div className="mt-auto ml-auto text-center w-100 p-2 ps-1 border-top border-1 border-white border-opacity-50"
    onClick={toggleOpen}>
    <i
      className={`bi bi-toggle-${open? 'on':'off'} `}
      style={{
        fontSize: '36px',
        color: open?  'white':'lightgrey',
        zIndex: 1,
      }}
      
      id="sidebarToggle"
      type="button"
    ></i>
  </div>
  );
}

export default SidebarToggle;