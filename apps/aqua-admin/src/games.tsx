import * as React from "react";
import {
  Datagrid,
  Edit,
  EditProps,
  FieldTitle,
  Labeled,
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
      <TextField source="id" />
      <TextField source="status" />
      <TextField source="color.username" label="Color player" />
      <TextField source="score.color" label="Color score" />
      <TextField source="symbol.username" label="Symbol player" />
      <TextField source="score.symbol" label="Symbol score" />
    </Datagrid>
  </List>
);

export const GameEdit = () => (
  <Edit title={<GameTitle />}>
    <SimpleForm>
      <TextField source="id" />
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
