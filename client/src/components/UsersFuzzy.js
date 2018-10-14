import React from "react";
// import { render } from "react-dom";
// import Logo from "./Logo";
// import { Router, Link } from "@reach/router";
import { FuzzyFilter } from './FuzzyFilter';
import { Badge, Box, Card, Flex, Heading, Button, Text } from 'rebass';
import styled from 'styled-components';
import Table from 'rc-table';
import _ from "lodash/fp";
import Fuse from "fuse.js";
import Toggle from 'react-toggle';
import InlineSVG from 'svg-inline-react';
import '../styles/rc-table.css';

import { userArray }  from '../data/data';

class UsersFuzzy extends React.Component {
  state = {
    searchVal: "",
    data: this.props.data,
    resultsLength: this.props.data.length
  };
  someCounter = 100;

  fuse(e, y) {
    const nested = y === 2 ?
  [{ name: "emails.address", weight: 0.4 } /* , { name: "emails.vals", weight: 0.3 } */ ] :
     [{ name: "fullName", weight: 0.4 } /* , { name: "primaryEmail", weight: 0.2 }, { name: "orgUnitPath", weight: 0.2 } */ ];
    const threshhold = y === 2 ? 0.3 : 0.3;
    // 2 means it is nested
    var opts = {
      shouldSort: true,
      threshold: threshhold,
      keys: nested
    };
    var fuse = new Fuse(e, opts);
    var res = fuse.search(this.state.searchVal);
    return res;
  }
  // stuff

  nestedUniq(e) {
    const res = _.flow(_.flatMap("emails"), _.values(), _.uniqBy("address"))(e);
    // THIS will cause an issue IF have two sub-tags with the same name (differing vals). Is this a super rare case? Orange and Orange?
    // COULD do uniqueBy vals instead?
    // const err = _.flow(_.flatMap("typechild"), _.values(), _.uniqBy("name"))(e)
    // res.forEach(el => { el.clickOrder = this.someCounter++})
    // console.log("err", res);
    return res;
  }
  render() {
    // console.log(userData)
    const { searchVal, data, resultsLength } = this.state;
    const searchOn = searchVal.length > 0;

    let output1;
    let output2;
    let output1Length;

    if (searchOn && this.fuse(data).length > 0) {
      output1 = this.fuse(data);
      output1Length = output1.length;
      output2 = this.fuse(data).filter(e => this.fuse(data)).map(r => r.emails)[0];
    } else if (searchOn && this.fuse(data, 2).length > 0) {
      output1 = this.fuse(data, 2);
      output1Length = output1.length;
      // output2 = this.fuse(this.nestedUniq(data, 2));
    } else if (searchOn && this.fuse(data, 2).length === 0 && this.fuse(data).length === 0) {
      output1 = [{ fullName: "No Results" }];
      output1Length = 0;
      // output2 = [{ name: "No Res" }];
    } 
    else {
      // data.forEach(el => { el.clickOrder = this.someCounter++*30 })
      output1 = data;

      // output1Length = output1.length;
      // output2 = this.nestedUniq(data);
    }

    return (
            <Flex>
              <Box bg="blue" p={4} width={[1, 1, 1 / 2]}>
              <Heading f={[4, 5, 6, 7]} color="white">Users</Heading>
              <Text color="white">
                {/* Showing {output1Length} of {data.length} */}
              </Text>
              <Card p={0} >
              <StyledInput
              placeholder="Search"
              onChange={e => this.setState({ searchVal: e.target.value })} />
              <Table
                columns={columns}
                scroll={{ x: 400, y: 500 }}
                data={output1}
                components={components}
                showHeader={false}
                style={{borderCollapse: "collapse"}}
              />
              </Card>
              </Box>
            </Flex>
    );
  }
}


const Users = (props) => (
  <Flex>
    <Box bg="blue" p={4} width={[1, 1, 1 / 2]}>
    <FuzzyFilter />
    <Heading f={[4, 5, 6, 7]} color="white">Users</Heading>
    <Card p={0} >
    <StyledInput placeholder="Search" />
    <Table
      columns={columns}
      scroll={{ x: 300, y: 500 }}
      data={
        output1.map(x => {
          return <span key={x.primaryEmail}>{x.primaryEmail} </span>;
        }) }
      components={components}
      showHeader={false}
      style={{borderCollapse: "collapse"}}
    />
    </Card>
    </Box>
  </Flex>
);

export { UsersFuzzy };

const link = "/api/users/edit/";


const columns = [
  {
    title: 'Name',
    dataIndex: 'fullName',
    key: (record)  => {record.id},
    render(text, record) {
      return <Flex>
        <Box width={[1/5]}>
          <Box mx="auto" my={1} style={{maxWidth: "35px", width: "35px"}}>
            <InlineSVG src={require("../../../dist/logos/default-user.svg")} />
          </Box>
        </Box>
        <Box width={[4/5]}>
          <Flex flexDirection="column">
            <Box>
              <a href={link+record.id}>{text}</a>
            </Box>
            <Box>
              <a href={'mailto:' + record.primaryEmail}>{record.primaryEmail}</a>
            </Box>
          </Flex>
        </Box>
      </Flex> ;
    },
    width: 200
  },
  {
    title: 'Suspended',
    dataIndex: 'suspended',
    rowKey: (text, record) => {text + record.suspended},
    key: (text, record) => {text + record.suspended},
    render(text, record) {
      return <Flex>
        <Box width={1/2}>

              {/* {record.suspended == true ? "Suspended" : "Active"} */}
              {/* <pre>{JSON.stringify(record, null, 2)}</pre> */}
              {record.suspended.toString() === 'true' ? <Text>Suspended</Text> : <Text>Active</Text>}
              <Toggle
                name='suspended'
                icons={false}
                defaultChecked={!record.suspended}
                // value={values.inviteToSlack}
                // onChange={setFieldValue}
                // onChange={handleChange}
                // onBlur={setFieldTouched}
                aria-label="Suspended User?"
              />
        </Box>
            </Flex>;
    },
    width: 200
  },
  {
    title: 'Delete',
    dataIndex: 'id',
    rowKey: (text, record) => {text + record.id},
    key: (text, record) => {text + record.id},
    render(record) {
      return <Flex>
        <Box width={1/2}>

              <StyledDeleteButton bg="#007ce0">
                <Box style={{maxWidth: "16px", width: "16px"}}>
                  <InlineSVG
                    style={{fill: "#fff"}}
                    src={require("../../../dist/logos/Octicons-trashcan.svg")}
                    />
                </Box>
              </StyledDeleteButton>
        </Box>
            </Flex>;
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
  &:hover {
    background: rgba(255, 20, 147, .5) !important;
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

const StyledDeleteButton = styled(Button)`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  color: #fff;
  font-size: 1em;

  &:hover {
    cursor: pointer;
  }

  /* &:hover {
    border: 3px solid blue;
    outline: none;
  }

  &:focus {
    border: 2.5px solid blue;
    outline: none;
  } */
`;
