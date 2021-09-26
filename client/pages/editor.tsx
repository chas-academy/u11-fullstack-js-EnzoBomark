import ArticeEditor from '@/components/article/ArticleEditor';
import { NextPage } from 'next';

const Editor: NextPage = () => {
  return <ArticeEditor />;
};

import { auth } from '@/guards/auth.guard';
export const getServerSideProps = auth(async (context) => {
  return null;
}, true);

export default Editor;
