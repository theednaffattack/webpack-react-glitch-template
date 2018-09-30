import React from "react";
import { Block, Box, ButtonOutline as Btn, Flex, Text } from "rebass";
import * as Yup from "yup";
import styled from "styled-components";
import { withFormik, Field } from "formik";
import DisplayFormikState from "./DisplayFormikState";
import RcCheckbox from "rc-checkbox";
import { Checkbox, CheckboxGroup } from 'accessible-react-checkbox-group';
import StyledCheckbox from './StyledCheckbox';
import 'rc-checkbox/assets/index.css';
import '../styles/rc-Checkbox.css'
// import DisplayStatusData from "./DisplayStatusData";
import AnimatedMulti from "./AnimatedSelect";
import { groupsTest as groups, orgUnitPathOptions } from "../data/data";

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


const theBreaks = [ 3/4, 1/2, 1/2, 1/3 ];

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

function onCheckboxChange(e) {
  // console.log('Checkbox checked:', (e.target.checked));
  console.log('Checkbox value:', (e.target.value));
}
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

const StyledCheck = styled(RcCheckbox)`
    appearance:none;
    width:30px;
    height:30px;
    background:white;
    border-radius:5px;
    border:2px solid #555;

    &:checked {
    background: #000;
  }
`;

const StyledInputLabel = styled.label`
  display: block;
`;

const ErrorLabel = styled.span`
  display: inline-block;
`;

// from: https://codesandbox.io/s/328038x19q
function DemoCheckbox(props) {
  // console.log(props)
  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <label>
          <input
            type="checkbox"
            {...props}
            onChange={props.onChange}
            checked={groups.map(x => x.label).includes(props.value)}
            value={props.value}
            // onChange={() => {
            //   if (field.value.includes(props.value)) {
            //     const nextValue = field.value.filter(
            //       value => value !== props.value
            //     );
            //     form.setFieldValue(props.name, nextValue);
            //   } else {
            //     const nextValue = field.value.concat(props.value);
            //     form.setFieldValue(props.name, nextValue);
            //   }
            // }}
          />
          { props.label }
        </label>
      )}
    </Field>
  );
}


const UriForm = props => {
  const {
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
      <form className="" onSubmit={handleSubmit}>
        <div>
          {/* <StyledInputLabel htmlFor="userId">User ID</StyledInputLabel> */}
          <StyledInput
            name="username"
            type="text"
            className={`form-control ${errors.username &&
              touched.userId &&
              "is-invalid"}`}
            value={values.username || ""}
            placeholder="Username"
            onChange={handleChange}
          />
          <div>{values.hash}</div>
          {errors.username &&
            touched.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
        </div>
       <Flex>
        <Box width={theBreaks}>
         <label htmlFor="orgUnitPath">Organizational Unit</label>
             {/* <AnimatedMulti
              id="orgUnitPath"
              name="orgUnitPath"
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors.orgUnitPath}
              styles={orgUnitPathOptions}
              touched={touched.orgUnitPath}
              colourOptions={orgUnitPathOptions}
              isMulti={false}
            /> */}
<label htmlFor="">
          {/* <Checkbox
style={}
              defaultChecked
              onChange={onCheckboxChange}
              value={values.groups ? values.groups[0] : ""}
              // disabled={values.}
              /> */}
              <StyledCheck
              name="groups"
                defaultChecked
                onChange={handleChange}
                value={values.groups ? values.groups[0] : ""}
              />
              {/* <StyledCheckbox
              checked={true}
                defaultChecked
                onChange={onCheckboxChange}
                value={"test"} /> */}
              Forgot to label this</label>
          <div>{values.hash}</div>
          {errors.orgUnitPath &&
            touched.orgUnitPath && (
              <div className="invalid-feedback">{errors.orgUnitPath}</div>
            )}
            </Box>
            </Flex>
            <Flex>
              <Box>

              <CheckboxGroup
                name="groups"
                checkedValues={[groups[2]["label"],groups[1]["label"]]}
                onChange={handleChange}>
        
                <Checkbox value={values.groups}/> {groups[0]["label"]}
                <Checkbox value={groups[1]["label"]}/> {groups[1]["label"]}
                <Checkbox value={groups[2]["label"]}/> {groups[2]["label"]}
              </CheckboxGroup>
          <div>{values.hash}</div>
          {errors.orgUnitPath &&
            touched.orgUnitPath && (
              <div className="invalid-feedback">{errors.orgUnitPath}</div>
            )}
              </Box>
            </Flex>
<Flex>
  <Box>

            <DemoCheckbox name="demoGroups" onChange={setFieldValue} value={groups[0].label} label={groups[0].label} /> 
            <DemoCheckbox name="demoGroups" onChange={setFieldValue} value={groups[1].label} label={groups[1].label} />
  </Box>
</Flex>
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
        <p>
          {window
            ? JSON.stringify("===WINDOW===", window.location, null, 2)
            : ""}
        </p>
        {status ? (
          <a href={`/api/exercise/log?${status.username}`}>
            {`${window.location.origin}/api/exercise/log?${JSON.stringify(
              status,
              null,
              2
            )}`}
          </a>
        ) : (
          "ksdfjksadjfk"
        )}
      </h4>
    </div>



    // <div>
    //   <form onSubmit={handleSubmit}>
    //   <Flex>
    //     <Box width={theBreaks}>
    //       <StyledInput
    //         name="givenName"
    //         type="text"
    //         className={`${errors.givenName &&
    //           touched.givenName &&
    //           "is-invalid"}`}
    //         value={values.givenName || ""}
    //         placeholder="First Name"
    //         onChange={handleChange}
    //       />
    //       <div>{values.hash}</div>
    //       {errors.givenName &&
    //         touched.givenName && (
    //           <div className="invalid-feedback">{errors.givenName}</div>
    //         )}
    //     </Box>
    //   </Flex>
    //   <Flex>
    //     <Box width={theBreaks}>
    //       <StyledInput
    //         name="familyName"
    //         type="text"
    //         className={`${errors.familyName &&
    //           touched.familyName &&
    //           "is-invalid"}`}
    //         value={values.familyName || ""}
    //         placeholder="Last Name"
    //         onChange={handleChange}
    //       />
    //       <div>{values.hash}</div>
    //       {errors.familyName &&
    //         touched.familyName && (
    //           <div className="invalid-feedback">{errors.familyName}</div>
    //         )}
    //     </Box>
    //     </Flex>
    //   <Flex>
    //     <Box width={theBreaks}>
    //       <StyledInput
    //         name="primaryEmail"
    //         type="text"
    //         className={`${errors.primaryEmail &&
    //           touched.primaryEmail &&
    //           "is-invalid"}`}
    //         value={values.primaryEmail || ""}
    //         placeholder="Primary Email"
    //         onChange={handleChange}
    //       />
    //       <div>{values.hash}</div>
    //       {errors. primaryEmail &&
    //         touched.primaryEmail && (
    //           <div className="invalid-feedback">{errors.primaryEmail}</div>
    //         )}
    //     </Box>
    //     </Flex>
    //   <Flex>
    //     <Box width={theBreaks}>
    //     <label htmlFor="orgUnitPath">Organizational Unit</label>
    //         <AnimatedMulti
    //           id="orgUnitPath"
    //           name="orgUnitPath"
    //           onChange={setFieldValue}
    //           onBlur={setFieldTouched}
    //           error={errors.orgUnitPath}
    //           styles={orgUnitPathOptions}
    //           touched={touched.orgUnitPath}
    //           colourOptions={orgUnitPathOptions}
    //           isMulti={false}
    //         />

          
    //       <div>{values.hash}</div>
    //       {errors.orgUnitPath &&
    //         touched.orgUnitPath && (
    //           <div className="invalid-feedback">{errors.orgUnitPath}</div>
    //         )}
    //         </Box>
    //         </Flex>
    //   <Flex>
    //     <Box width={theBreaks}>
          
    //       <StyledInput
    //         name="phone"
    //         type="phone"
    //         className={`${errors.phone &&
    //           touched.phone &&
    //           "is-invalid"}`}
    //         value={values.phone || ""}
    //         placeholder="Phone"
    //         onChange={handleChange}
    //       />
    //       <div>{values.hash}</div>
    //       {errors. phone &&
    //         touched.phone && (
    //           <div className="invalid-feedback">{errors.phone}</div>
    //         )}
    //         </Box>
    //         </Flex>

    //     <ButtonOutline type="submit" mx={1} my={3} color="pink">
    //       {isSubmitting ? "WAIT PLZ" : "SUBMIT"}
    //     </ButtonOutline>
    //     {/* <DisplayFormikState {...props} /> */}
    //   </form>
    //   {/* <h1>Returned Data</h1>
    //   <div>{status ? <DisplayStatusData status={status} /> : ""}</div> */}

    // </div>
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
    postData("/api/exercise/new-user", values)
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
        console.log(`state in 'then' ${JSON.stringify(data)}`);
        console.log(data);
        resetForm({});
        setStatus(data);
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
