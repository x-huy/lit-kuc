import { Component, BaseProps, Prop, State, html, classMap } from '../common';
import { ListItem, handleSelect } from '../common/select-single';

import './Dropdown.css';

export type DropDownProps = BaseProps & {
  value?: string | number;
  items?: ListItem[];
};

export default class Dropdown extends Component<DropDownProps> {
  @Prop value: string | number;
  @Prop items: ListItem[];

  @State _menuVisible: boolean;

  _handleToggleMenu = () => {
    this._menuVisible = !this._menuVisible;
    this._menuVisible
      ? document.addEventListener('click', this._handleClickOutside)
      : document.removeEventListener('click', this._handleClickOutside);
  };

  _handleClickOutside = (evt: MouseEvent) => {
    let target = evt.target as HTMLElement;

    if (!this.el.querySelector('.kuc-dropdown-outer').contains(target)) {
      this._menuVisible = false;
    }
  };

  _handleSelectItem = (value: string | number) => {
    this.value = value;
    this._menuVisible = false;
    this.trigger('change', { value });
  };

  _canShowMenu() {
    const { _menuVisible, disabled, items } = this;
    return (
      _menuVisible && !disabled && Array.isArray(items) && items.length > 0
    );
  }

  _getText(): string | number {
    const { items, value } = this;
    if (!Array.isArray(items)) {
      return '';
    }

    const item = items.filter(item => item.value === value)[0];
    return item ? item.value : '';
  }

  _render() {
    const { items, visible, disabled } = this;
    if (!visible) {
      return null;
    }

    // TODO: fix it!
    // if (AbstractSingleSelection._hasDuplicatedItems(this.state.items)) {
    //   throw new Error(Message.common.SELECTTION_DUPLICATE_VALUE);
    // }

    // if (!AbstractSingleSelection._hasValidValue(this.state.items, this.state.value)) {
    //   throw new Error(Message.common.INVALID_ARGUMENT);
    // }

    const text = this._getText();

    const classes = {
      'kuc-dropdown': true,
      'kuc-dropdown-disable': disabled
    };

    return html`
      <div class="kuc-dropdown-container">
        <div class="kuc-dropdown-sub-container">
          <div class="kuc-dropdown-outer" @click=${this._handleToggleMenu}>
            <div class=${classMap(classes)}>
              <div class="kuc-dropdown-selected">
                <span class="kuc-dropdown-selected-name">
                  <span>${text}</span>
                  <span class="icon-arrow-down"
                    ><i class="fa fa-angle-down" aria-hidden="true"></i
                  ></span>
                </span>
              </div>
            </div>
          </div>
          ${this._canShowMenu()
            ? html`
                <div class="kuc-list-outer">
                  ${items && this._renderItems()}
                </div>
              `
            : ''}
        </div>
      </div>
    `;
  }

  private _renderItems() {
    const { items, value } = this;
    return items.map((item: ListItem) => {
      return selectItemTemplate({
        selected: value === item.value,
        item,
        onClick: this._handleSelectItem
      });
    });
  }
}

const selectItemTemplate = ({
  selected = false,
  item,
  onClick
}: {
  selected: boolean;
  item: ListItem;
  onClick?: Function;
}) => {
  const { disabled, label } = item;
  const classes = {
    'kuc-list-item': true,
    'kuc-list-item-selected': selected,
    'kuc-list-item-disable': disabled
  };

  return html`
    <div
      @click=${(evt: MouseEvent) => handleSelect(evt, { item, onClick })}
      class=${classMap(classes)}
      .disabled=${disabled}
    >
      <span class="kuc-icon-check"
        ><i class="fa fa-check" aria-hidden="true"></i
      ></span>
      <span class="kuc-list-item-label">${label}</span>
    </div>
  `;
};