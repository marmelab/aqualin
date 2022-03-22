import * as React from "react";
import {
  Datagrid,
  Edit,
  EditProps,
  List,
  ListProps,
  NumberField,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
  useRecordContext,
} from "react-admin";

const GameTitle = () => {
  const record = useRecordContext();
  return <span>Game {record ? `"${record.title}"` : ""}</span>;
};

const GameFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  <ReferenceInput source="color.id" label="User" reference="games">
    <SelectInput optionText="color.username" />
  </ReferenceInput>,
];

export const GameList = () => (
  <List>
    <Datagrid rowClick="edit">
      <NumberField source="nbActions" />
      <TextField source="id" />
      <TextField source="color.username" />
      <TextField source="symbol.username" />
    </Datagrid>
  </List>
);

export const GameEdit = () => (
  <Edit title={<GameTitle />}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <ReferenceInput source="id" reference="games">
        <SelectInput optionText="id" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
