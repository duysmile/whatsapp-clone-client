import gql from 'graphql-tag';

export default gql`
  fragment Message on Message {
    id
    content
    createdAt
  }
`;
