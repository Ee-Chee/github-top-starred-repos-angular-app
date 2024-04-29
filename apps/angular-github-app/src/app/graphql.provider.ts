import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApplicationConfig, inject } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';

const uri = 'https://api.github.com/graphql';
export function apolloOptionsFactory(): ApolloClientOptions<unknown> {
  // This function is executed once, i.e. when creating this injection instance
  const httpLink = inject(HttpLink);

  // const http = httpLink.create({ uri });
  //
  // const authLink = new ApolloLink((operation, forward) => {
  //   // Use the setContext method to set the HTTP headers.
  //   // local storage here
  //   operation.setContext({
  //     headers: {
  //       'Authorization': `Bearer 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`
  //     }
  //   });
  //
  //   // Call the next link in the middleware chain.
  //   return forward(operation);
  // });
  //
  // return {
  //   link: authLink.concat(http),
  //   cache: new InMemoryCache()
  // };

  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache(),
  };
}

export const graphqlProvider: ApplicationConfig['providers'] = [
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory,
    deps: [], // local storage and httpLink can be injected here
  },
];
