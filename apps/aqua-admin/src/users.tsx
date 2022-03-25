import * as React from "react";
import {
  BooleanField,
  BooleanInput,
  Datagrid,
  Edit,
  Labeled,
  List,
  SimpleForm,
  TextField,
  TextInput,
  useRecordContext,
} from "react-admin";
import ResetPasswordButton from "./ResetPasswordButton";

const UserTile = () => {
  const record = useRecordContext();
  return <span>User {record ? `"${record.username}"` : ""}</span>;
};

const UsersFilter = [
  <TextInput source="username" label="Search" alwaysOn />,
  <BooleanInput source="admin"></BooleanInput>,
];

export const UserList = () => (
  <List filters={UsersFilter}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="username" />
      <BooleanField source="admin" />
      <BooleanField source="banned" />
      <TextField source="ipAddress" />
    </Datagrid>
  </List>
);

export const UserEdit = () => (
  <Edit title={<UserTile />}>
    <SimpleForm>
      <Labeled label="User Id">
        <TextField source="id" />
      </Labeled>
      <TextInput source="username" />
      <TextField source="email" />
      <ResetPasswordButton source="email" />
      <BooleanInput source="admin" label="Administrator" />
      <BooleanInput source="banned" label="Banned" />
    </SimpleForm>
  </Edit>
);
