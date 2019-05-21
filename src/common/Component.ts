import { render, TemplateResult } from 'lit-html';

const lcfirst = (str: string) => {
  const firstChar = str.charAt(0).toLowerCase();
  return firstChar + str.substr(1);
};

export default class Component {
  _fragmentEl: DocumentFragment;
  _el: HTMLElement;
  _eventsToBind: Object;
  state: Object;

  constructor(props = {}) {
    this._fragmentEl = null;
    this._el = null;
    this._eventsToBind = {};
    this._bindEventsFromProps(props);
    this.state = props;
  }

  template(props = {}): TemplateResult {
    throw new Error('You have to implement the method "template".');
  }

  get fragmentEl() {
    if (!this._fragmentEl) {
      this._fragmentEl = document.createDocumentFragment();
    }

    return this._fragmentEl;
  }

  get el() {
    if (!this._el) {
      this._el = this.fragmentEl.querySelector(':first-child');
    }

    return this._el;
  }

  on(event: string, fn) {
    if (this.el) {
      this.el.addEventListener(event, fn);
      return;
    }

    this._eventsToBind[event] = this._eventsToBind[event] || [];
    this._eventsToBind[event].push(fn);
  }

  trigger(event, data) {
    if (!this.el) {
      return;
    }

    const customEvent = new CustomEvent(event, { detail: data });
    this.el.dispatchEvent(customEvent);
  }

  setState(state: Object) {
    this.state = { ...this.state, ...state };
    this.render();
  }

  render() {
    render(this.template(this.state), this.fragmentEl);

    const isRerendered = !this.el;
    if (!isRerendered) {
      this._bindEvents();
    }

    return this.fragmentEl;
  }

  renderTo(container) {
    if (container instanceof HTMLElement) {
      container.appendChild(this.render());
    } else if (typeof container === 'string') {
      document.querySelector(container).appendChild(this.render());
    }

    return this;
  }

  _bindEventsFromProps(props) {
    Object.keys(props)
      .filter(name => typeof props[name] === 'function')
      .forEach(name => {
        const matched = name.match(/(^on)([A-Z].*)/); //e.g. onClick, onActive
        if (!matched) {
          return;
        }

        const event = lcfirst(matched[2]);
        this.on(event, props[name]);
      });
  }

  _bindEvents() {
    Object.keys(this._eventsToBind).forEach(event => {
      this._eventsToBind[event].forEach(fn => {
        this.on(event, fn);
      });
    });
  }
}
