import React from "react";
import { Absolute, Box, Button, ButtonOutline as Btn, Flex, Input, Label, Relative, Switch, Text } from "rebass";
import * as Yup from "yup";
import styled from "styled-components";
import { withFormik } from "formik";
import URL from 'url-parse';
import DisplayFormikState from "./DisplayFormikState";
// import { withRouter } from 'next/router'
import { compose } from 'recompose';
import Toggle from 'react-toggle';
import MySelect  from './MySelect';
import "react-toggle/style.css"
import AnimatedMulti from "./AnimatedSelect";
import { groups, orgUnitPathOptions } from "../data/data";

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
    .then(responseText => console.log(responseText.json())) // parses response to JSON
    // .then(response => this.setState(response))
    .catch(error => ({ errors: { msg: error.message } }));

const ButtonOutline = styled(Btn)`
  background-color: transparent;
  border-color: palevioletred;
  transition: all 0.16s ease-in-out;
  &:hover {
    color: pink;
    background-color: palevioletred;
    border-color: palevioletred;
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



const CustomButton = styled(Button)`
  border: 1px solid rgba(0, 0, 0, .25);
  background-color: transparent;
  background-image: linear-gradient(transparent, rgba(0, 0, 0, .125));
  box-shadow: 0 0 4px rgba(0, 0, 0, .25);
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

// create the box that goes over the
// checkbox
const StyledSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

// make this a round slider styles below
const StyledCheckbox = styled.input`
/* display:none; */

  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  &:focus {
  box-shadow: 0 0 1px #2196F3;
}
  &:checked{
  display:block;
  background-color: #2196F3;
  }
`;

const customSelectStyles =  {
  option: (base, state) => ({
    ...base,
    borderBottom: '1px dotted pink',
    color: state.isFullscreen ? 'red' : 'blue',
    padding: 20,
  }),
  control: () => ({
    // none of react-selects styles are passed to <View />
    width: 200,
  }),
  singleValue: (base, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...base, opacity, transition };
  }
};

const StyledSlider = styled.span`
  /* display: none; */
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 34px;
  -webkit-transition: .4s;
  transition: .4s;
  

  &:before{

  position: absolute;
  /* display: none; */
  content: "🦄";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  border-radius: 34px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;


  }
`;


const ErrorLabel = styled.span`
  display: inline-block;
`;

const theBreaks = [ 3/4, 1/2, 1/2, 1/3 ];
class EditUserFormAgain extends React.Component{


  handleChange = value => {
    console.log("handleChange")
    console.log(value)
    // this is going to call setFieldValue and manually update values.suspended
    this.props.onChange('suspended', value);
  };


  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.suspended
    this.props.onBlur('suspended', true);
  };

  render() {

  const {
    id,
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    setFieldValue,
    setFieldTouched,
    hanldeBlur,
    handleSubmit,
    handleReset,
    hash,
    status
  } = this.props;
    return(
      // do stuff
      <div>

    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="id"
          type="hidden"
          value={values.id || ""}
        />
        <Flex>
          <Box width={theBreaks}>
            <StyledInput
              name="group"
              type="text"
              className={`${errors.group &&
                touched.group &&
                "is-invalgroup"}`}
              value={values.group || ""} // {values.group || ""}
              placeholder="Group Name(s)"
              onChange={handleChange}
            />
            <div>{values.hash}</div>
            {errors.group &&
              touched.group && (
                <div className="invalgroup-feedback">{errors.group}</div>
              )}
          </Box>
        </Flex>
        <Flex>
          <Box width={theBreaks}>
            <StyledInput
              name="givenName"
              type="text"
              className={`${errors.givenName &&
                touched.givenName &&
                "is-invalid"}`}
              value={values.givenName || ""}
              placeholder="First Name"
              onChange={handleChange}
            />
            <div>{values.hash}</div>
            {errors.givenName &&
              touched.givenName && (
                <div className="invalid-feedback">{errors.givenName}</div>
              )}
          </Box>
        </Flex>
        <Flex>
          <Box width={theBreaks}>
            <StyledInput
              name="familyName"
              type="text"
              className={`${errors.familyName &&
                touched.familyName &&
                "is-invalid"}`}
              value={values.familyName || ""}
              placeholder="Last Name"
              onChange={handleChange}
            />
            <div>{values.hash}</div>
            {errors.familyName &&
              touched.familyName && (
                <div className="invalid-feedback">{errors.familyName}</div>
              )}
          </Box>
          </Flex>
        <Flex>
          <Box width={theBreaks}>
            <StyledInput
              name="primaryEmail"
              type="text"
              className={`${errors.primaryEmail &&
                touched.primaryEmail &&
                "is-invalid"}`}
              value={values.primaryEmail || ""}
              placeholder="Primary Email"
              onChange={handleChange}
            />
            <div>{values.hash}</div>
            {errors. primaryEmail &&
              touched.primaryEmail && (
                <div className="invalid-feedback">{errors.primaryEmail}</div>
              )}
          </Box>
          </Flex>
        <Flex>
          <Box width={theBreaks}>
            {/* PUT MY STUFF HERE */}
            <label htmlFor="suspended" >
{values.suspended === "true" || values.suspended === true ? <Text children="Suspended" /> : <Text children="Active" />}
</label>
            <Toggle
              checked={values.suspended === "false" || values.suspended === false}
              name='suspended'
              icons={false}
              value={values.suspended}
              // onChange={setFieldValue}
              onChange={handleChange}
              onBlur={setFieldTouched}
              aria-label="User status"
            />

          </Box>
          </Flex>
        <Flex>
          <Box width={theBreaks}>
            <AnimatedMulti
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors.topics}
              styles={orgUnitPathOptions}
              touched={touched.topics}
              colourOptions={orgUnitPathOptions}
              isMulti={false}
              defaultValues={{
                "value": values.orgUnitPath,
                "label": values.orgUnitPath ? values.orgUnitPath.replace("/","") : "",
                "color": "#00B8D9",
                "isFixed": true
              }}
            />
          </Box>
        </Flex>
        <Flex>
          <Box width={theBreaks}>
            <label htmlFor="groups" >
              Groups
            </label>
            <AnimatedMulti
              name="groups"
              value={groups[0]["value"]}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors.groups}
              styles={groups}
              touched={touched.groups}
              colourOptions={groups}
              isMulti={true}
              defaultValues={[{...groups[0]},{...groups[1]}]}
            />
          </Box>
        </Flex>
        <ButtonOutline type="submit" mx={1} my={3} color="palevioletred">
          {isSubmitting ? "WAIT PLZ" : "SUBMIT"}
        </ButtonOutline> <CustomButton>Hello</CustomButton>
        <DisplayFormikState {...this.props} />
      </form>
      <h1>Returned Data</h1>
      <h4>
        {JSON.stringify(status, null, 2)}
        
      </h4>
    </div>
  
      </div>
    );
  }
}
const EditUserForm = props => {
  const {
    id,
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    setFieldValue,
    setFieldTouched,
    hanldeBlur,
    handleSubmit,
    handleReset,
    hash,
    status
  } = props;
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="id"
          type="hidden"
          value={values.id || ""}
        />
        <Flex>
          <Box width={theBreaks}>
            <StyledInput
              name="group"
              type="text"
              className={`${errors.group &&
                touched.group &&
                "is-invalgroup"}`}
              value={values.group || ""} // {values.group || ""}
              placeholder="Group Name(s)"
              onChange={handleChange}
            />
            <div>{values.hash}</div>
            {errors.group &&
              touched.group && (
                <div className="invalgroup-feedback">{errors.group}</div>
              )}
          </Box>
        </Flex>
        <Flex>
          <Box width={theBreaks}>
            <StyledInput
              name="givenName"
              type="text"
              className={`${errors.givenName &&
                touched.givenName &&
                "is-invalid"}`}
              value={values.givenName || ""}
              placeholder="First Name"
              onChange={handleChange}
            />
            <div>{values.hash}</div>
            {errors.givenName &&
              touched.givenName && (
                <div className="invalid-feedback">{errors.givenName}</div>
              )}
          </Box>
        </Flex>
        <Flex>
          <Box width={theBreaks}>
            <StyledInput
              name="familyName"
              type="text"
              className={`${errors.familyName &&
                touched.familyName &&
                "is-invalid"}`}
              value={values.familyName || ""}
              placeholder="Last Name"
              onChange={handleChange}
            />
            <div>{values.hash}</div>
            {errors.familyName &&
              touched.familyName && (
                <div className="invalid-feedback">{errors.familyName}</div>
              )}
          </Box>
          </Flex>
        <Flex>
          <Box width={theBreaks}>
            <StyledInput
              name="primaryEmail"
              type="text"
              className={`${errors.primaryEmail &&
                touched.primaryEmail &&
                "is-invalid"}`}
              value={values.primaryEmail || ""}
              placeholder="Primary Email"
              onChange={handleChange}
            />
            <div>{values.hash}</div>
            {errors. primaryEmail &&
              touched.primaryEmail && (
                <div className="invalid-feedback">{errors.primaryEmail}</div>
              )}
          </Box>
          </Flex>
        {/* <Flex>
          <Box width={theBreaks}>
            <AnimatedMulti
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors.topics}
              styles={orgUnitPathOptions}
              touched={touched.topics}
              colourOptions={orgUnitPathOptions}
              isMulti={false}
              defaultValues={{
                "value": values.orgUnitPath,
                "label": values.orgUnitPath ? values.orgUnitPath.replace("/","") : "",
                "color": "#00B8D9",
                "isFixed": true
              }}
            />

            <div>{values.hash}</div>
            {errors. organizationalUnit &&
              touched.organizationalUnit && (
                <div className="invalid-feedback">{errors.primaryEmail}</div>
              )}
          </Box>
        </Flex> */}
        <Flex>
          <Box width={theBreaks}>
            <pre>{JSON.stringify(values.suspended,null,2)}</pre>
            <label htmlFor="suspended" >
{values.suspended === "true" ? "Suspended" : "Active"}
</label>
            <Toggle
  defaultChecked={values.suspended}
              name='suspended'
              checked={true}
              value={values.suspended === "true" || values.suspended === true ? true : false}
              onChange={setFieldValue}
              // onChange={handleChange}
              onBlur={setFieldTouched}
              aria-label="User status"
            />
            {/* <pre>{JSON.stringify(orgUnitPathOptions,null,2)}</pre> */}
            
            </Box>
              </Flex>
        <ButtonOutline type="submit" mx={1} my={3} color="palevioletred">
          {isSubmitting ? "WAIT PLZ" : "SUBMIT"}
        </ButtonOutline> <CustomButton>Hello</CustomButton>
        {/* <DisplayFormikState {...props} /> */}
      </form>
      <h1>Returned Data</h1>
      <h4>
        {JSON.stringify(status, null, 2)}
        
      </h4>
    </div>
  );
};

// export default withFormik({
//   // mapPropsToValues: props => ({
//   //   uri: props.uri.uri
//   // }),

//   validationSchema: Yup.object().shape({
//     // uri: Yup.string()
//     //   .url("Invalid URI format")
//     //   .required("A valid link is required")
//     //       .test(
//     //         'is-google',
//     //       <ErrorLabel>
//     // Uhhh this isn't google
//     //       </ErrorLabel>,
//     //       value => value === 'http://www.google.com'
//     //       )
//   }),

//   handleSubmit: (
//     values,
//     { resetForm, setStatus, setErrors, setSubmitting }
//   ) => {
//     console.log("handleSubmit");
//     console.log(JSON.stringify(values));
//     postData("http://localhost:3001/api/edituser", values)
//       // postData('http://192.168.180.162:8080/shorten', values)
//       .then(data => {
//         // postData('http://192.168.180.248:8080/api/getShortLink', { hash: e.target.value })
//         // if (data.errors) {
//         //   return () => {
//         //     this.setState({ errors: { msg: data.errors } }, () => console.error(`state in 'then-if' ${this.state}`));
//         //   };
//         // }
//         console.log(`data ${JSON.stringify(data, null, 2)}`);
//         // return data;
//         if (data.errors) {
//           return () => {
//             this.setState({ errors: { msg: data.errors } }, () =>
//               console.error(`state in 'then-if' ${this.state}`)
//             );
//           };
//         }
//         setStatus(data);
//         console.log(`state in 'then' ${JSON.stringify(data)}`);
//         console.log(data);
//         resetForm({});
//         // if (data == { errors: { msg: error } })
//       }) // JSON from `response.json()` call
//       .catch(error => console.error(error));
//     setSubmitting(false);

//     // setTimeout(() => {
//     //   // alert(JSON.stringify(values, null, 2));
//     //   JSON.stringify(values, null, 2);
//     //   setSubmitting(false);
//     // }, 1000);
//   }
// })(EditUserForm);

export default withFormik({
    mapPropsToValues: props => ({
      id: props.id,
      givenName: props.givenName,
      familyName: props.familyName,
      orgUnitPath: props.orgUnitPath,
      primaryEmail: props.primaryEmail,
      suspended: props.suspended
    }),
  
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
      postData("http://localhost:3001/api/edituser", values)
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
  })(EditUserFormAgain);