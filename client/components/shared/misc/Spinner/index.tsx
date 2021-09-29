import { S } from './Spinner.style';
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <S.Progress>
      <S.Bar />
    </S.Progress>
  );
};

export default Spinner;
