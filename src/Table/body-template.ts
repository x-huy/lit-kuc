import { repeat } from 'lit-html/directives/repeat';
import { html } from '../common';
import cellActionsTemplate from './cell-actions-template';
import cellTemplate from './cell-template';
import { ColumnType, ActionInterface } from './definition';

const bodyTemplate = ({
  columns,
  data,
  onChange,
  hasActions = true,
  keyField = '__tableRowId'
}: {
  columns: ColumnType[];
  data: object[];
  onChange: Function;
  hasActions: boolean;
  keyField: string;
}) => {
  return html`
    <div class="kuc-table-tbody">
      ${repeat(
        data,
        (rowData: { [index: string]: any }) => rowData[keyField],
        (rowData, rowIndex) => {
          return html`
            <div class="kuc-table-tr">
              ${columns.map((column, columnIndex) => {
                const { cell, accessor } = column;
                return cellTemplate({
                  rowData,
                  rowIndex,
                  accessor,
                  cell
                });
              })}
              ${hasActions
                ? cellActionsTemplate({
                    data,
                    rowIndex,
                    addRow,
                    removeRow,
                    dispatch: newState => {
                      onChange && onChange(newState);
                    }
                  })
                : ''}
            </div>
          `;
        }
      )}
    </div>
  `;
};

const addRow: ActionInterface = ({ data, rowIndex }) => {
  const insertAt = rowIndex + 1;
  const newData = [...data.slice(0, insertAt), {}, ...data.slice(insertAt)];
  return newData;
};

const removeRow: ActionInterface = ({ data, rowIndex }) => {
  return data.filter((item, index) => index !== rowIndex);
};

export { bodyTemplate as default };
