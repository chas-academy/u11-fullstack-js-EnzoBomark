import Link from 'next/link';

import { S } from './Footer.style';

const Footer: React.FC = (props) => {
  return (
    <S.Footer>
      <S.Wrapper>
        <S.Column>
          <S.Title>Pages</S.Title>
          <Link href="/">
            <S.Link>Home</S.Link>
          </Link>
          <Link href="#">
            <S.Link>About</S.Link>
          </Link>
          <Link href="/search">
            <S.Link>Search</S.Link>
          </Link>
        </S.Column>
        <S.Column>
          <S.Title>Dev</S.Title>
          <Link href="#">
            <S.Link>GitHub</S.Link>
          </Link>
          <Link href="#">
            <S.Link>Discord</S.Link>
          </Link>
          <Link href="#">
            <S.Link>Dev.to</S.Link>
          </Link>
        </S.Column>
        <S.Column>
          <S.Title>Contact</S.Title>
          <Link href="#">
            <S.Link>Email</S.Link>
          </Link>
          <Link href="#">
            <S.Link>Support</S.Link>
          </Link>
          <Link href="#">
            <S.Link>LinkedIn</S.Link>
          </Link>
        </S.Column>
        <S.Column>
          <S.Title>Social</S.Title>
          <Link href="#">
            <S.Link>Facebook</S.Link>
          </Link>
          <Link href="#">
            <S.Link>Youtube</S.Link>
          </Link>
          <Link href="#">
            <S.Link>Twitter</S.Link>
          </Link>
        </S.Column>
      </S.Wrapper>
      <S.P> 2021-2021 by the-peek.vercel.app, Inc</S.P>
    </S.Footer>
  );
};

export default Footer;
