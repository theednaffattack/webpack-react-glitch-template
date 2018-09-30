import React from "react";
import { Banner, Box, Flex, Heading, Text } from "rebass";
import styled from "styled-components";
import { DemoCheckbox, SingleUserEdit } from "../example/EditUserDemo";
import EditUserFormContainer from "./EditUserFormContainer";

const RoundedBanner = styled(Banner)`
  border-radius: 25px;
`;

const EditUser = props => (
  <Box bg="blue" color="white" p={4} width={[1, 1, 1 / 2]}>
    <Heading f={[4, 5, 6, 7]}>Edit User</Heading>
    <Flex flexWrap="wrap" mx={-2}>
      <Box px={2} py={2} width={[1, 1, 1]}>
        {/* <EditUserFormContainer /> */}
        <SingleUserEdit userKey={props.userId} />
        <DemoCheckbox userId={props.userId} />
      </Box>
    </Flex>
  </Box>
);

export default EditUser;
