import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import { UsersFuzzy } from "../components/UsersFuzzy";
import usersManyWithGroupsQuery from "../queries/usersManyWithGroupsQuery";

const AllUsers = ({ domain, orderBy, maxResults }) => (
  <Query query={usersManyWithGroupsQuery} variables={{ domain, maxResults, orderBy } }>
    {({ loading, error, data }) => {
      if (loading) return 'LOADING'
      if (error)
        return `
      👻  🌟   ERROR  🌟  👻 :
      ${JSON.stringify(error, null, 2)}
      `
      return (
        <UsersFuzzy data={data.usersWithGroups} />
        )
      }}
    </Query>
  );

export { AllUsers };