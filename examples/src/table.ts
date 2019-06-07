/* global $ */
import { createSection } from './section';
import { Table } from '../../src';
import { CellInterface } from '../../src/Table/definition';
declare var $: any;

export default (container: HTMLElement) => {
  const tableSection = createSection('Table').appendTo(container);
  const table = new Table({
    defaultRowData: {
      color: { r: 255, g: 255, b: 255 },
      startDate: new Date()
    },
    data: [
      {
        color: { r: 200, g: 230, b: 201 },
        startDate: new Date(2018, 11, 10)
      }
    ],
    columns: [
      {
        header: 'ID',
        accessor: r => (r as any).__tableRowId
      },
      {
        header: 'Color (RGB)',
        cell: () => rgbCell({ fieldName: 'color' })
      },
      {
        header: 'Start Date',
        cell: () => jqDateCell({ fieldName: 'startDate' })
      },
      {
        header: 'End Date',
        cell: () => jqDateCell({ fieldName: 'endDate', bgColor: '#B2DFDB' })
      },
      {
        header: 'Output',
        cell: () => outputCell()
      }
    ]
  });

  tableSection.appendChild(table.render());
};

const rgbCell: CellInterface = props => ({
  init({ updateRowData }) {
    const $el = $(`
    <div style="white-space: nowrap">
      <div>R<input type="range" name="r" min="0" max="255" style="width: 70px"/></div>
      <div>G<input type="range" name="g" min="0" max="255" style="width: 70px"/></div>
      <div>B<input type="range" name="b" min="0" max="255" style="width: 70px"/></div>
    </div>
    `);

    $el
      .find('input')
      .each(
        (index: number, inputEl: HTMLInputElement) =>
          (this[inputEl.name] = $(inputEl))
      );

    $el.on('change', 'input', () => {
      updateRowData({
        [props.fieldName]: {
          r: this.r.val(),
          g: this.g.val(),
          b: this.b.val()
        }
      });
    });

    return $el.get(0);
  },

  update({ rowData }) {
    const color = rowData[props.fieldName] || {};
    this.r.val(color.r);
    this.g.val(color.g);
    this.b.val(color.b);
  }
});

const jqDateCell: CellInterface = props => ({
  init({ updateRowData }) {
    const $datepicker = $('<input type="text" />').datepicker();
    const { fieldName, bgColor = '#FFF9C4' } = props;

    $datepicker.css({ width: '70px', backgroundColor: bgColor });

    $datepicker.on('change', () =>
      updateRowData({
        [fieldName]: $datepicker.datepicker('getDate')
      })
    );

    this.$datepicker = $datepicker;

    return $datepicker.get(0);
  },

  update({ rowData }) {
    this.$datepicker.datepicker('setDate', rowData[props.fieldName] || '');
  }
});

const outputCell: CellInterface = () => ({
  init({ rowData, rowIndex, updateRowData }) {
    const $el = $(`
    <div style="white-space: nowrap; font-size: 12px; padding: 5px">
      <div>Start: <span class="js_start"></span></div>
      <div>End: <span class="js_end"></span></div>
      <div>Color: <span class="js_color"></span></div>
    </div>
    `);

    this._$start = $el.find('.js_start');
    this._$end = $el.find('.js_end');
    this._$color = $el.find('.js_color');
    this._$el = $el;

    return $el.get(0);
  },
  update({ rowData: { startDate, endDate, color = {} } }) {
    this._$start.text(
      $.datepicker.formatDate('mm/dd/yy', startDate) || '(empty)'
    );
    this._$end.text($.datepicker.formatDate('mm/dd/yy', endDate) || '(empty)');

    const colorArr = [color.r, color.g, color.b];
    const rgbStr = 'rgb(' + colorArr.join() + ')';
    this._$color.text(rgbStr);

    this._$el.css({ backgroundColor: rgbStr });
  }
});
