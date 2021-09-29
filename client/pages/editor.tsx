import { useEffect, useState } from 'react';

import ArticleEditor from '@/components/article/ArticleEditor';
import { NextPage } from 'next';
import { Private } from '@/guards/private.guard';
import { S } from '@/styles/pages/Editor.style';
import { getReadTime } from '@/utils/readTime.utils';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

const Editor: NextPage = () => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState('');
  const [readTime, setReadTime] = useState(0);

  const handleChange = (article) => {
    if (article[0]) setTitle(article[0].children.map((item) => item.text).join(''));
    if (article[1]) {
      setAbout(article[1].children.map((item) => item.text).join(''));
      setReadTime(getReadTime(article));
      // setTags(getTags(article));
      setBody(article.slice(1));
    }
  };

  useEffect(() => {
    console.log({ title, about, body });
  }, [title, about, body]);

  return (
    <S.Editor>
      <ArticleEditor onChange={handleChange} />
      <S.Toggle>Save to profile</S.Toggle>
    </S.Editor>
  );
};

export const getServerSideProps = Private();

export default Editor;
