import React from "react";
import { Banner, Box, Flex, Heading, Text } from "rebass";
import styled from "styled-components";

import FormContainer from "./FormContainer";
import UrlForm from "./UrlForm";

const RoundedBanner = styled(Banner)`
  border-radius: 25px;
`;

const Exercise = props => (
  <Box bg="blue" color="white" p={4} width={[1, 1, 1 / 2]}>
    <Heading f={[4, 5, 6, 7]}>Exercise Dashboard</Heading>
    <Flex flexWrap="wrap" mx={-2}>
      <Box px={2} py={2} width={[1, 1, 1]}>
        <FormContainer />
      </Box>
    </Flex>
  </Box>
);

export default Exercise;
