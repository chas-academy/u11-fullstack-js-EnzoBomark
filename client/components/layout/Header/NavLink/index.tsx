import { useRouter } from 'next/router';
import Link from 'next/link';
import { S } from './NavLink.style';

const NavLink: React.FC<{ href: string }> = (props) => {
  const router = useRouter();

  return (
    <Link href={props.href}>
      <S.Nav aria-current={router.pathname === props.href ? 'page' : null}>{props.children}</S.Nav>
    </Link>
  );
};

export default NavLink;
