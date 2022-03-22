import GameIcon from "@mui/icons-material/Book";
import crudProvider from "ra-data-nestjsx-crud";
import * as React from "react";
import { Admin, Resource } from "react-admin";
import Dashboard from "./Dashboard";
import { GameEdit, GameList } from "./games";

const AQUALIN_URL = process.env.REACT_APP_AQUALIN_URL;
const dataProvider = crudProvider(AQUALIN_URL + "api/admin");

const App = () => (
  <Admin dashboard={Dashboard} dataProvider={dataProvider}>
    <Resource name="games" list={GameList} edit={GameEdit} icon={GameIcon} />
  </Admin>
);
export default App;
