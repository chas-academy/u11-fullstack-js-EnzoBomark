import { S } from './VerifiedInput.style';
import { useState } from 'react';

interface Props {
  children?: any;
  format: string;
  error: string;
  register: any;
  type?: string;
  defaultValue?: string;
}

const VerifiedInput: React.FC<Props> = (props: Props) => {
  const [value, setValue] = useState(props.defaultValue || '');
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
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...props.register}
      />
      {error && <S.Error>{error}</S.Error>}
    </>
  );
};

export default VerifiedInput;
