import GameIcon from "@mui/icons-material/Casino";
import PersonIcon from "@mui/icons-material/Person";
import crudProvider from "ra-data-nestjsx-crud";
import * as React from "react";
import { Admin, fetchUtils, Resource } from "react-admin";
import { authProvider } from "./auth/authProvider";
import Dashboard from "./Dashboard";
import { GameEdit, GameList } from "./games";
import { UserEdit, UserList } from "./users";

const AQUALIN_URL = process.env.REACT_APP_AQUALIN_URL;

const httpClient = (url: any, options: fetchUtils.Options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  options.credentials = "include";
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = crudProvider(AQUALIN_URL + "admin/api", httpClient);

const App = () => (
  <Admin
    dashboard={Dashboard}
    dataProvider={dataProvider}
    authProvider={authProvider}
  >
    <Resource name="games" list={GameList} edit={GameEdit} icon={GameIcon} />
    <Resource name="users" list={UserList} edit={UserEdit} icon={PersonIcon} />
  </Admin>
);
export default App;
