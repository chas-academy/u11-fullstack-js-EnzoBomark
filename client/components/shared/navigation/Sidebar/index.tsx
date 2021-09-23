import { S } from './Sidebar.style';
import { useSelector } from 'react-redux';
import NavLink from '@/components/shared/links/NavLink';
import { RootState } from '@/store/index';
import { toTitleCase } from '@/utils/toTitleCase.utils';

interface Props {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<Props> = (props: Props) => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <>
      <S.SidebarBackground isOpen={props.isOpen} onClick={props.closeSidebar} />
      <S.Sidebar isOpen={props.isOpen}>
        <S.SidebarBtn onClick={props.closeSidebar}>Close</S.SidebarBtn>
        <S.SidebarMenu>
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
        </S.SidebarMenu>
      </S.Sidebar>
    </>
  );
};

export default Sidebar;
