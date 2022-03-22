import * as React from 'react';
import { Create, Datagrid, Edit, EditButton, List, NumberField, ReferenceField, ReferenceInput, SelectInput, SimpleForm, TextField, TextInput, useRecordContext } from 'react-admin';


const GameTitle = () => {
    const record = useRecordContext();
    return <span>Game {record ? `"${record.title}"` : ''}</span>;
    };

    const GameFilters = [
        <TextInput source="q" label="Search" alwaysOn />,
        <ReferenceInput source="color.id" label="User" reference="games">
            <SelectInput optionText="color.username" />
        </ReferenceInput>,
    ];

    export const GameList = props => (
        
        <List {...props} >
            <Datagrid rowClick="edit">
                <NumberField source="nbActions" />
                <TextField source="id" />
                <TextField source="gameState" />
                <TextField source="color.username" />
                <TextField source="symbol.username" />
            </Datagrid>
        </List>
    );


export const GameEdit = props => (
    <Edit {...props} title={<GameTitle />}>
        <SimpleForm>
        <TextInput source="id" disabled/>
            <ReferenceInput source="id" reference="games"><SelectInput optionText="id" /></ReferenceInput>
            
        </SimpleForm>
    </Edit>
);

export const GameCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users"><SelectInput optionText="name" /></ReferenceInput>
            
            <TextInput source="title" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Create>
);
