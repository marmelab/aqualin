import { Card, CardContent, CardHeader } from "@mui/material";
import * as React from "react";

const Dashboard = () => {
  return (
    <Card>
      <CardHeader title="Welcome to the administration" />
      <CardContent>
        This is an administration panel for the Aqualin game.
      </CardContent>
    </Card>
  );
};
export default Dashboard;
