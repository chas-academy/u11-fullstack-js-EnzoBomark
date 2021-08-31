import { S } from './TextInput.style';
import React from 'react';

const TextInput = React.forwardRef<HTMLInputElement>((props, ref) => {
  return <S.TextInput placeholder="Title" ref={ref} />;
});

export default TextInput;
