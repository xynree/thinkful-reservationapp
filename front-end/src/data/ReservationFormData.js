const reservationFormData = [
  {
    title: 'First Name',
    label: {
      name: 'first_name',
      htmlFor: 'firstnameinput',
    },
    input: {
      name: 'first_name',
      type: 'text',
      className: 'form-control',
      placeholder: 'First Name',
      id: 'firstnameinput',
    },
  },
  {
    title: 'Last Name',
    label: {
      name: 'last_name',
      htmlFor: 'lastnameinput',
    },
    input: {
      name: 'last_name',
      type: 'text',
      className: 'form-control',
      placeholder: 'Last Name',
      id: 'lastnameinput',
    },
  },
  {
    title: 'Mobile Number',
    label: {
      name: 'mobilenum',
      htmlFor: 'mobilenuminput',
    },
    input: {
      name: 'mobile_number',
      type: 'tel',
      className: 'form-control',
      placeholder: 'Last Name',
      id: 'mobilenuminput',
    },
  },
  {
    title: 'Date',
    label: {
      name: 'date',
      htmlFor: 'dateinput',
    },
    input: {
      name: 'reservation_date',
      type: 'date',
      className: 'form-control',
      placeholder: 'Date',
      id: 'dateinput',
    },
  },
  {
    title: 'Time',
    label: {
      name: 'time',
      htmlFor: 'timeinput',
    },
    input: {
      name: 'reservation_time',
      type: 'time',
      className: 'form-control',
      placeholder: 'Time',
      id: 'timeinput',
    },
  },
  {
    title: 'People',
    label: {
      name: 'people',
      htmlFor: 'peopleinput',
    },
    input: {
      name: 'people',
      type: 'number',
      min: '1',
      className: 'form-control',
      placeholder: 'Number of People in Party',
      id: 'peopleinput',
    },
  },
];

export default reservationFormData;
