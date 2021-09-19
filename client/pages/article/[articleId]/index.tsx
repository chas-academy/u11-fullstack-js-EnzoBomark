import ArticleShowcase from '@/components/article/ArticleShowcase';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'Text asdasdasdasd' }],
  },
];

const Article = () => {
  return (
    <>
      <ArticleShowcase initialValue={initialValue} />
    </>
  );
};

export default Article;
