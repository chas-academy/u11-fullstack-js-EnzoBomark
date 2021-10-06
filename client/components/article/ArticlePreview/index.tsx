import { useRouter } from 'next/router';
import React from 'react';

import { IArticle } from '@/interfaces/Article.interface';

import { S } from './ArticlePreview.style';

interface Props {
  data: IArticle;
  update?: boolean;
}

const ArticlePreview = React.forwardRef((props: Props, ref?: any) => {
  const router = useRouter();

  const clickHandler = () => {
    if (props.update) router.push(`/article/update/${props.data._id}`);
    if (!props.update) router.push(`/article/${props.data._id}`);
  };

  return (
    <S.ArticlePreview ref={ref} onClick={clickHandler}>
      <S.Image src={`${process.env.BASE_S3}${props.data.image}`} />
      <S.Text>
        <S.Title>{props.data.title}</S.Title>
        <S.Span>
          <S.Data>{props.data.user.name}</S.Data>
          <S.Data>{props.data.updatedAt.substring(0, 10)}</S.Data>
          <S.Data>{props.data.readTime} Min</S.Data>
        </S.Span>
        <S.About>{props.data.about}</S.About>
        <S.Span>
          {props.data.tags.map((item, index) => {
            if (item === 'false') return;
            return <S.Tags key={index}>{item}</S.Tags>;
          })}
        </S.Span>
      </S.Text>
    </S.ArticlePreview>
  );
});

export default ArticlePreview;
