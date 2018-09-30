import React from "react";
import { Formik, Form, FieldArray } from "formik";
import { Absolute, Box, Button, ButtonOutline as Btn, Card, Flex, Input, Label, Relative, Switch, Text } from "rebass";
import * as Yup from "yup";
import styled from "styled-components";

import Toggle from 'react-toggle';
import { Checkbox, CheckboxGroup } from 'accessible-react-checkbox-group';
import MySelect  from '../components/MySelect';
import { GroupSelect }  from '../example/groupSelect';

import "react-toggle/style.css"
import AnimatedMulti from "../components/AnimatedSelect";
import { mrGroups as groups, groupsTest, orgUnitPathOptions } from "../data/data";
import DisplayFormikState from "../components/DisplayFormikState";
console.clear();

const categories = [
  { id: "movies", name: "Movies" },
  { id: "music", name: "Music" },
  { id: "videoGames", name: "Video Games" }
];

const ButtonOutline = styled(Btn)`
  background-color: transparent;
  border-color: palevioletred;
  transition: all 0.16s ease-in-out;
  &:hover {
    color: #fff;
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

const theBreaks = [ 3/4, 1/2, 1/2, 3/4 ];

export const AddUserForm = ({
  values,
  touched,
  dirty,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  handleReset,
  setFieldValue,
  setFieldTouched,
  isSubmitting,
  resetForm
}) => (
  <div>

    <Formik
      initialValues={{ groups: ["01jlao463vsja9a"], insertIntoEnvoy: false, inviteToSlack: true, shareCorpCal: true, suspended: false }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500);
        console.log(`state in 'then' ${JSON.stringify({key: 'value'})}`);
        actions.resetForm();
        !actions.isSubmitting;
      }
      }
      render={({ 
        children,
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
      }, ...props) => (
        <div>

          {/* <DisplayFormikState {...values} /> */}
      <Form className="" onSubmit={handleSubmit}>
          
<Card
  my={3}
  p={4}
  bg="transparent" 
  borderRadius={8}
  boxShadow='0 2px 16px rgba(0, 0, 0, 0.25)'>
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
              <StyledInput
                name="personalEmail"
                type="text"
                className={`${errors.personalEmail &&
                  touched.personalEmail &&
                  "is-invalid"}`}
                value={values.personalEmail || ""}
                placeholder="Personal Email"
                onChange={handleChange}
              />
              <div>{values.hash}</div>
              {errors. personalEmail &&
                touched.personalEmail && (
                  <div className="invalid-feedback">{errors.personalEmail}</div>
                )}
            </Box>
            </Flex>
            </Card>
          {/* <Flex>
            <Box width={theBreaks}>
              <label htmlFor="suspended" >
  {values.suspended === true ? <Text children="Suspended" /> : <Text children="Active" />}
  </label>
              <Toggle
                // defaultChecked={!values.suspended}
                name='suspended'
                icons={false}
                value={!values.suspended}
                // onChange={setFieldValue}
                onChange={handleChange}
                onBlur={setFieldTouched}
                aria-label="User status"
              />
  
            </Box>
            </Flex> */}

<Card
  my={3}
  px={4}
  pt={3}
  pb={3}
  bg="transparent" 
  borderRadius={8}
  boxShadow='0 2px 16px rgba(0, 0, 0, 0.25)'>
          <Flex>
            <Box width={1}>

                <Text fontSize={[ 3, 4, 4 ]} py={2}>Services</Text>
         
  </Box>
            </Flex>
            <Flex>
              <Box width={1} py={2}>

            <StyledHr />
              </Box>
            </Flex>
            <Flex>{/* PUT MY STUFF HERE */}
            <Box width={4/5} my="auto">
              <label htmlFor="inviteToSlack" >
  {values.inviteToSlack === "true" || values.inviteToSlack === true ? <Text children="Invite to Slack" /> : <Text children="Don't Invite to Slack" />}
  </label>
  </Box>
            <Box width={1/5} my="auto">
              <Toggle
                name='inviteToSlack'
                icons={false}
                defaultChecked={values.inviteToSlack}
                // value={values.inviteToSlack}
                // onChange={setFieldValue}
                onChange={handleChange}
                onBlur={setFieldTouched}
                aria-label="Invite to Slack"
              />
  
            </Box>
            </Flex>
            {/* HR Row - postSlack - BEG */}
            <Flex>
            <Box width={1} py={2}>
            <StyledHr />
            </Box>
            </Flex>
            {/* HR Row - postSlack - END */}
          <Flex>
            <Box width={4/5}>
              {/* PUT MY STUFF HERE */}
              <label htmlFor="insertIntoEnvoy" >
  {values.insertIntoEnvoy === "true" || values.insertIntoEnvoy === true ? <Text children="Insert into Envoy" /> : <Text children="Don't Insert into Envoy" />}
  </label>
  </Box>
            <Box width={1/5} my="auto">
              <Toggle
                name='insertIntoEnvoy'
                icons={false}
                defaultChecked={values.insertIntoEnvoy}
                // value={values.insertIntoEnvoy}
                // onChange={setFieldValue}
                onChange={handleChange}
                onBlur={setFieldTouched}
                aria-label="Insert Into Envoy"
              />
  
            </Box>
            </Flex>
            {/* HR Row - postSlack - BEG */}
            <Flex>
            <Box width={1} py={2}>
            <StyledHr />
            </Box>
            </Flex>
            {/* HR Row - postSlack - END */}
          <Flex>
            <Box width={4/5}>
              {/* PUT MY STUFF HERE */}
              <label htmlFor="shareCorpCal" >
  {values.shareCorpCal === "true" || values.shareCorpCal === true ? <Text children='Share "Corp" Calendar' /> : <Text children='Do not Share "Corp" Calendar' />}
  </label>
  </Box>
            <Box width={1/5} my="auto">
              <Toggle
                name='shareCorpCal'
                icons={false}
                defaultChecked={values.shareCorpCal}
                // value={values.shareCorpCal}
                // onChange={setFieldValue}
                onChange={handleChange}
                onBlur={setFieldTouched}
                aria-label="Insert Into Envoy"
              />
            </Box>
            </Flex>

            </Card>
            {/* <Flex>
          <Box width={theBreaks}>
            <label htmlFor="groupsTest" >
              groupsTest
            </label>
            <AnimatedMulti
              name="groupsTest"
              value={groupsTest[0]["value"]}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors.groupsTest}
              styles={groupsTest}
              touched={touched.groupsTest}
              colourOptions={groupsTest}
              isMulti={true}
              defaultValues={[{...groupsTest[0]},{...groupsTest[1]}]}
            />
          </Box>
        </Flex> */}
        {/* GROUPS CARD */}
<Card
  css={{
    maxWidth: '600px'
  }}
  my={3}
  px={4}
  pt={3}
  pb={3}
  mx="auto"
  bg="transparent" 
  borderRadius={8}
  boxShadow='0 2px 16px rgba(0, 0, 0, 0.25)'>

          <Flex>
            <Box width={1}>
              <label htmlFor="groups" >
                <Text fontSize={[ 3, 4, 4 ]} py={2}>M.R. Groups</Text>
              </label>
            <StyledHr />
            <FieldArray
            name="groups"
            render={arrayHelpers => (
              <div>
                {groups.map(group => (

              
          <Flex key={group.name}>
          <Box width={4/5} m={0} p={0} bg={values.groups.includes(group.id) ? 'rgba(255, 0, 255, 0.25)' : 'transparent'}>
<Flex>
          <Box width={4/5} my={3}>
  <Text
  color='white'
  >
    {group.name}
  </Text>
  </Box>
  <Box width={1/5} my="auto">

            {/* PUT MY STUFF HERE */}
            <label htmlFor="groups" >
<Text color="black" />
</label>
            <Toggle
              name='groups'
              icons={false}
              defaultChecked={values.groups.includes(group.id)}
              // value={values.groups.includes(group.id)}              
              onChange={e => {
                if (e.target.checked) arrayHelpers.push(group.id);
                else {
                  const idx = values.groups.indexOf(group.id);
                  arrayHelpers.remove(idx);
                  }
                }
              }
              onBlur={setFieldTouched}
              aria-label={group.name}
            />
            </Box>
            </Flex>
            <StyledHr />
          </Box>
          </Flex>
                    // <label key={group.name} style={{display: "block"}}>
                    //   <input
                    //     name="groups"
                    //     type="checkbox"
                    //     value={group.id}
                    //     checked={values.groups.includes(group.id)}
                    //     onChange={e => {
                    //       if (e.target.checked) arrayHelpers.push(group.id);
                    //       else {
                    //         const idx = values.groups.indexOf(group.id);
                    //         arrayHelpers.remove(idx);
                    //       }
                    //     }
                    //   }
                    //   style={{transform: "scale(1.3)"}}
                    //   />{" "}
                    //   {group.name}
                    // </label> 
                ))}
              </div>
            )}
          />
              {/* <AnimatedMulti
                name="groups"
                value={groups[0]["id"]}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.groups}
                styles={groups}
                touched={touched.groups}
                colourOptions={groups}
                isMulti={true}
                defaultValues={[{...groups[0]},{...groups[1]}]}
              /> */}
            </Box>
          </Flex>
              </Card>
          <ButtonOutline disabled={isSubmitting} type="submit" mx={1} my={3} color="palevioletred">
            {isSubmitting ? "WAIT PLZ" : "SUBMIT"}
          </ButtonOutline>
          <DisplayFormikState {...values} />
          <pre>{JSON.stringify( id )}</pre>
      </Form>
        </div>
      )}
    />
  </div>
);

const DemoCheckbox = () => (
  <div>
    <AddUserForm />
  </div>
);

export { DemoCheckbox };

const StLabel = styled.label`
  background: red;
  display: block;
  padding: 1rem;
`;

const StInput = styled.input`
  &:checked + ${Label} {
    background: blue;
  }
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  > input {
    opacity: 0;
    /* width: 20px;
    height: 20px; // dim. de la case */
  }
  > input + label {
    position: relative; /* permet de positionner les pseudo-éléments */
    padding-left: 2px; /* fait un peu d'espace pour notre case à venir */
    cursor: pointer;    /* affiche un curseur adapté */
    &:before {
      content: '';
      position: absolute;
      left:0; top: 1px;
      width: 17px; height: 17px; /* dim. de la case */
      border: 1px solid #aaa;
      background: #f8f8f8;
      border-radius: 3px; /* angles arrondis */
      box-shadow: inset 0 1px 3px rgba(0,0,0,.3) /* légère ombre interne */
    }
    &:after {
      content: '✔';
      position: absolute;
      top: -1px; left: 2px;
      font-size: 16px;
      color: #09ad7e;
      transition: all .2s; /* on prévoit une animation */
    }
  }
  > input:not(:checked) + label {
      &:after {
        opacity: 0; /* coche invisible */
        transform: scale(0); /* mise à l'échelle à 0 */
      }
  }
  > input:disabled:not(:checked) + label {
      &:before {
        box-shadow: none;
        border-color: #bbb;
        background-color: #ddd;
      }
  }
  > input:checked + label {
    &:after {
      opacity: 1; /* coche opaque */
      transform: scale(1); /* mise à l'échelle 1:1 */
    }
  }
  > input:disabled:checked + label {
    &:after {
      color: #999;
    }
  }
  > input:disabled + label {
    color: #aaa;
  }
  > input:checked:focus + label, input:not(:checked):focus + label {
    &:before {
      border: 1px dotted blue;
    }
  }
`;


// make this a round slider styles below
const StyledCheckbox2 = styled.input`
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

const StyledHr = styled.hr`
  margin-top: 0;
  margin-bottom: 0;
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, rgba(255,255,255, 0), rgba(255,255,255, 0.75), rgba(255,255,255, 0));
`;