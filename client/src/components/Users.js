import React from "react";
// import { render } from "react-dom";
// import Logo from "./Logo";
// import { Router, Link } from "@reach/router";
import { FuzzyFilter } from './FuzzyFilter';
import { Box, Card, Flex, Heading, Text } from 'rebass';
import styled from 'styled-components';
import Table from 'rc-table';
import '../styles/rc-table.css';

import { userArray }  from '../data/data';


const Users = (props) => (
  <Flex>
    <Box bg="blue" p={4} width={[1, 1, 1 / 2]}>
    <FuzzyFilter />
    <Heading f={[4, 5, 6, 7]} color="white">Users</Heading>
    <Card p={0} >
    <StyledInput placeholder="Search" />
    <Table
      columns={columns}
      scroll={{ x: 400, y: 500 }}
      data={
        userArray.map(x => {
          return <span key={x.primaryEmail}>{x.primaryEmail} </span>;
        })} 
      components={components}
      showHeader={false}
      style={{borderCollapse: "collapse"}}
    />
    </Card>
    </Box>
  </Flex>
);

export default Users;

const link = "/api/users/edit/";

const columns = [
  {
    title: 'Name',
    dataIndex: 'fullName',
    key: (record)  => {record.id},
    render(text, record) {
      return <a href={link+record.id}>{text}</a>;
    },
    width: 200
  },
  {
    title: 'Email',
    dataIndex: 'id',
    key: (text, record) => {text + record.id},
    render(text, record) {
      return <a href={'mailto:' + record.primaryEmail}>{record.primaryEmail}</a>;
    },
    width: 200
  }
];

const data = [
  { a: '123', key: '1' },
  { a: 'cdd', b: 'edd', key: '2' },
  { a: '1333', c: 'eee', d: 2, key: '3' },
];

// palevioletred = 219 112 147 1

const BodyRow = styled.tr`
  font-size: 1rem;
  color: #000;
  /* border: 1px, solid, #000; */
  &:hover {
    /* background: rgba(219, 112, 147, .5) !important; */
    background: rgba(218, 165, 32,.5) !important;
    /* color: white !important; */
  }
  &:nth-child(even) {background: #ecf0f1}
`;

const BodyCell = styled.td`
border-bottom-width: 0;
border-bottom: 0;
/* color: white; */
`;

const HeaderRow = styled.tr`
  font-size: 1rem;
  color: black;
  background:  palevioletred !important;
  border: 0;
`;

const HeaderCell = styled.td`
  font-size: 1rem;
  color: black;
  background:  rgba(1,124,224,1) !important;
  border: 0;
`;

const components = {
  header: {
    // wrapper: HeaderWrapper,
    row: HeaderRow,
    cell: HeaderCell,
  },
  body: {
    row: BodyRow,
    cell: BodyCell
  },
};



const StyledInput = styled.input`
  clear: both;
  width: 100%;
  border: 4px solid #ecf0f1;
  border-left: none;
  border-right: none;
  margin-bottom: 0;
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