import React from "react";
import {
  List,
  Datagrid,
  TextField,
  Create,
  SimpleForm,
  TextInput,
} from "react-admin";

export const BannedIpList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="ipAddress" />
    </Datagrid>
  </List>
);

export const BannedIpCreate = () => {
  return (
    <Create title="Ban an IP or Range">
      <SimpleForm>
        <TextInput source="ipAddress" />
        Simply enter an IP to ban it. Or use CIDR to ban ips.
      </SimpleForm>
    </Create>
  );
};
