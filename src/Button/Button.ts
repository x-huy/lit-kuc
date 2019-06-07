import { Component, Prop, BaseProps, html, classMap, } from '../common';
import './Button.css';

export type ButtonType = 'normal' | 'submit';
export type ButtonProps = BaseProps & {
  text: string;
  type?: ButtonType;
};

export default class Button extends Component<ButtonProps> {
  @Prop type: ButtonType;
  @Prop text: string;

  static defaultProps: Partial<ButtonProps> = {
    type: 'normal'
  }

  _render() {
    const { type, text, visible, disabled } = this;
    if (!visible) {
      return null;
    }

    const classes = {
      'kuc-btn': true,
      submit: type === 'submit',
      normal: type === 'normal'
    };

    return html`
      <button class=${classMap(classes)} ?disabled=${disabled}>
        ${text}
      </button>
    `;
  }
}
