import gql from 'graphql-tag'

export default gql`
  query user($userKey: String) {
    user(userKey: $userKey) {
      primaryEmail
      fullName
      givenName
      familyName
      lastLoginTime
    }
  }
`