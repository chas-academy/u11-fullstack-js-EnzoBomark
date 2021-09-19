import ArticleShowcase from '@/components/article/ArticleShowcase';
import { NextPage } from 'next';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'Text asdasdasdasd' }],
  },
];

const Article: NextPage = () => {
  return (
    <>
      <ArticleShowcase initialValue={initialValue} />
    </>
  );
};

export default Article;
