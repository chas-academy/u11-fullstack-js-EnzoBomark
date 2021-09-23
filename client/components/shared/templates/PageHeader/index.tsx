import { S } from './PageHeader.style';
import ArticleFilter from '@/components/article/ArticleFilter';
import Breakline from '../../misc/Breakline';
import React from 'react';

interface Props {
  title: string;
}

const PageHeader: React.FC<Props> = (props: Props) => {
  return (
    <>
      <S.PageHeader>
        <S.Title>{props.title}</S.Title>
        <ArticleFilter />
      </S.PageHeader>
      <Breakline />
    </>
  );
};

export default PageHeader;
