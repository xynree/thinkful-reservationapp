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
    pattern:"\\w\\w",
    id: "tablenameinput",
    required: true,
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