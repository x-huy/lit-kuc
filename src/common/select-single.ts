export type ListItem = {
  value: string | number;
  label: string;
  disabled?: boolean;
};

interface HandleSelectInterface {
  (evt: MouseEvent, args: { item: ListItem; onClick: Function }): void;
}

export const handleSelect: HandleSelectInterface = (evt, { item, onClick }) => {
  if (item.disabled) {
    evt.stopPropagation();
    return;
  }

  if (typeof onClick === 'function') {
    onClick(item.value);
  }
};
