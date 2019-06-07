import { html } from '../common';
import { CellInterface, AccessorInterface } from './definition';

const cellTemplate = ({
  rowData,
  rowIndex,
  accessor,
  cell
}: {
  rowData: object;
  rowIndex: number;
  accessor?: AccessorInterface;
  cell?: CellInterface;
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

const getValueByAccessor = (accessor: CellInterface, data: object) => {
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
