import { gql } from 'apollo-angular';

const AUTHENTICATE = gql`
  query {
    viewer {
      login
    }
  }
`;

const GET_PAGINATED_REPOSITORIES = gql`
  query ($query: String!, $after: String) {
    search(query: $query, type: REPOSITORY, first: 10, after: $after) {
      nodes {
        ... on Repository {
          id
          name
          stargazerCount
          owner {
            login
          }
          primaryLanguage {
            name
          }
          issues(states: [OPEN]) {
            totalCount
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const GET_REPO_ISSUES = gql`
  query ($owner: String!, $name: String!, $after: String) {
    repository(owner: $owner, name: $name) {
      id
      name
      stargazerCount
      owner {
        login
      }
      primaryLanguage {
        name
      }
      issues(
        first: 10
        after: $after
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        totalCount
        nodes {
          id
          title
          url
          state
          createdAt
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
      nameWithOwner
      createdAt
      updatedAt
      description
      forkCount
      url
    }
  }
`;

export { AUTHENTICATE, GET_PAGINATED_REPOSITORIES, GET_REPO_ISSUES };
