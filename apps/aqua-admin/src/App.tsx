import GameIcon from '@mui/icons-material/Book';
import crudProvider from 'ra-data-nestjsx-crud';
import * as React from "react";
import { Admin, Resource } from 'react-admin';
import Dashboard from './Dashboard';
import { GameEdit, GameList } from "./games";


const dataProvider = crudProvider('http://localhost:3000/api/admin');

const App = () => (
       <Admin dashboard={Dashboard} dataProvider={dataProvider}>
           <Resource name="games" list={GameList} edit={GameEdit}  icon={GameIcon}/>
           
       </Admin>)
export default App;
