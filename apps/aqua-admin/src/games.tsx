import * as React from "react";
import {
  Datagrid,
  Edit,
  FieldTitle,
  Labeled,
  List,
  ReferenceField,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
  useRecordContext,
} from "react-admin";

const GameTitle = () => {
  const record = useRecordContext();
  return <span>Game {record ? `${record.id}` : ""}</span>;
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
    <Datagrid rowClick="show">
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

export const GameShow = () => (
  <Edit title={<GameTitle />}>
    <SimpleForm>
      <Labeled>
        <TextField source="id" label="Id" />
      </Labeled>
      <Labeled>
        <TextField source="status" />
      </Labeled>
      <Labeled>
        <ReferenceField source="colorId" reference="users" label="Color player">
          <TextField source="username"></TextField>
        </ReferenceField>
      </Labeled>

      <Labeled>
        <TextField source="score.color" label="Color score" />
      </Labeled>
      <Labeled>
        <ReferenceField
          source="symbolId"
          reference="users"
          label="Symbol player"
        >
          <TextField source="username"></TextField>
        </ReferenceField>
      </Labeled>
      <Labeled>
        <TextField source="score.symbol" label="Symbol score" />
      </Labeled>
    </SimpleForm>
  </Edit>
);
