import { onError } from '@apollo/client/link/error';
import { toast } from 'sonner';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
    toast.error(`[Network error]: ${networkError}`);
  }

  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
      toast.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
    });
});

export default errorLink;
