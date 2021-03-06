import gql from 'graphql-tag'

export default gql`
  query userWithGroups($userKey: String) {
    userWithGroups(userKey: $userKey) {
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