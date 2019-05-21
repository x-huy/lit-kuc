import { html } from '../common';

const headerRowTemplate = ({ columns }) => {
  return html`
    <div class="kuc-table-thead">
      <div class="kuc-table-tr">
        ${columns.map(({ header = '', actions }) =>
          !actions
            ? html`
                <div class="kuc-table-th">
                  <span class="kuc-header-label">${header}</span>
                </div>
              `
            : ''
        )}
      </div>
    </div>
  `;
};

export { headerRowTemplate as default };
