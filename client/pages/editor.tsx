import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Icon } from '@/assets/icons';
import ArticleEditor from '@/components/article/ArticleEditor';
import ImageImportButton from '@/components/shared/buttons/ImageImportButton';
import Spinner from '@/components/shared/misc/Spinner';
import Form from '@/components/shared/templates/Form';
import { Private } from '@/guards/private.guard';
import { useFetch } from '@/hooks/useFetch.hooks';
import { useMount } from '@/hooks/useMount';
import { useS3 } from '@/hooks/useS3.hooks';
import { Response } from '@/interfaces/Response.interface';
import { S } from '@/styles/pages/Editor.style';
import { post } from '@/utils/http.utils';
import { getReadTime } from '@/utils/readTime.utils';
import { getTags } from '@/utils/tags.utils';

const Editor: NextPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState<File>();
  const [readTime, setReadTime] = useState(0);

  const { uploadImage, imageKey } = useS3(image);

  const { fetch, isLoading, hasError, data } = useFetch<Response>(() =>
    post('article', { title, about, body, tags, image: imageKey, readTime })
  );

  useMount(() => {
    router.push('/');
  }, [data]);

  const articleChange = (article) => {
    if (article[0]) {
      setTitle(article[0].children.map((item) => item.text).join(''));
      setTags(getTags(article));
    }
    if (article[1]) {
      setAbout(article[1].children.map((item) => item.text).join(''));
      setReadTime(getReadTime(article));
      setBody(article.slice(1));
    }
  };

  useEffect(() => {
    console.log(tags);
  }, [tags]);

  const thumbnailChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.files[0]);
  };

  useMount(async () => {
    await uploadImage();
  }, [image]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch();
  };

  return (
    <S.Editor>
      <Spinner isLoading={isLoading} />
      <Form onSubmit={submitHandler} error={hasError}>
        <ArticleEditor onChange={articleChange} image={imageKey} />
        <ImageImportButton onChange={thumbnailChange} />
        <S.Submit>
          <Image src={Icon.Save} />
        </S.Submit>
      </Form>
    </S.Editor>
  );
};

export const getServerSideProps = Private();

export default Editor;
