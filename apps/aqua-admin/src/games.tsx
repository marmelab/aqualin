import * as React from "react";
import {
  Datagrid,
  Edit,
  FieldTitle,
  Labeled,
  List,
  ReferenceField,
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
  <TextInput source="color.username" label="Color User" resettable alwaysOn />,
  <TextInput
    source="symbol.username"
    label="Symbol User"
    resettable
    alwaysOn
  />,
  <SelectInput
    source="status"
    choices={[
      { id: "WaitingSecondPlayer", name: "WaitingSecondPlayer" },
      { id: "InProgress", name: "InProgress" },
      { id: "Over", name: "Over" },
    ]}
  />,
];

export const GameList = () => (
  <List filters={GameFilters}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="status" />
      <ReferenceField source="colorId" reference="users" label="Color player">
        <TextField source="username"></TextField>
      </ReferenceField>
      <TextField source="score.color" label="Color score" />
      <ReferenceField source="symbolId" reference="users" label="Symbol player">
        <TextField source="username"></TextField>
      </ReferenceField>
      <TextField source="score.symbol" label="Symbol score" />
    </Datagrid>
  </List>
);

export const GameEdit = () => (
  <Edit title={<GameTitle />}>
    <SimpleForm>
      <Labeled label="Game Id">
        <TextField source="id" label="Game Id" />
      </Labeled>
      <Labeled label="Status">
        <TextField source="status" label={<FieldTitle label="Status" />} />
      </Labeled>
      <Labeled label="Color player">
        <TextField source="color.username" label="Color player" />
      </Labeled>
      <Labeled label="Color score">
        <TextField source="score.color" label="Color score" />
      </Labeled>
      <Labeled label="Symbol username">
        <TextField source="symbol.username" label="Symbol player" />
      </Labeled>
      <Labeled label="Symbol score">
        <TextField source="score.symbol" label="Symbol score" />
      </Labeled>
    </SimpleForm>
  </Edit>
);
