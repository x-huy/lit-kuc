import { createSection } from './section';
import { Button } from '../../src';

export default (container: HTMLElement) => {
  const buttonSection = createSection('Button').appendTo(container);
  const btn1 = new Button({ text: 'Button 1' });
  btn1.on('click', () => console.log('"Button 1" is clicked'));
  buttonSection.appendChild(btn1.render());

  const btn2 = new Button({ text: 'Button 2', type: 'submit' });
  btn2.on('click', () => console.log('"Button 2" is clicked'));
  buttonSection.appendChild(btn2.render());

  const btn3 = new Button({ text: 'Button 3', disabled: true });
  buttonSection.appendChild(btn3.render());
};
