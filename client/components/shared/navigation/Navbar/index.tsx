import { S } from './Navbar.style';
import NavLink from '@/components/shared/links/NavLink';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import { toTitleCase } from '@/utils/toTitleCase.utils';

interface Props {
  openSidebar: () => void;
}

const Navbar: React.FC<Props> = (props: Props) => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <S.Navbar>
      <S.Nav>
        <S.NavBtn onClick={props.openSidebar}>Menu</S.NavBtn>
        <S.NavMenu>
          <NavLink href="/home">Home</NavLink>
          <NavLink href="/search">Search</NavLink>

          {!user && (
            <>
              <NavLink href="/login">Login</NavLink>
              <NavLink href="/register">Register</NavLink>
            </>
          )}

          {user && (
            <>
              <NavLink href="/editor">Editor</NavLink>
              <NavLink href="/saved">Saved</NavLink>
              <NavLink href={`/user/${user.id}`}>{toTitleCase(user.name)}</NavLink>
            </>
          )}
        </S.NavMenu>
      </S.Nav>
    </S.Navbar>
  );
};

export default Navbar;
