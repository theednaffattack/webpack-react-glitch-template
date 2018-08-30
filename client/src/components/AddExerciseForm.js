import React from "react";
import { Box, ButtonOutline as Btn, Flex, Text } from "rebass";
import * as Yup from "yup";
import styled from "styled-components";
import { withFormik } from "formik";
import DisplayFormikState from "./DisplayFormikState";

const postData = (url = "", data = {}) =>
  fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, same-origin, *omit
    headers: {
      "Content-Type": "application/json; charset=utf-8"
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  })
    .then(responseText => responseText.json()) // parses response to JSON
    // .then(response => this.setState(response))
    .catch(error => ({ errors: { msg: error.message } }));

const ButtonOutline = styled(Btn)`
  background-color: transparent;
  border-color: #1000ee;
  transition: all 0.16s ease-in-out;
  &:hover {
    color: #fff;
    background-color: #1000ee;
    border-color: #1000ee;
  }
  &:focus {
    box-shadow: rgb(0, 103, 238) 0px 0px 0px 2px;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
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

const StyledInput = styled.input`
  clear: both;
  width: 100%;
  border: 4px solid #ecf0f1;
  border-left: none;
  border-right: none;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 0;
  background: #ecf0f1;
  display: block;
  font-size: 16px;
  transition: background 1s, border 1s;
  &:hover {
    border-bottom: 4px solid #df6659;
  }
  &:focus {
    border-bottom: 4px solid #df6659;
  }
`;

const StyledInputLabel = styled.label`
  display: block;
`;

const ErrorLabel = styled.span`
  display: inline-block;
`;

const UriForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    setFieldValue,
    hanldeBlur,
    handleSubmit,
    handleReset,
    hash,
    status
  } = props;

  return (
    <div>
      <form className="" onSubmit={handleSubmit}>
        <div>
          {/* <StyledInputLabel htmlFor="userId">User ID</StyledInputLabel> */}
          <StyledInput
            name="userId"
            type="text"
            className={`form-control ${errors.userId &&
              touched.userId &&
              "is-invalid"}`}
            value={values.userId || ""}
            placeholder="User ID"
            onChange={handleChange}
          />
          <div>{values.hash}</div>
          {errors.userId &&
            touched.userId && (
              <div className="invalid-feedback">{errors.userId}</div>
            )}
        </div>

        <Flex flexWrap="wrap" mx={-2}>
          <Box px={2} py={2} width={1}>
            {/* <StyledInputLabel htmlFor="description">
              Description
            </StyledInputLabel> */}
            <StyledInput
              name="description"
              type="text"
              className={`form-control ${errors.description &&
                touched.description &&
                "is-invalid"}`}
              value={values.description || ""}
              placeholder="Description"
              onChange={handleChange}
            />
            <div>{values.hash}</div>
            {errors.description &&
              touched.description && (
                <div className="invalid-feedback">{errors.description}</div>
              )}
          </Box>
        </Flex>
        {/* <div>
        </div> */}

        <div>
          {/* <StyledInputLabel htmlFor="description">Duration</StyledInputLabel> */}
          <StyledInput
            name="duration"
            type="text"
            className={`form-control ${errors.duration &&
              touched.duration &&
              "is-invalid"}`}
            value={values.duration || ""}
            placeholder="Duration (mins)"
            onChange={handleChange}
          />
          <div>{values.hash}</div>
          {errors.duration &&
            touched.duration && (
              <div className="invalid-feedback">{errors.duration}</div>
            )}
        </div>
        <div>
          {/* <StyledInputLabel htmlFor="description">Date</StyledInputLabel> */}
          <StyledInput
            name="date"
            type="date"
            className={`form-control ${errors.date &&
              touched.date &&
              "is-invalid"}`}
            value={values.date || ""}
            placeholder="Date"
            onChange={handleChange}
          />
          <div>{values.hash}</div>
          {errors.date &&
            touched.date && (
              <div className="invalid-feedback">{errors.date}</div>
            )}
        </div>
        {/* <SubmitButton type="submit">
          {isSubmitting ? "WAIT PLZ" : "SUBMIT"}
        </SubmitButton> */}
        <ButtonOutline mx={1} my={3} color="indigo">
          {isSubmitting ? "WAIT PLZ" : "SUBMIT"}
        </ButtonOutline>
        <DisplayFormikState {...props} />
      </form>
      <h1>Returned Data</h1>
      <h4>
        {JSON.stringify(props, null, 2)}
        {window ? JSON.stringify("===WINDOW===", window.location, null, 2) : ""}
        {status ? (
          <a href={`/api/exercise/log?${status.userId}`}>
            {`${window.location.origin}/api/exercise/log?${status.userId}`}
          </a>
        ) : (
          "ksdfjksadjfk"
        )}
      </h4>
    </div>
  );
};

export default withFormik({
  // mapPropsToValues: props => ({
  //   uri: props.uri.uri
  // }),

  validationSchema: Yup.object().shape({
    // uri: Yup.string()
    //   .url("Invalid URI format")
    //   .required("A valid link is required")
    //       .test(
    //         'is-google',
    //       <ErrorLabel>
    // Uhhh this isn't google
    //       </ErrorLabel>,
    //       value => value === 'http://www.google.com'
    //       )
  }),

  handleSubmit: (
    values,
    { resetForm, setStatus, setErrors, setSubmitting }
  ) => {
    console.log("handleSubmit");
    console.log(JSON.stringify(values));
    postData("/api/exercise/add", values)
      // postData('http://192.168.180.162:8080/shorten', values)
      .then(data => {
        // postData('http://192.168.180.248:8080/api/getShortLink', { hash: e.target.value })
        // if (data.errors) {
        //   return () => {
        //     this.setState({ errors: { msg: data.errors } }, () => console.error(`state in 'then-if' ${this.state}`));
        //   };
        // }
        console.log(`data ${JSON.stringify(data, null, 2)}`);
        // return data;
        if (data.errors) {
          return () => {
            this.setState({ errors: { msg: data.errors } }, () =>
              console.error(`state in 'then-if' ${this.state}`)
            );
          };
        }
        setStatus(data);
        console.log(`state in 'then' ${JSON.stringify(data)}`);
        console.log(data);
        resetForm({});
        // if (data == { errors: { msg: error } })
      }) // JSON from `response.json()` call
      .catch(error => console.error(error));
    setSubmitting(false);

    // setTimeout(() => {
    //   // alert(JSON.stringify(values, null, 2));
    //   JSON.stringify(values, null, 2);
    //   setSubmitting(false);
    // }, 1000);
  }
})(UriForm);
