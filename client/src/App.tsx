import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
// Components
import { Navbar } from "./components/layouts/Navbar";
import Searchbar from "./components/layouts/Searchbar";
// Pages
import { ListingPage } from "./pages/ListingPage";
import FormPage from "./pages/FormPage";

// Interfaces
export interface Routes {
  path: string;
  exact: boolean;
  component?: any;
  componentProps?: { [index: string]: any };
}

// TEMPORARY
const routes: Routes[] = [
  {
    path: "/",
    exact: true,
    component: ListingPage,
  },
  {
    path: "/rent/form/rooms",
    exact: true,
    component: FormPage,
    componentProps: {
      transaction: "rent",
      propertyType: "room",
    },
  },
  {
    path: "/rent/form/flats",
    exact: true,
    component: FormPage,
    componentProps: {
      transaction: "rent",
      propertyType: "flat",
    },
  },
  {
    path: "/rent/form/houses",
    exact: true,
    component: FormPage,
    componentProps: {
      transaction: "rent",
      propertyType: "house",
    },
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
            {routes.map(({ component: Component, componentProps, ...rest }) => (
              <Route key={rest.path} {...rest}>
                {Component ? <Component {...componentProps} /> : null}
              </Route>
            ))}
          </Switch>
        </main>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
