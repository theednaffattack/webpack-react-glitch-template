import React from "react";
import { Formik, FieldArray } from "formik";
import { Absolute, Box, Button, ButtonOutline as Btn, Flex, Input, Label, Relative, Switch, Text } from "rebass";
import * as Yup from "yup";
import styled from "styled-components";

import Toggle from 'react-toggle';
import MySelect  from '../components/MySelect';
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

const theBreaks = [ 3/4, 1/2, 1/2, 3/4 ];

export const FormExample = () => (
  <div>
    <Formik
      initialValues={{ groups: ["01jlao463vsja9a"], inviteToSlack: true, suspended: false }}
      onSubmit={values =>
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500)
      }
      render={({ 
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
        status }) => (
        <div>
          
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
                
                defaultChecked={!values.suspended}
                name='suspended'
                icons={false}
                // value={values.suspended}
                // onChange={setFieldValue}
                onChange={handleChange}
                onBlur={setFieldTouched}
                aria-label="User status"
              />
  
            </Box>
            </Flex>
          <Flex>
            <Box width={theBreaks}>
              {/* PUT MY STUFF HERE */}
              <label htmlFor="inviteToSlack" >
  {values.inviteToSlack === "true" || values.inviteToSlack === true ? <Text children="Invite to Slack" /> : <Text children="Don't Invite to Slack" />}
  </label>
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
        <Flex>
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
        </Flex>
          <Flex>
            <Box width={theBreaks}>


              <label htmlFor="groups" >
                Groups
              </label>
            <FieldArray
            name="groups"
            render={arrayHelpers => (
              <div>
                {groups.map(group => (
                  <div key={group.name}>
                    <label>
                      <input
                        name="groups"
                        type="checkbox"
                        value={groups.id}
                        checked={values.groups.includes(group.id)}
                        onChange={e => {
                          if (e.target.checked) arrayHelpers.push(group.id);
                          else {
                            const idx = values.groups.indexOf(group.id);
                            arrayHelpers.remove(idx);
                          }
                        }}
                      />{" "}
                      {group.name}
                    </label>
                  </div>
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
          <ButtonOutline type="submit" mx={1} my={3} color="palevioletred">
            {isSubmitting ? "WAIT PLZ" : "SUBMIT"}
          </ButtonOutline> <CustomButton>Hello</CustomButton>
          <DisplayFormikState {...values} />
        </div>
      )}
    />
  </div>
);

const DemoCheckbox = () => (
  <div>
    <FormExample />
  </div>
);

export { DemoCheckbox };
