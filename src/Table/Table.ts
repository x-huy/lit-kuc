import { Component, BaseProps, Prop, html, classMap, State } from '../common';
import headerRowTemplate from './header-row-template';
import bodyTemplate from './body-template';
import {
  ColumnType,
  CellInterface,
  CellRendererInterface,
  UpdateRowDataInterface
} from './definition';

import './Table.css';

export type TableProps = BaseProps & {
  data: any[];
  columns: ColumnType[];
  hasActions?: boolean;
};

export default class Table extends Component<TableProps> {
  private _rowIdBuilder: RowIdBuilderInterface;
  private _cellRefs: { [index: string]: CellRendererInterface };
  private _cellsRenderer: CellInterface[];

  @State _data: any[];

  @Prop defaultRowData: object;
  @Prop columns: ColumnType[];
  @Prop keyField: string;
  @Prop hasActions: boolean;

  static defaultProps = {
    hasActions: true
  };

  constructor(props: TableProps) {
    super(props);

    this._rowIdBuilder = rowIdBuilder(idGenerator());
    this._data = this._rowIdBuilder.buildForList(props.data);
    this._cellRefs = {};
    this._cellsRenderer = props.columns.map(({ cell }) => cell);
    this._handleOnChange = this._handleOnChange.bind(this);
    this._updateRowData = this._updateRowData.bind(this);
  }

  _render() {
    const { _data, columns, keyField, hasActions } = this;

    return html`
      <div class="kuc-table">
        ${headerRowTemplate({ columns })}
        ${bodyTemplate({
          columns,
          data: _data,
          onChange: this._handleOnChange,
          hasActions,
          keyField
        })}
      </div>
    `;
  }

  _internalRender() {
    super._internalRender();
    this._renderCells();
  }

  _renderCells() {
    const tableData = this._data;
    const rowsEl = Array.prototype.slice.call(
      this.el.querySelectorAll('.kuc-table-tbody .kuc-table-tr')
    );

    const isRenderer = (renderer: any) => typeof renderer === 'function';

    rowsEl.forEach((rowEl, rowIndex) => {
      const rowData = tableData[rowIndex];
      const rowId = rowData.__tableRowId;
      const updateRowData = this._updateRowData.bind(this, rowId);
      const cellsEl = rowEl.querySelectorAll('.kuc-table-td');

      this._cellsRenderer.forEach((renderer, index) => {
        const cellEl = cellsEl[index];
        if (!isRenderer(renderer)) {
          return;
        }

        this._renderCell({
          cellEl,
          renderer,
          rowData,
          updateRowData,
          rowIndex
        });
      });
    });
  }

  _renderCell({
    cellEl,
    renderer,
    rowData,
    updateRowData,
    rowIndex
  }: {
    cellEl: HTMLTableCellElement;
    renderer: CellInterface;
    rowData: object;
    updateRowData: UpdateRowDataInterface;
    rowIndex: number;
  }) {
    const table = this;
    const cellRefs = this._cellRefs;
    let cellInstance;

    if (!cellRefs[cellEl.dataset.ref]) {
      cellInstance = renderer();
      const element = cellInstance.init({
        table,
        rowData,
        rowIndex,
        updateRowData
      });
      cellEl.appendChild(element);

      cellEl.dataset.ref = Math.random().toString();
      cellRefs[cellEl.dataset.ref] = cellInstance;
    }

    cellInstance = cellRefs[cellEl.dataset.ref];

    cellInstance.update({ table, rowData, rowIndex });
  }

  _handleOnChange({
    type,
    data,
    rowIndex
  }: {
    type: 'ADD_ROW' | 'REMOVE_ROW';
    data: any;
    rowIndex: number;
  }) {
    if (type === 'ADD_ROW') {
      data[rowIndex] = this._rowIdBuilder.buildForObject(
        { ...this.defaultRowData } || {}
      );
    }

    this._data = data;
    this.trigger('change', { data, type, rowIndex });
  }

  _updateRowData(rowId: number, rowDataToMerge: object) {
    let rowIndex = 0;
    const tableData = this._data.map((row, index) => {
      if (row.__tableRowId === rowId) {
        rowIndex = index;
        return {
          ...row,
          ...rowDataToMerge
        };
      }

      return row;
    });

    this._data = tableData;
    this.trigger('change', { data: tableData, rowIndex });
  }
}

interface IdGeneratorInterface {
  newId: number;
}
const idGenerator = (): IdGeneratorInterface => {
  let id = 0;

  return {
    get newId() {
      return ++id;
    }
  };
};

interface RowIdBuilderInterface {
  buildForObject: (
    obj: object
  ) => {
    [index: string]: any;
    __tableRowId: number;
  };
  buildForList(list: object): object[];
}

const rowIdBuilder = (
  idGenerator: IdGeneratorInterface
): RowIdBuilderInterface => {
  return {
    buildForObject(obj: object) {
      return {
        ...obj,
        __tableRowId: idGenerator.newId
      };
    },
    buildForList(list: object[]) {
      return list.map(item => this.buildForObject(item));
    }
  };
};
