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
  <SelectInput
    source="status"
    choices={[
      { id: "Waiting Second Player", name: "Waiting Second Player" },
      { id: "In Progress", name: "In Progress" },
      { id: "Over", name: "Over" },
    ]}
  />,
  <ReferenceInput source="id" label="game id" reference="games">
    <SelectInput optionText="id" />
  </ReferenceInput>,

  /*<ReferenceInput
    source="symbol"
    label="Symbol User"
    reference="games"//users
  >
    <SelectInput optionText="username" />
  </ReferenceInput>,*/
];

export const GameList = () => (
  <List filters={GameFilters}>
    <Datagrid rowClick="edit">
      <NumberField source="nbActions" />
      <TextField source="id" />
      <TextField source="status" />
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
