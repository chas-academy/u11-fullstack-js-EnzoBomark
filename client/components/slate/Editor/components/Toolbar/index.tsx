import LinkButton from '../LinkButton';
import MarkButton from '../MarkButton';
import ImageButton from '../ImageButton';
import { S } from './Toolbar.style';

const Toolbar = () => {
  return (
    <S.Toolbar>
      <MarkButton format="bold" icon="B" />
      <MarkButton format="italic" icon="I" />
      <MarkButton format="underline" icon="U" />
      <MarkButton format="list" icon="L" />
      <MarkButton format="heading" icon="H" />
      <ImageButton />
      <LinkButton />
    </S.Toolbar>
  );
};

export default Toolbar;
