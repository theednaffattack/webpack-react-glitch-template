import gql from 'graphql-tag'

// original uploads query (lists all uploads) from jaydenseric of Apollo team
// export default gql`
//   query uploads {
//     uploads {
//       id
//       filename
//       encoding
//       mimetype
//       path
//     }
//   }
// `
export default gql`
  query users($maxResults: Int, $orderBy: String, $domain: String) {
    users(maxResults: $maxResults, orderBy: $orderBy, domain: $domain) {
      primaryEmail
      fullName
      lastLoginTime
    }
  }
`