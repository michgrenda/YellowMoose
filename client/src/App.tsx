import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
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

const App: React.FC = () => {
  return (
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
  );
};

export default App;
