import { gql } from 'apollo-angular';

const AUTHENTICATE = gql`
  query {
    viewer {
      login
    }
  }
`;

// const ADD_TODO = gql`
//   mutation addTodo($name: String!, $description: String!) {
//     addTodo(name: $name, description: $description) {
//       id
//       name
//       description
//     }
//   }
// `
//
// const DELETE_TODO = gql`
//   mutation deleteTodo($id: Int!) {
//     deleteTodo(id: $id) {
//       id
//     }
//   }
//   `

export { AUTHENTICATE };
