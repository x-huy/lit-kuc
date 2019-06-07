import Component from './Component';

const propertyDecoratorToRender = (type: 'props' | 'state') => (
  target: Component,
  propName: string
) => {
  const classField = `_${type}`;
  Object.defineProperty(target, propName, {
    get() {
      return this[classField][`${propName}`];
    },
    set(value) {
      this[classField][`${propName}`] = value;
      this._isReadyToRender && this._internalRender();
    },
    enumerable: true,
    configurable: true
  });
};

export const Prop = propertyDecoratorToRender('props');
export const State = propertyDecoratorToRender('state');
