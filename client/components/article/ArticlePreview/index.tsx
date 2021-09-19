import { S } from './ArticlePreview.style';
import { getReadTime } from '@/utils/slate/readTime.utils';
import { useRouter } from 'next/router';

interface Props {
  data: {
    _id: string;
    title: string;
    date: string;
    about: string;
    author: string;
    image: string;
    tags: string[];
    body: any;
  };
}

const ArticlePreview = (props: Props) => {
  const router = useRouter();

  const clickHandler = () => {
    router.push(`/article/${props.data._id}`);
  };

  return (
    <S.ArticlePreview onClick={clickHandler}>
      <S.Image src={`${process.env.BASE_S3}${props.data.image}`} />
      <S.Text>
        <S.Title>{props.data.title}</S.Title>
        <S.Span>
          <S.Data>{props.data.author}</S.Data>
          <S.Data>{props.data.date}</S.Data>
          <S.Data>{getReadTime(props.data.body)} Min</S.Data>
        </S.Span>
        <S.About>{props.data.about}</S.About>
        <S.Span>
          {props.data.tags.map((item, index) => {
            return <S.Tags key={index}>#{item}</S.Tags>;
          })}
        </S.Span>
      </S.Text>
    </S.ArticlePreview>
  );
};

export default ArticlePreview;
