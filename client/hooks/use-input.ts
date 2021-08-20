import React, { useState } from 'react';

interface regExpDocument {
  regexp: string;
  min: number;
  max: number;
}

const useInput = (validation: regExpDocument) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const regexpIsValid = new RegExp(validation.regexp).test(enteredValue);
  const minLengthIsValid = enteredValue.length > validation.min;
  const maxLengthIsValid = enteredValue.length < validation.max;

  const errorMessageArray: string[] = [];
  if (regexpIsValid) errorMessageArray.push('Invalid character used');
  if (minLengthIsValid) errorMessageArray.push(`Minimum of ${validation.min} characters`);
  if (maxLengthIsValid) errorMessageArray.push(`Maximum of ${validation.max} characters`);

  const errorMessage = errorMessageArray.join(' - ');

  const valueIsValid = regexpIsValid && minLengthIsValid && maxLengthIsValid;

  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError: hasError,
    errorMessage: errorMessage,
    valueChangeHandler,
    inputBlurHandler,
  };
};

export default useInput;
