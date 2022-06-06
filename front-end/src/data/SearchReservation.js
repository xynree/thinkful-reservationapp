const SearchForm = (searchVal) => ({
  label: {name: 'Search', htmlFor: 'mobile_number'},
  title: "", 
  input: {
    name: 'mobile_number',
    placeholder: `Enter a customer's phone number`,
    value: searchVal,
    type: 'tel',
    required: true,
    className: 'form-control',
    pattern:'[0-9]{3}-[0-9]{3}-[0-9]{4}',
    maxLength: 12,
    minLength: 12,
    title: 'xxx-xxx-xxxx'
  },
})

export default SearchForm;