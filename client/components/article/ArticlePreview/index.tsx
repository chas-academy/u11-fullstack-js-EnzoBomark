import { S } from './ArticlePreview.style';
import { getReadTime } from '@/utils/slate/readTime.utils';
import { useRouter } from 'next/router';

interface Props {
  data: {
    _id: string;
    title: string;
    image: string;
    tags: string[];
    date: string;
    body: any;
    about: string;
    author: string;
    readTime: number;
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
          <S.Data>{props.data.readTime} Min</S.Data>
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
