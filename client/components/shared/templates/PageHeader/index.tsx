import { S } from './PageHeader.style';
import Breakline from '../../misc/Breakline';
import React from 'react';

interface Props {
  title: string;
  children?: React.ReactNode;
}

const PageHeader: React.FC<Props> = (props: Props) => {
  return (
    <>
      <S.PageHeader>
        <S.Title>{props.title}</S.Title>
        {props.children}
      </S.PageHeader>
      <Breakline />
    </>
  );
};

export default PageHeader;
