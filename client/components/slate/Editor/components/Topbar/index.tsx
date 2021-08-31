import { S } from './Topbar.style';
import ImageImportButton from '@/components/shared/ImageImportButton';
import SaveButton from '@/components/shared/SaveButton';
import TextInput from '@/components/shared/TextInput';
import { createRef } from 'react';
import { POST } from '@/helpers/Rest.helper';

const Topbar = () => {
  const textInputRef = createRef<HTMLInputElement>();
  const imageImportButtonRef = createRef<HTMLInputElement>();

  const postArticleHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const params = {
      title: textInputRef.current.value,
      image: imageImportButtonRef.current.files[0],
      body: JSON.parse(localStorage.getItem('article')),
    };

    POST('article', params);
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
