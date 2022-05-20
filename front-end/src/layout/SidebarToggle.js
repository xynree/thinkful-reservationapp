const SidebarToggle = ({open,toggleOpen}) => {
  return (
    <div className="mt-auto text-left w-100 ps-2">
    <i
      className={`bi bi-toggle-${open? 'on':'off'} `}
      style={{
        fontSize: '40px',
        color: 'lightgrey',
        zIndex: 1,
      }}
      onClick={toggleOpen}
      id="sidebarToggle"
      type="button"
    ></i>
  </div>
  );
}

export default SidebarToggle;