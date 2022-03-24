import GameIcon from "@mui/icons-material/Casino";
import PersonIcon from "@mui/icons-material/Person";
import BanIcon from "@mui/icons-material/Block";
import crudProvider from "ra-data-nestjsx-crud";
import * as React from "react";
import { Admin, fetchUtils, ListGuesser, Resource } from "react-admin";
import { authProvider } from "./auth/authProvider";
import { BannedIpCreate, BannedipList } from "./bannedIps";
import Dashboard from "./Dashboard";
import { GameEdit, GameList } from "./games";
import { UserEdit, UserList } from "./users";

const AQUALIN_URL = process.env.REACT_APP_AQUALIN_URL;

const httpClient = (url: RequestInfo, options: fetchUtils.Options = {}) => {
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
    <Resource
      name="bannedIps"
      list={BannedipList}
      create={BannedIpCreate}
      icon={BanIcon}
      options={{ label: "Banned Ips" }}
    />
  </Admin>
);
export default App;
