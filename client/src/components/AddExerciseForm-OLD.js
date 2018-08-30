const axios = require('axios');
const React = require('react');
const styled = require('styled-components');
const { withFormik } = require('formik');



const postData = (url = '', data = {}) => axios.post('shorten', data)
  .then(responseText => responseText)
  .catch(error => error);


const SubmitButton = styled.button`
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  line-height: 1.25;
  border-radius: 0.25rem;
  transition: all 0.15s ease-in-out;
  color: #007bff;
  background-color: transparent;
  background-image: none;
  border-color: #007bff;
  &:hover {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
  }
`;

const ErrorLabel = styled.span`
  display: inline-block;
`;


// Our inner form component which receives our form's state and updater methods as props
const InnerForm = ({
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    setFieldValue,
    handleBlur,
    handleSubmit,
    handleReset,
    hash,
    status
}) => (
  <form onSubmit={handleSubmit}>
  
  
  <input
    name="url"
    type="text"
    className={`form-control ${ errors.url && touched.url && 'is-invalid'}`}
    value={values.url}
    onChange={handleChange}
    onBlur={handleBlur}
  />


        
    {touched.url && errors.url && <div>{errors.url}</div>}

      <h4>
        {status ? (
          <a href={`${status.data.hash}`}>
            {`${window.location.href}/${status.data.hash}`}
          </a>
        ) : (
          ''
        )}
      </h4>
          
    <button type="submit" disabled={isSubmitting}>
      Submit
    </button>
  </form>
);

// Wrap our form with the using withFormik HoC
const MyForm = withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({ email: '', password: '' }),
  // Add a custom validation function (this can be async too!)
  // validate: (values, props) => {
  //   const errors = {};
  //   if (!values.email) {
  //     errors.email = 'Required';
  //   } else if (
  //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  //   ) {
  //     errors.email = 'Invalid email address';
  //   }
  //   return errors;
  // },
  // Submission handler
  handleSubmit: (
    values,
    {
      
      props,
      setSubmitting,
      setErrors, setStatus, resetForm /* setValues, setStatus, and other goodies */
    }
  ) => {
    postData('/shorten', values)
.then( (data) => {
        setStatus(data);
resetForm;
        setSubmitting(false);
        // do whatevs...
        // props.updateUser(user)
      }
    )
    .catch(error => setErrors(error));;
  },
})(InnerForm);

// Use <MyForm /> anywhere
const Basic = () => (
  <div>
    <h1>URL Shortener</h1>
    <MyForm />
  </div>
);

module.exports = Basic;