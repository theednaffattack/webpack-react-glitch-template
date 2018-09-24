import React from "react";
import { Pre } from "rebass";
import styled from "styled-components";
import { Avatar, Badge, Box, Panel, Subhead, Text } from 'rebass';
import format from 'date-fns';
import { withRouter } from 'next/router'

const theBreaks = [ 3/4, 1/2, 1/2, 1/3 ];

function SomeList(props) {
  let {status} = props;
  // let statusMap = !status ? [] : status.map((something) => {
  //   // let formattedDate = format(something.lastLoginTime, 'MM/dd/yyyy');
  //   return (
  //   <Box m={3} width={theBreaks}>
  //   <Panel color='#ee0067' key={something.primaryEmail.toString()}>
  //   <Panel.Header
  //     color='white'
  //     bg='pink'>

  //     <a href={`/edituser?id=${something.id}&givenName=${something.givenName}&familyName=${something.familyName}&orgUnitPath=${something.orgUnitPath}&primaryEmail=${something.primaryEmail}&suspended=${something.suspended}`} target="_blank">
    
  //     <Avatar
  //       size={32}
  //       src='https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2048&q=20'
  //     />
  //     {something.fullName}</a>
  //     </Panel.Header>
  //   <Box p={3}>
  //     <Text>
  //       {something.primaryEmail}
  //     </Text>
  //     <Text>Last Login: {something.lastLoginTime}</Text>
  //   </Box>
  //   <Panel.Footer color='#ee0067'>
  //     {something.suspended == false ? <a href={`/edituser?id=${something.id}`} target="_blank"><Badge bg='#ee0067'>Active</Badge></a> : <Badge>Suspended</Badge>}
  //   </Panel.Footer>
  // </Panel></Box> );
  // });
  return ( <div>{JSON.stringify(props)}</div> );
};

const DisplayStatusData = ({href, router, status}) => (
  <div
  >
  {/* {router.pathname} */}
  {(status != undefined) ? <SomeList status={status}/> : "Status Empty"}
  </div>
);

export default withRouter(DisplayStatusData);
