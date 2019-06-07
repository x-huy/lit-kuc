import { createSection } from './section';
import { TextBox } from '../../src';

export default (container: HTMLElement) => {
  const textboxSection = createSection('Textbox').appendTo(container);
  const txt1 = new TextBox({value: 'hello'});
  txt1.on('input', ({ target }) => console.log('txt1:', (target as any).value));
  textboxSection.appendChild(txt1.render());

  const txt2 = new TextBox({disabled: true });
  txt2.value = 'read only textbox';
  textboxSection.appendChild(txt2.render());
};
