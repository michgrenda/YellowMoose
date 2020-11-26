import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
// Components
import Navbar from "./components/layouts/Navbar";
import Searchbar from "./components/layouts/Searchbar";
// Pages
import ListingPage from "./pages/ListingPage";

// Interfaces
export interface Routes {
  path: string;
  exact: boolean;
  component?: React.ComponentType;
}

// TEMPORARY
const routes: Routes[] = [
  {
    path: "/",
    exact: false,
    component: ListingPage,
  },
];

const client = new ApolloClient({
  link: createUploadLink({
    uri: "/graphql",
  }),
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Navbar />
        <Searchbar />

        <main className="main">
          <Switch>
            {routes.map(
              ({ component: Component, ...rest }): JSX.Element => (
                <Route
                  key={rest.path}
                  {...rest}
                  render={() => (Component ? <Component /> : null)}
                />
              )
            )}
          </Switch>
        </main>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
