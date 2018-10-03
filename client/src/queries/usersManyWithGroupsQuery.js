import gql from 'graphql-tag'

export default gql`
  query usersWithGroups($maxResults: Int, $orderBy: String, $domain: String) {
    usersWithGroups(maxResults: $maxResults, orderBy: $orderBy, domain: $domain) {
      id
      fullName
      primaryEmail
      givenName
      familyName
      lastLoginTime
      groups {
        name
        email
        id
      }
    }
  }
`