import { S } from './Form.style';
import React from 'react';

interface Props {
  children: any;
  submitHandler: any;
}

const Form: React.FC<Props> = (props: Props) => {
  return <S.Form onSubmit={props.submitHandler}>{props.children}</S.Form>;
};

export default Form;
