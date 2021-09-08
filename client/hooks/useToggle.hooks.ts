import { useState } from 'react';

export const useToggle = (defaultValue: boolean) => {
  const [value, setValue] = useState(defaultValue);

  function toggleValue(value: boolean) {
    setValue((currentValue) => !currentValue);
  }

  return [value, toggleValue];
};
