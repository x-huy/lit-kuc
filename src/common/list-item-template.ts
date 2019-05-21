import { html } from 'lit-html';

export const listItemTemplate = props => {
  const _onClick = () => {
    if (props.isDisabled) {
      return false;
    }
    props.onClick(props.item);
    return true;
  };

  const _onChange = () => {
    if (props.isDisabled) {
      return false;
    }
    props.onChange(props.item);
    return true;
  };

  const generateGUID = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

  if (props.isVisible === false) {
    return null;
  }

  if (props.type === 'checkbox' || props.type === 'radio') {
    const id =
      new Date().getTime() +
      '-' +
      generateGUID() +
      '-' +
      generateGUID() +
      generateGUID();
    return html`
      <span className=${props.className}>
        <input
          name=${props.name}
          id=${id}
          disabled=${props.isDisabled}
          type=${props.type}
          checked=${props.selected}
          @change=${_onChange}
        />
        <label for=${id}>${props.item.label} </label>
      </span>
    `;
  }

  const className = [
    'kuc-list-item',
    props.selected ? 'kuc-list-item-selected' : '',
    props.isDisabled ? 'kuc-list-item-disable' : ''
  ];

  return html`
    <div
      @click=${_onClick}
      class=${className.join(' ').trim()}
      .disabled=${props.isDisabled}
    >
      <span class="kuc-icon-check"
        ><i class="fa fa-check" aria-hidden="true"></i
      ></span>
      <span class="kuc-list-item-label">${props.item.label}</span>
    </div>
  `;
};

export default listItemTemplate;
