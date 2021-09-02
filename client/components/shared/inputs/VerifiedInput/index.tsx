import { S } from './VerifiedInput.style';
import React from 'react';

interface Props {
  children?: any;
  format: string;
  error: string;
  register: any;
  type?: string;
}

const VerifiedInput: React.FC<Props> = (props: Props) => {
  const id = props.format;
  const placeholder = id.charAt(0).toUpperCase() + id.substring(1);
  const error = props.error || '';

  return (
    <>
      <S.Label htmlFor="id">{placeholder}</S.Label>
      <S.VerifiedInput
        type={props.type || 'text'}
        error={error}
        placeholder={placeholder}
        id={id}
        {...props.register}
      />
      {error && <S.Error>{error}</S.Error>}
    </>
  );
};

export default VerifiedInput;
