const reservationFormData = [
  {
    title: "First Name",
    label: {
      name: "first_name",
      htmlFor: "firstnameinput",
    },
    input: {
      name: "first_name",
      type: "text",
      className: "form-control",
      placeholder: "First Name",
      id: "firstnameinput",
      required: true,
    },
  },
  {
    title: "Last Name",
    label: {
      name: "last_name",
      htmlFor: "lastnameinput",
    },
    input: {
      name: "last_name",
      type: "text",
      className: "form-control",
      placeholder: "Last Name",
      id: "lastnameinput",
      required: true,
    },
  },
  {
    title: "Mobile Number",
    label: {
      name: "mobilenum",
      htmlFor: "mobilenuminput",
    },
    input: {
      name: "mobile_number",
      type: "tel",
      className: "form-control",
      placeholder: "### - ### - ####",
      id: "mobilenuminput",
      required: true,

    },
  },
  {
    title: "Date",
    label: {
      name: "date",
      htmlFor: "dateinput",
    },
    input: {
      name: "reservation_date",
      type: "date",
      className: "form-control",
      placeholder:"YYYY-MM-DD",
      pattern:"\\d{4}-\\d{2}-\\d{2}",
      id: "dateinput",
      required: true,

    },
  },
  {
    title: "Time",
    label: {
      name: "time",
      htmlFor: "timeinput",
    },
    input: {
      name: "reservation_time",
      type: "time",
      className: "form-control",
      placeholder:"HH:MM",
      pattern:"[0-9]{2}:[0-9]{2}",
      id: "timeinput",
      required: true,

    },
  },
  {
    title: "People",
    label: {
      name: "people",
      htmlFor: "peopleinput",
    },
    input: {
      name: "people",
      type: "number",
      min: "1",
      className: "form-control",
      placeholder: "Number of People in Party",
      id: "peopleinput",
      required: true,

    },
  },
];

export default reservationFormData;
