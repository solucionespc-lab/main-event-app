import { InMemoryCache } from '@apollo/client';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';

if (import.meta.env.DEV) {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

const offline = new InMemoryCache({
  addTypename: false,
});

export default offline;
