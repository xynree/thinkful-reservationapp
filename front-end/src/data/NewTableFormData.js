const tables = [  
  {
  title: "Table Name",
  label: {
    name: "table_name",
    htmlFor: "tablenameinput",
  },
  input: {
    name: "table_name",
    type: "text",
    className: "form-control",
    pattern:"..+",
    id: "tablenameinput",
    required: true,
    title: "Table name must have more than 2 characters."
  }
},
  {
    title: "Capacity",
    label: {
      name: "Capacity",
      htmlFor: "capinput",
    },
    input: {
      name: "capacity",
      type: "number",
      className: "form-control",
      min: "1",
      id: "capinput",
      required: true,
    },
  }
]

export default tables;