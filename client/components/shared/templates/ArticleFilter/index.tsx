import { S } from './ArticleFilter.style';
import FilterModal from '../../modals/FilterModal';
import { useState } from 'react';
import { useToggle } from '@/hooks/useToggle.hooks';

const ArticleFilter: React.FC = () => {
  const [isOpen, setIsOpen] = useToggle(false);
  const [filter, setFilter] = useToggle(false);

  return (
    <>
      <div onClick={() => setIsOpen()}>Filter</div>

      <FilterModal open={isOpen} close={() => setIsOpen(false)}>
        <S.ArticleFilter>
          {/* Placeholder filter */}
          <p onClick={() => setFilter()}>{filter ? 'Newest' : 'Oldest'}</p>
        </S.ArticleFilter>
      </FilterModal>
    </>
  );
};

export default ArticleFilter;
