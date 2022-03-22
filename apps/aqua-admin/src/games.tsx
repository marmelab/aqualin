import * as React from 'react';
import { Create, Datagrid, Edit, EditButton, EditProps, List, ListProps, NumberField, ReferenceField, ReferenceInput, SelectInput, SimpleForm, TextField, TextInput, useRecordContext } from 'react-admin';


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

    export const GameList :React.FC<ListProps> = props => (
        
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


export const GameEdit:React.FC<EditProps> = props => (
    <Edit {...props} title={<GameTitle />}>
        <SimpleForm>
        <TextInput source="id" disabled/>
            <ReferenceInput source="id" reference="games"><SelectInput optionText="id" /></ReferenceInput>
            
        </SimpleForm>
    </Edit>
);


