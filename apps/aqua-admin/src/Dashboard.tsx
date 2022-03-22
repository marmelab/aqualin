import { Card, CardContent, CardHeader } from '@mui/material';
import * as React from "react";
import { DashboardComponent } from 'react-admin';


const Dashboard = () =>{
   return (<Card>
       <CardHeader title="Welcome to the administration" />
       <CardContent>This the administration panel for the Aqualin game.</CardContent>
   </Card>);
}
export default Dashboard;
