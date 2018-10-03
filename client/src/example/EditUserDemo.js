import React from "react";
import { Formik, Form, FieldArray } from "formik";
import { Absolute, Box, Button, ButtonOutline as Btn, Card, Flex, Input, Label, Relative, Switch, Text } from "rebass";
import * as Yup from "yup";
import styled from "styled-components";

import Toggle from 'react-toggle';
import MySelect  from '../components/MySelect';
import { GroupSelect }  from '../example/groupSelect';
import userSingleQuery from '../queries/userSingleQuery';
import userSingleWithGroupsQuery from '../queries/userSingleWithGroupsQuery';
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

// let EditArgStructure = { maxResults: 200, orderBy: "familyName", domain: "madison-reed.com", userKey: "100535930113334021495" }
// let userId = "114021678443709883275"

const SingleUserEdit = ({ userKey }) => (
  <Query query={userSingleWithGroupsQuery} variables={{ userKey }}>
    {({ loading, error, data }) => {
      if (loading) return 'LOADING'
      if (error)
        return `
      👻  🌟   ERROR  🌟  👻 :
      ${JSON.stringify(error, null, 2)}
      `

      // let userData = data.users.map((user, index) => (
      //   <tr key={user.primaryEmail + index}>
      //     <td>::</td>
      //     <td className="station">{user.fullName}</td>
      //     <td className="station">{user.primaryEmail}</td>
      //     <td className="station">{user.lastLoginTime}</td>
      //     <td className="station">
      //       <button>X</button>
      //     </td>
      //   </tr>
      // ))
      console.log("data")
      console.log(data)

      return (
        <FormExample userId={userKey} data={data} />
        )
      }}
    </Query>
  );
export const FormExample = ({
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
  resetForm,
  userId,
  data
}) => (
  <div>

    <Formik
      initialValues={{
        givenName: data ? data.userWithGroups.givenName : "",
        familyName: data ? data.userWithGroups.familyName : "",
        primaryEmail: data ? data.userWithGroups.primaryEmail : "",
        userId,
        // Below: if we're loading => [], if the response Array is null => []
        groups: (data) && (data.userWithGroups.groups !== null) 
                ? data.userWithGroups.groups.map(group => group.id)
                : [],
        insertIntoEnvoy: false,
        inviteToSlack: true,
        shareCorpCal: true,
        suspended: false
      }}
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
      }, props) => (
        <div>

          {/* <DisplayFormikState {...values} /> */}

      <Form className="" onSubmit={handleSubmit}>
          
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
              {/* PUT MY STUFF HERE */}
              <label htmlFor="inviteToSlack" >
  {values.insertIntoEnvoy === "true" || values.insertIntoEnvoy === true ? <Text children="Insert into Envoy" /> : <Text children="Don't Insert into Envoy" />}
  </label>
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
          <Flex>
            <Box width={theBreaks}>
              {/* PUT MY STUFF HERE */}
              <label htmlFor="shareCorpCal" >
  {values.shareCorpCal === "true" || values.shareCorpCal === true ? <Text children='Share "Corp" Calendar' /> : <Text children='Do not Share "Corp" Calendar' />}
  </label>
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

              
          <Flex key={group.id}>
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
                ))}
              </div>
            )}
          />
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

const DemoCheckbox = (props) => (
  <div>
    <FormExample userId={props.userId} />
  </div>
);

export { DemoCheckbox, SingleUserEdit };

import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_DOGS = gql`
  {
    dogs {
      id
      breed
    }
  }
`;

const Dogs = ({ onDogSelected }) => (
  <Query query={GET_DOGS}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      return (
        <select name="dog" onChange={onDogSelected}>
          {data.dogs.map(dog => (
            <option key={dog.id} value={dog.breed}>
              {dog.breed}
            </option>
          ))}
        </select>
      );
    }}
  </Query>
);


const StyledHr = styled.hr`
  margin-top: 0;
  margin-bottom: 0;
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, rgba(255,255,255, 0), rgba(255,255,255, 0.75), rgba(255,255,255, 0));
`;