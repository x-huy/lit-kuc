import { Component, TemplateResult, html } from '../common';
import './Text.css';

export interface Props {
  value?: string | number;
  isVisible?: boolean;
  isDisabled?: boolean;
  onChange?: Function;
}

export default class Text extends Component {
  template({
    value = '',
    isVisible = true,
    isDisabled = false,
    onChange
  }: Props): TemplateResult {
    if (isVisible === false) {
      return null;
    }
    
    return html`
      <div class="kuc-input-outer">
        <input
          class="kuc-input-text"
          type="text"
          value=${value}
          
          ?disabled=${isDisabled}
        />
      </div>
    `;
  }
}
