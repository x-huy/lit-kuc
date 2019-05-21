import { styleMap } from 'lit-html/directives/style-map';
import { Component, html, classMap } from '../common';
import itemTemplate from '../common/list-item-template';
// import Message from '../constant/Message';
import { handleItemClick } from '../common/selection-single';

import './Dropdown.css';

interface Item {
  value: string | number;
  label: string;
  isDisabled?: boolean;
}

interface Props {
  value?: string | number;
  items: Item[];
  isVisible?: boolean;
  isDisabled?: boolean;
  isVisibleItems?: boolean;
}

export default class Dropdown extends Component {
  _showItems = () => {
    this.setState({
      isVisibleItems: true
    });

    document.addEventListener('click', this._hideItems);
  };

  _hideItems = evt => {
    if (this.el.contains(evt.target)) {
      return;
    }

    this.setState({ isVisibleItems: false });
    document.removeEventListener('click', this._hideItems);

    // TODO: fix to toggle the dropdown list
  };

  _onChange = value => {
    this.setState({ value, isVisibleItems: false });
    this.trigger('change', { value });
  };

  _getItemsStyle({ isVisibleItems, isDisabled }) {
    const display =
      isVisibleItems && !isDisabled
        ? { display: 'block' }
        : { display: 'none' };
    return display;
  }

  template({ value, items, isVisible, isDisabled, isVisibleItems }: Props) {
    if (isVisible === false) {
      return null;
    }

    // TODO: fix it!
    // if (AbstractSingleSelection._hasDuplicatedItems(this.state.items)) {
    //   throw new Error(Message.common.SELECTTION_DUPLICATE_VALUE);
    // }

    // if (!AbstractSingleSelection._hasValidValue(this.state.items, this.state.value)) {
    //   throw new Error(Message.common.INVALID_ARGUMENT);
    // }

    const renderItems = items => {
      return items.map((item, i) => {
        return itemTemplate({
          selected: value === item.value,
          onClick: item_prop => handleItemClick(item_prop, this._onChange),
          item,
          isDisabled: item.isDisabled
        });
      });
    };

    let index = -1;
    items &&
      items.forEach((item, i) => {
        if (item.value === value) {
          index = i;
        }
      });

    const className = [
      'kuc-dropdown',
      isDisabled ? 'kuc-dropdown-disable' : ''
    ];

    return html`
      <div class="kuc-dropdown-container">
        <div class="kuc-dropdown-sub-container">
          <div class="kuc-dropdown-outer" @click=${this._showItems}>
            <div class=${className.join(' ').trim()}>
              <div class="kuc-dropdown-selected">
                <span class="kuc-dropdown-selected-name">
                  <span>${index !== -1 && items[index].label}</span>
                  <span class="icon-arrow-down"
                    ><i class="fa fa-angle-down" aria-hidden="true"></i
                  ></span>
                </span>
              </div>
            </div>
          </div>
          <div
            style=${styleMap(
              this._getItemsStyle({ isVisibleItems, isDisabled })
            )}
            class="kuc-list-outer"
          >
            ${items && renderItems(items)}
          </div>
        </div>
      </div>
    `;
  }
}
