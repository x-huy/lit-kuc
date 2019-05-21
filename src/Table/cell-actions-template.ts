import { html } from '../common';

const cellActionsTemplate = ({
  data,
  rowIndex,
  addRow,
  removeRow,
  dispatch
}) => {
  return html`
    <div class="kuc-table-td action-group">
      <button
        @click=${() =>
          dispatch({
            type: 'ADD_ROW',
            data: addRow({ data, rowIndex }),
            rowIndex: rowIndex + 1
          })}
      >
        Add
      </button>
      <button
        @click=${() =>
          dispatch({
            type: 'REMOVE_ROW',
            data: removeRow({ data, rowIndex }),
            rowIndex: rowIndex
          })}
      >
        Remove
      </button>
    </div>
  `;
};

export { cellActionsTemplate as default };
