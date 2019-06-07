import { createSection } from './section';
import { Dropdown } from '../../src';

export default (container: HTMLElement) => {
  const dropdownSection = createSection('Dropdown').appendTo(container);
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
        disabled: true
      },
      {
        label: 'Apple',
        value: 'Apple'
      }
    ],
    value: 'Banana'
  });

  dropdown1.on('change', (({ detail }: CustomEvent) => {
    console.log(`The "${detail.value}" is selected.`);
  }) as EventListener);
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
        disabled: true
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
  dropdown2.on('change', (({ detail }: CustomEvent) => {
    console.log(`The "${detail.value}" is selected.`);
  }) as EventListener);
  dropdownSection.appendChild(dropdown2.render());
};
