import React, { JSX, useEffect, useRef } from 'react';

import { useVirtualizer } from '@tanstack/react-virtual';

import { getPicsListInfiniteQuery } from '../queries/query';
import { ListItem } from '../types/infinite-scroll.types';
import RowItem from './row-item';

const VirtualScroll = (): JSX.Element => {
    const {
        status,
        data,
        isSuccess,
        error,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = getPicsListInfiniteQuery(5);

    const allRows = isSuccess ? data?.pages.flatMap(rows => rows as ListItem) : []

    const parentRef = useRef(null);

    const rowVirtualizer = useVirtualizer({
        count: hasNextPage ? allRows.length + 1 : allRows.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 100,
        overscan: 3,
    })

    useEffect(() => {
        const items = [...rowVirtualizer.getVirtualItems()]
        const lastItem = items[items.length - 1];

        if (!lastItem) {
            return
        }

        if (
            lastItem.index >= allRows.length - 1 &&
            hasNextPage &&
            !isFetchingNextPage
        ) {
            fetchNextPage()
        }
    }, [
        rowVirtualizer.getVirtualItems(),
    ])

    if (status === 'loading') {
        return (<p>Loading...</p>)
    }

    if (status === 'error') {
        return <span>Error: {(error as Error).message}</span>
    }

    return (
        <>
            <div
                ref={parentRef}
                className="table"
            >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                    const isLoaderRow = virtualRow.index > allRows.length - 1
                    const item = allRows[virtualRow.index]

                    return (
                        <div
                            key={item?.id ?? virtualRow.index}
                            className="row"
                            style={{
                                gridTemplateColumns: `repeat(${item ? Object.keys(item).length : null}, 150px)`,
                                height: `${virtualRow.size}px`,
                                transform: `translateY(${virtualRow.start}px)`,
                            }}
                        >
                            {isLoaderRow
                                ? hasNextPage
                                    ? 'Loading more...'
                                    : 'Nothing more to load'
                                : <RowItem key={item.id} rowData={item}></RowItem>}
                        </div>
                    )
                })}
            </div>
            <div>
                {isFetching && !isFetchingNextPage ? 'Background Updating...' : null}
            </div>
        </>
    )
}

export default VirtualScroll;