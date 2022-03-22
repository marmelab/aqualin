import GameIcon from "@mui/icons-material/Book";
import crudProvider from "ra-data-nestjsx-crud";
import * as React from "react";
import { Admin, fetchUtils, Resource } from "react-admin";
import { authProvider } from "./auth/authProvider";
import Dashboard from "./Dashboard";
import { GameEdit, GameList } from "./games";

const AQUALIN_URL = process.env.REACT_APP_AQUALIN_URL;

const httpClient = (url: string, options: fetchUtils.Options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  options.credentials = "include";
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = crudProvider(AQUALIN_URL + "api/admin", httpClient);

const App = () => (
  <Admin
    dashboard={Dashboard}
    dataProvider={dataProvider}
    authProvider={authProvider}
  >
    <Resource name="games" list={GameList} edit={GameEdit} icon={GameIcon} />
  </Admin>
);
export default App;
