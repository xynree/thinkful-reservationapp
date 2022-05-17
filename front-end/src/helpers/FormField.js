function FormField({ title, label, input }) {
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
      />
    </div>
  );
}

export default FormField;
