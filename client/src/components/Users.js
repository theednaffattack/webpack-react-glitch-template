import React from "react";
// import { render } from "react-dom";
// import Logo from "./Logo";
// import { Router, Link } from "@reach/router";
import { Box, Flex, Heading, Text } from 'rebass';
import styled from 'styled-components';
import Table from 'rc-table';
import 'rc-table/assets/index.css';

import { userArray }  from '../data/data';

const Users = (props) => (
  <Flex>
    <Box bg="blue" color="white" p={4} width={[1, 1, 1 / 2]}>
    <Heading f={[4, 5, 6, 7]}>Users</Heading>
    <Table columns={columns} data={userArray} components={components} />
    </Box>
  </Flex>
);

export default Users;

const link = "/api/users/edit/";

const columns = [
  { title: 'Name', dataIndex: 'fullName', key: 'fullName', width: 200 },
  { id: '123', title: 'Suspended?', dataIndex: 'suspended', key: 'suspended', width: 100 },
  { title: 'title3', dataIndex: 'c', key: 'c', width: 200 },
  {
    title: 'Email',
    dataIndex: 'id',
    key: 'id',
    render() {
      return <a href={link}>Edit User</a>;
    },
  },
];

const data = [
  { a: '123', key: '1' },
  { a: 'cdd', b: 'edd', key: '2' },
  { a: '1333', c: 'eee', d: 2, key: '3' },
];

// palevioletred = 219 112 147 1

const BodyRow = styled.tr`
  font-size: 1rem;
  color: white;
  border: 1px, solid, #000;
  &:hover {
    background: rgba(219, 112, 147, .5) !important;
    color: white !important;
  }
`;

const HeaderRow = styled.tr`
  font-size: 1rem;
  color: black;
  background:  palevioletred !important;
`;

const HeaderCell = styled.td`
  font-size: 1rem;
  color: black;
  background:  palevioletred !important;
`;

const components = {
  header: {
    // wrapper: HeaderWrapper,
    row: HeaderRow,
    cell: HeaderCell,
  },
  body: {
    row: BodyRow,
  },
};