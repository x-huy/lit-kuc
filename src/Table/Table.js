import { Component, html, classMap } from '../common';
import headerRowTemplate from './header-row-template';
import bodyTemplate from './body-template';
import './Table.css';

export default class Table extends Component {
  constructor(props) {
    super(props);

    this._rowIdBuilder = rowIdBuilder(idGenerator());
    this.state.data = this._rowIdBuilder.buildForList(props.data);
    this._handleOnChange = this._handleOnChange.bind(this);
    this._updateRowData = this._updateRowData.bind(this);
    this._cellRefs = {};
    this._cellsRenderer = props.columns.map(({ cell }) => cell);
  }

  template() {
    const { data, columns, keyField } = this.state;

    return html`
      <div class="kuc-table">
        ${headerRowTemplate({ columns })}
        ${bodyTemplate({
          columns,
          data,
          onChange: this._handleOnChange,
          keyField
        })}
      </div>
    `;
  }

  render() {
    const el = super.render();
    this._renderCells();

    return el;
  }

  _renderCells() {
    const tableData = this.state.data;
    const rowsEl = [
      ...this.el.querySelectorAll('.kuc-table-tbody .kuc-table-tr')
    ];
    const isRenderer = renderer => typeof renderer === 'function';

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

  _renderCell({ cellEl, renderer, rowData, updateRowData, rowIndex }) {
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

      cellEl.dataset.ref = Math.random();
      cellRefs[cellEl.dataset.ref] = cellInstance;
    }

    cellInstance = cellRefs[cellEl.dataset.ref];

    cellInstance.update({ table, rowData, rowIndex });
  }

  _handleOnChange({ type, data, rowIndex }) {
    if (type === 'ADD_ROW') {
      data[rowIndex] = this._rowIdBuilder.buildForObject(
        { ...this.state.defaultRowData } || {}
      );
    }

    this.setState({ data });
    this.trigger('change', { data, type, rowIndex });
  }

  _updateRowData(rowId, rowDataToMerge) {
    let rowIndex = 0;
    const tableData = this.state.data.map((row, index) => {
      if (row.__tableRowId === rowId) {
        rowIndex = index;
        return {
          ...row,
          ...rowDataToMerge
        };
      }

      return row;
    });

    this.setState({ data: tableData });
    this.trigger('change', { data: tableData, rowIndex });
  }
}

const idGenerator = () => {
  let id = 0;

  return {
    get newId() {
      return ++id;
    }
  };
};

const rowIdBuilder = idGenerator => {
  return {
    buildForObject(obj) {
      return {
        ...obj,
        __tableRowId: idGenerator.newId
      };
    },
    buildForList(list) {
      return list.map(item => this.buildForObject(item));
    }
  };
};
