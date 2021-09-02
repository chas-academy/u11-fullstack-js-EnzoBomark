import { S } from './UnverifiedInput.style';
import React, { useState } from 'react';

interface Props {
  placeholder: string;
  getState: any;
}

const UnverifiedInput: React.FC<Props> = (props: Props) => {
  const [value, setValue] = useState('');

  const changeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
    props.getState(value);
  };

  return (
    <S.UnverifiedInput placeholder={props.placeholder} value={value} onChange={changeHandler} />
  );
};

export default UnverifiedInput;
