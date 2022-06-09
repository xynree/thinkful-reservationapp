function FormField({ title, label, input, onChange, inputVal }) {
  const { name, htmlFor } = label;
  return (
    <div className="mb-3">
      <label
        htmlFor={htmlFor}
        name={name}
      >
        {title}
      </label>
      <input
        {...input}
        value={inputVal}
        onChange={onChange}
      />
    </div>
  );
}

export default FormField;
