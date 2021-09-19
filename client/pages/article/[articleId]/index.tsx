import Reader from '@/components/slate/Reader';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'Text asdasdasdasd' }],
  },
];

const Article = () => {
  return (
    <>
      <Reader initialValue={initialValue} />
    </>
  );
};

export default Article;
