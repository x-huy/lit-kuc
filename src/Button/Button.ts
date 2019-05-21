import {Component, TemplateResult, html, classMap } from '../common';
import './Button.css';

export interface Props {
  text: string;
  type: 'normal' | 'submit';
  isVisible?: boolean;
  isDisabled?: boolean;
}

export default class Button extends Component {
  template({
    text,
    type = 'normal',
    isVisible = true,
    isDisabled = false
  }: Props): TemplateResult {
    const classes = {
      'kuc-btn': true,
      submit: type === 'submit',
      normal: type === 'normal'
    };

    if (isVisible === false) {
      return null;
    }

    return html`
      <button class=${classMap(classes)} ?disabled=${isDisabled}>
        ${text}
      </button>
    `;
  }
}
