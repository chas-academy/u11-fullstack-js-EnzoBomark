import { S } from './ArticleFilter.style';
import Modal from '@/components/shared/templates/Modal';
import { useToggle } from '@/hooks/useToggle.hooks';

const ArticleFilter: React.FC = () => {
  const [isOpen, setIsOpen] = useToggle(false);
  const [filter, setFilter] = useToggle(false);

  return (
    <S.ArticleFilter>
      <S.FilterButton onClick={() => setIsOpen()}>Filter</S.FilterButton>

      <Modal open={isOpen} close={() => setIsOpen(false)}>
        <S.FilterContent>
          {/* Placeholder filter */}
          <p onClick={() => setFilter()}>{filter ? 'Newest' : 'Oldest'}</p>
        </S.FilterContent>
      </Modal>
    </S.ArticleFilter>
  );
};

export default ArticleFilter;
