import Link from 'next/link';
import { useRouter } from 'next/router';

import { S } from './NavLink.style';

interface Props {
  children: string;
  href: string;
}

const NavLink: React.FC<Props> = (props: Props) => {
  const router = useRouter();
  const activeLink = router.pathname === props.href;

  return (
    <Link href={props.href}>
      <S.Nav active={activeLink}>{props.children}</S.Nav>
    </Link>
  );
};

export default NavLink;
