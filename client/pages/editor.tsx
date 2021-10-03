import { NextPage } from 'next';

import ArticleEditor from '@/components/article/ArticleEditor';
import { Private } from '@/guards/private.guard';
import { S } from '@/styles/pages/Editor.style';

const Editor: NextPage = () => {
  return (
    <S.Editor>
      <ArticleEditor />
    </S.Editor>
  );
};

export const getServerSideProps = Private();

export default Editor;
