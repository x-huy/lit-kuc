import { html } from '../common';

const cellTemplate = ({
  rowData,
  rowIndex,
  accessor,
  cell = cellProps => ''
}) => {
  const cellProps = { rowData, rowIndex };

  const contentOrRenderer = accessor
    ? getValueByAccessor(accessor, rowData)
    : cell(cellProps);
  let content;

  if (!(contentOrRenderer && typeof contentOrRenderer.init === 'function')) {
    content = contentOrRenderer;
  }

  return html`
    <div class="kuc-table-td">${content}</div>
  `;
};

const getValueByAccessor = (accessor, data) => {
  switch (typeof accessor) {
    case 'string':
      return data[accessor];
    case 'function':
      return accessor(data);
    default:
      return '';
  }
};

export { cellTemplate as default };
