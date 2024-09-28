import { gql } from 'graphql-tag';

const raiz = gql`
  type Query {
    """
    Es la raíz de las queries a las cuales se va extender en toda la aplicación
    """
    raiz: String
  }
  type Mutation {
    raiz: String
  }
`;

export default raiz;
