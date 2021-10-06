import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Descendant } from 'slate';

import ArticleEditor from '@/components/article/ArticleEditor';
import Spinner from '@/components/shared/misc/Spinner';
import { Private } from '@/guards/private.guard';
import { useFetch } from '@/hooks/useFetch.hooks';
import { useMount } from '@/hooks/useMount';
import { IArticle } from '@/interfaces/Article.interface';
import { Response } from '@/interfaces/Response.interface';
import { S } from '@/styles/pages/Editor.style';
import { getDecendent } from '@/utils/descendantText.utils';
import { get, put } from '@/utils/http.utils';
import { getReadTime } from '@/utils/readTime.utils';
import { s3 } from '@/utils/s3.utils';
import { getTags } from '@/utils/tags.utils';

const Update: NextPage<{ response: IArticle }> = ({ response }) => {
  const router = useRouter();
  const [value, setValue] = useState<Descendant[]>(response.body);
  const [tags, setTags] = useState<string[]>(response.tags);
  const [title, setTitle] = useState<string>(response.title);
  const [about, setAbout] = useState<string>(response.about);
  const [image, setImage] = useState<string>(response.image);
  const [body, setBody] = useState<Descendant[]>(response.body);
  const [readTime, setReadTime] = useState<number>(response.readTime);

  const { fetch, isLoading, hasError, data } = useFetch<Response>(() =>
    put(`article/${router.query.articleId}`, { title, about, body, tags, image, readTime })
  );

  const submitHandler = async (e) => {
    e.preventDefault();
    setTitle(getDecendent(value).shift().join(' '));
    setAbout(getDecendent(value).slice(1).join(' '));
    setReadTime(getReadTime(value));
    setTags(getTags(value));
    setBody(value);
    await fetch();
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

export const getServerSideProps = Private(async (context) => {
  const response = await get<Response>(`article/${context.params.articleId}`);

  if (!response.ok) {
    return { props: { response: null } };
  }

  return { props: { response: response.parsedBody.success } };
});

export default Update;
