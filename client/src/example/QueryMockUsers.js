import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import { UsersFuzzy } from "../components/UsersFuzzy";
import devUsersManyWithGroupsQuery from "../queries/devUsersManyWithGroupsQuery";

const AllMockUsers = ({ domain, orderBy, maxResults }) => (
  <Query query={devUsersManyWithGroupsQuery} variables={{ domain, maxResults, orderBy } }>
    {({ loading, error, data }) => {
      if (loading) return 'LOADING'
      if (error)
        return `
      👻  🌟   ERROR  🌟  👻 :
      ${JSON.stringify(error, null, 2)}
      `
      return (
        <UsersFuzzy data={data.devGetUsersWithGroups} />
        )
      }}
    </Query>
  );

export { AllMockUsers };