import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import cls from 'classnames';

import styles from './custom-table.module.scss';


interface Props {
    columns: string[],
    rows: string[][]
}

export const CustomTable: React.FC<Props> = observer(({
    columns,
    rows,
}) => {

    const [formattedRows, setFormattedRows] = useState<string[][]>([]);
    const [coordinates, setCoordinates] = useState<{row: number, column: number}>({row: 0, column: 0});
    const [showSelected, setShowSelected] = useState(false);

    useEffect(() => {
        setFormattedRows([]);

        rows.forEach((row, idx) => {
            if (row.length !== columns.length) {
                console.error(`Row's "${row[0]}" array length does not match with columns length. Expected: ${columns.length}, got: ${row.length}`);

                let formattedRow: string[] = [];
                if (row.length < columns.length) {
                    // Добавляем недостающее
                    const remaining: string[] = new Array(columns.length - row.length).fill('-');
                    formattedRow = [...row, ...remaining];
                } else {
                    // Убираем лишнее
                    formattedRow = row.slice(0, columns.length);
                }

                setFormattedRows((newRows) => [...newRows, formattedRow]);
                return;
            }

            setFormattedRows((newRows) => [...newRows, row]);
        });
    }, [columns, rows]);

    const hoverHandler = (row: number, column: number) => {
        if (row === coordinates.row && column === coordinates.column && showSelected) {
            setShowSelected(false);
        } else {
            setShowSelected(true);
            setCoordinates({ row, column });
        }
    }

    return (
        <div 
            className={styles.table}
            style={{
                gridTemplateColumns: `repeat(${columns.length}, auto)`
            }}
        >
            {
                // Заголовок
                columns.map((column, columnIdx) => 
                <div 
                    key={column} 
                    className={cls(
                        styles.head, 
                        styles.cell, 
                        {
                            [styles.left]: columnIdx === 0, 
                            [styles.selected]: (columnIdx === coordinates.column || coordinates.row === 0) && showSelected
                        }
                    )}
                >
                    {column}
                </div>)
            }
            {
                // Строка
                formattedRows.map((rowValues, rowIdx) => {
                    return rowValues.map((value, columnIdx) => 
                        <div 
                            key={`${rowValues[0]}-${columns[columnIdx]}`} 
                            className={cls(
                                styles.cell, 
                                {
                                    [styles.left]: columnIdx === 0, 
                                    [styles.selected]: (columnIdx === coordinates.column || rowIdx + 1 === coordinates.row) && showSelected
                                }
                            )}
                            onClick={() => hoverHandler(rowIdx + 1, columnIdx)}
                        >
                            {value}
                        </div>
                    ) 
                }).flat(1)
            }
        </div>
    )
})


