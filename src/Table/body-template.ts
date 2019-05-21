import { repeat } from 'lit-html/directives/repeat';
import { html } from '../common';
import cellActionsTemplate from './cell-actions-template';
import cellTemplate from './cell-template';

const bodyTemplate = ({
  columns,
  data,
  onChange,
  keyField = '__tableRowId'
}) => {
  return html`
    <div class="kuc-table-tbody">
      ${repeat(
        data,
        rowData => rowData[keyField],
        (rowData, rowIndex) => {
          return html`
            <div class="kuc-table-tr">
              ${columns.map((column, columnIndex) => {
                const { cell, accessor, actions } = column;

                if (actions === true) {
                  return cellActionsTemplate({
                    data,
                    rowIndex,
                    addRow,
                    removeRow,
                    dispatch: newState => {
                      onChange && onChange(newState);
                    }
                  });
                }

                return cellTemplate({
                  rowData,
                  rowIndex,
                  accessor,
                  cell
                });
              })}
            </div>
          `;
        }
      )}
    </div>
  `;
};

const addRow = ({ data, rowIndex }) => {
  const insertAt = rowIndex + 1;
  const newData = [...data.slice(0, insertAt), {}, ...data.slice(insertAt)];
  return newData;
};

const removeRow = ({ data, rowIndex }) => {
  return data.filter((item, index) => index !== rowIndex);
};

export { bodyTemplate as default };
