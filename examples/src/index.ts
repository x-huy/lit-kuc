import { createSection } from './section';
import { Text, Button, Dropdown } from '../../src';

const mainEl = document.querySelector('main');

// text box
const textboxSection = createSection('Textbox').appendTo(mainEl);
const txt1 = new Text();
txt1.on('input', ({ target }) => console.log('txt1:', target.value));
textboxSection.appendChild(txt1.render());

const txt2 = new Text({ value: 'read only', isDisabled: true });
textboxSection.appendChild(txt2.render());

// button
const buttonSection = createSection('Button').appendTo(mainEl);
const btn1 = new Button({ text: 'Button 1' });
btn1.on('click', () => console.log('"Button 1" is clicked'));
buttonSection.appendChild(btn1.render());

const btn2 = new Button({ text: 'Button 2', type: 'submit' });
btn2.on('click', () => console.log('"Button 2" is clicked'));
buttonSection.appendChild(btn2.render());

const btn3 = new Button({ text: 'Button 3', isDisabled: true });
buttonSection.appendChild(btn3.render());

// dropdown
const dropdownSection = createSection('Dropdown').appendTo(mainEl);
const dropdown1 = new Dropdown({
  items: [
    {
      label: 'Orange',
      value: 'Orange'
    },
    {
      label: 'Banana',
      value: 'Banana'
    },
    {
      label: 'Lemon',
      value: 'Lemon',
      isDisabled: true
    },
    {
      label: 'Apple',
      value: 'Apple'
    }
  ],
  value: 'Banana'
});
dropdown1.on('change', ({ detail }) =>
  console.log(`The "${detail.value}" is selected.`)
);
dropdownSection.appendChild(dropdown1.render());

const dropdown2 = new Dropdown({
  items: [
    {
      label: 'iPhone 6',
      value: 'iPhone 6'
    },
    {
      label: 'iPhone 7',
      value: 'iPhone 7',
      isDisabled: true
    },
    {
      label: 'iPhone 8',
      value: 'iPhone 8'
    },
    {
      label: 'iPhone X',
      value: 'iPhone X'
    }
  ],
  value: 'iPhone X'
});
dropdown2.on('change', ({ detail }) =>
  console.log(`The "${detail.value}" is selected.`)
);
dropdownSection.appendChild(dropdown2.render());
