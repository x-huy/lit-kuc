export const handleItemClick = (item, onChange) => {
  const value = item.value;
  onChange(value);
};

export const hasDuplicatedItems = items => {
  const unique = {};
  let isUnique = true;
  if (items) {
    items.forEach(val => {
      if (typeof unique[val.value] !== 'undefined') {
        isUnique = false;
      }
      unique[val.value] = 0;
    });
  }
  return !isUnique;
};

export const hasValidValue = (items, value) => {
  if (value === undefined) {
    return true;
  }
  return (
    items &&
    items.some(item => {
      return item.value === value;
    })
  );
};
