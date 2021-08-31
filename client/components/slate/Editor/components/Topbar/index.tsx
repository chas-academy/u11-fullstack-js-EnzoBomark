import { S } from './Topbar.style';
import ImageImportButton from '@/components/shared/ImageImportButton';
import SaveButton from '@/components/shared/SaveButton';
import TextInput from '@/components/shared/TextInput';
import { createRef } from 'react';

const Topbar = () => {
  const textInputRef = createRef<HTMLInputElement>();
  const imageImportButtonRef = createRef<HTMLInputElement>();

  const postArticleHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const params = {
      title: textInputRef.current.value,
      image: imageImportButtonRef.current.value,
      body: localStorage.getItem('article'),
    };

    console.log(params);
  };

  return (
    <S.Topbar onSubmit={postArticleHandler}>
      <TextInput ref={textInputRef} />
      <ImageImportButton ref={imageImportButtonRef} />
      <SaveButton />
    </S.Topbar>
  );
};

export default Topbar;
