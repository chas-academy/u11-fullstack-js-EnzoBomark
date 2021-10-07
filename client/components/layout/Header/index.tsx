import Navbar from '@/components/shared/navigation/Navbar';
import Sidebar from '@/components/shared/navigation/Sidebar';
import { useToggle } from '@/hooks/useToggle.hooks';

import { S } from './Header.style';

const Header: React.FC = (props) => {
  const [isOpen, setIsOpen] = useToggle(false);

  return (
    <S.Header>
      <Sidebar isOpen={isOpen} closeSidebar={() => setIsOpen(false)} />
      <Navbar openSidebar={() => setIsOpen(true)} />
    </S.Header>
  );
};

export default Header;
