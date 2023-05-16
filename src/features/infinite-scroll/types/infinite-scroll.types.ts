export interface Entity {
    id: number | string;
}

export interface ListItem extends Entity {
    [key: string]: string | number | boolean
}

export interface Props<ObjectType> {
    rowData: ListItem;
}