import { S } from '@/styles/pages/Error.style';

function Error({ statusCode }) {
  return (
    <S.Error>
      {statusCode ? `This page does not exist ${statusCode} ` : 'An error occurred on client'}
    </S.Error>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
