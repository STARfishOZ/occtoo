import React from 'react';
import { Props } from '../types/infinite-scroll.types';

const RowItem = <T extends {id: number | string}>({ rowData }: Props<T>) => (
    <>
        {Object.keys(rowData).flatMap(key => (
            <span key={key.toString()}>
                {key}: {typeof rowData[key] === 'object' ? 'complex object, map me :D' : rowData[key]}
            </span>
        ))}
    </>
)

export default RowItem;