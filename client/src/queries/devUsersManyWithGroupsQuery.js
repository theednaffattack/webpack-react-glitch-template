import gql from 'graphql-tag'

export default gql`
  query devGetUsersWithGroups($maxResults: Int, $orderBy: String, $domain: String) {
    devGetUsersWithGroups(maxResults: $maxResults, orderBy: $orderBy, domain: $domain) {
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