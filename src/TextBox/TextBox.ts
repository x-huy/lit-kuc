import { Component, Prop, BaseProps, html } from '../common';
import './TextBox.css';

export type TextBoxProps = BaseProps & {
  value?: string | number;
};

export default class TextBox extends Component<TextBoxProps> {
  @Prop value: string;

  _render() {
    const { value = '', visible, disabled } = this;
    if (!visible) {
      return null;
    }

    return html`
      <div class="kuc-input-outer">
        <input
          class="kuc-input-text"
          type="text"
          value=${value}
          ?disabled=${disabled}
        />
      </div>
    `;
  }
}
