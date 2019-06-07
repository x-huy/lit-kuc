import { render, TemplateResult } from 'lit-html';
import { Prop } from './decorator';

export type BaseProps = {
  visible?: boolean;
  disabled?: boolean;
  [index: string]: any;
};

export default abstract class Component<Props = BaseProps> {
  'constructor': typeof Component;
  protected _fragmentEl: DocumentFragment;
  protected _el: HTMLElement;
  protected _eventsToBind: {
    [index: string]: EventListener[];
  };
  protected _isReadyToRender: boolean;
  protected _props: Props = {} as Props;
  protected _state: object = {};

  static defaultProps = { visible: true, disabled: false } as object;

  @Prop visible: boolean;
  @Prop disabled: boolean;

  constructor(props: Props = {} as Props) {
    this._fragmentEl = document.createDocumentFragment();
    this._eventsToBind = {};
    this._props = {
      ...Component.defaultProps,
      ...this.constructor.defaultProps,
      ...props
    } as Props;
  }

  get fragmentEl() {
    return this._fragmentEl;
  }

  get el() {
    if (!this._el) {
      this._el = this.fragmentEl.querySelector(':first-child');
    }

    return this._el;
  }

  public on(event: string, fn: EventListener) {
    if (this.el) {
      this.el.addEventListener(event, fn);
      return;
    }

    this._addEventToBind(event, fn);
  }

  public trigger(event: string, data: any) {
    if (!this.el) {
      return;
    }

    const customEvent = new CustomEvent(event, {
      bubbles: true,
      cancelable: true,
      detail: data
    });
    this.el.dispatchEvent(customEvent);
  }

  protected _addEventsFromProps() {
    const eventHandlers = getEventHandlers(this._props);
    Object.keys(eventHandlers).forEach(name => {
      this._addEventToBind(name, eventHandlers[name]);
    });
  }

  protected _addEventToBind(
    event: string,
    fn: EventListener
  ) {
    this._eventsToBind[event] = this._eventsToBind[event] || [];
    this._eventsToBind[event].push(fn);
  }

  protected _bindEvents() {
    Object.keys(this._eventsToBind).forEach(event => {
      this._eventsToBind[event].forEach(
        (fn: EventListener) => {
          this.on(event, fn);
        }
      );
    });
  }

  update(data: Partial<Props>): void;
  update(key: keyof Props, value: any): void;

  update(...args: any): void {
    let data: Partial<Props> = {};
    if (args.length === 2) {
      const [key, value] = args;
      data[key as keyof Props] = value;
    } else {
      [data] = args;
    }

    this._props = { ...this._props, ...data };
    this._internalRender();
  }

  render() {
    this._isReadyToRender = true;
    this._internalRender();
    this._addEventsFromProps();
    this._bindEvents();

    return this.fragmentEl;
  }

  protected _render(): TemplateResult | null {
    throw new Error(
      'The "_render()" method should be implemented by the derived class.'
    );
  }

  protected _internalRender() {
    render(this._render(), this.fragmentEl);
  }
}

const getEventHandlers = (args: {
  [index: string]: any;
}): { [index: string]: EventListener } => {
  const eventNameRegex = /^on([A-Z].*)/; //e.g onClick, onChange
  return Object.keys(args)
    .filter(name => {
      return (
        typeof args[name] === 'function' && name.match(eventNameRegex) !== null
      );
    })
    .reduce(
      (
        handlers: { [index: string]: EventListener },
        name: string
      ) => {
        const eventName = name.match(eventNameRegex)[1].toLocaleLowerCase();
        handlers[eventName] = args[name] as EventListener;
        return handlers;
      },
      {}
    );
};
