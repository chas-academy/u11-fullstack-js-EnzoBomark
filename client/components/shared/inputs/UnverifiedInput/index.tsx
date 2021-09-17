import { S } from './UnverifiedInput.style';
import React, { useState } from 'react';

interface Props {
  placeholder: string;
  getState: (e) => void;
}

const UnverifiedInput: React.FC<Props> = (props: Props) => {
  const changeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    props.getState(event.currentTarget.value);
  };

  return <S.UnverifiedInput placeholder={props.placeholder} onChange={changeHandler} />;
};

export default UnverifiedInput;
