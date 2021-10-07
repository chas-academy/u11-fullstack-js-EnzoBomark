import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Descendant } from 'slate';

import ArticleEditor from '@/components/article/ArticleEditor';
import Spinner from '@/components/shared/misc/Spinner';
import { Private } from '@/guards/private.guard';
import { useFetch } from '@/hooks/useFetch.hooks';
import { useMount } from '@/hooks/useMount';
import { Response } from '@/interfaces/Response.interface';
import { S } from '@/styles/pages/Editor.style';
import { getDecendent } from '@/utils/descendantText.utils';
import { post } from '@/utils/http.utils';
import { getReadTime } from '@/utils/readTime.utils';
import { s3 } from '@/utils/s3.utils';
import { getTags } from '@/utils/tags.utils';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

const Editor: NextPage = () => {
  const router = useRouter();
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const [tags, setTags] = useState<string[]>();
  const [title, setTitle] = useState<string>();
  const [about, setAbout] = useState<string>();
  const [image, setImage] = useState<string>();
  const [body, setBody] = useState<Descendant[]>();
  const [readTime, setReadTime] = useState<number>();

  const { fetch, isLoading, hasError, data } = useFetch<Response>(() =>
    post('article', { title, about, body, tags, image, readTime })
  );

  const submitHandler = (e) => {
    e.preventDefault();
    setTitle(getDecendent(value).shift().join(' '));
    setAbout(getDecendent(value).slice(1).join(' '));
    setReadTime(getReadTime(value));
    setTags(getTags(value));
    setBody(value);
  };

  useMount(async () => await fetch(), [body]);

  useMount(() => router.push('/'), [data]);

  return (
    <S.Editor>
      <Spinner isLoading={isLoading} />
      <ArticleEditor
        error={hasError}
        onSubmit={submitHandler}
        onChange={(e) => setValue(e)}
        imageImport={async (e) => setImage(await s3(e))}
        value={value}
        image={image}
      />
    </S.Editor>
  );
};

export const getServerSideProps = Private();

export default Editor;
