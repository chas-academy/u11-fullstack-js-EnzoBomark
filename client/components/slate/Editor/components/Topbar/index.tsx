import { S } from './Topbar.style';
import ImageImportButton from '@/components/shared/ImageImportButton';
import SaveButton from '@/components/shared/SaveButton';
import TextInput from '@/components/shared/TextInput';

const Topbar = () => {
  return (
    <S.Topbar>
      <TextInput />
      <ImageImportButton />
      <SaveButton />
    </S.Topbar>
  );
};

export default Topbar;
