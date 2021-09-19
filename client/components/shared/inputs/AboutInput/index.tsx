import { S } from './AboutInput.style';
import { useEffect, useState } from 'react';

interface Props {
  getState: (e) => void;
}

const AboutInput: React.FC<Props> = (props: Props) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    props.getState(value);
  }, [value]);

  return (
    <>
      <S.Label htmlFor="id">About</S.Label>
      <S.AboutInput
        placeholder="About"
        maxLength={100}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
};

export default AboutInput;
