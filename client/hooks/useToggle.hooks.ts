import { useState } from 'react';

export const useToggle = (
  defaultValue: boolean | null
): [boolean, (value?: boolean | undefined) => void] => {
  const [value, setValue] = useState(defaultValue);

  function toggleValue(value: boolean | undefined = undefined) {
    setValue((currentValue) => (!value === undefined ? value : !currentValue));
  }

  return [value, toggleValue];
};
