import { S } from './Toolbar.style';
import LinkButton from '../LinkButton';
import MarkButton from '../MarkButton';
import ImageButton from '../ImageButton';
import { Icon } from '../../../../../assets/icons';

const Toolbar = () => {
  return (
    <S.Toolbar>
      <MarkButton format="bold" icon={Icon.Bold} />
      <MarkButton format="italic" icon={Icon.Italic} />
      <MarkButton format="underline" icon={Icon.Underline} />
      <MarkButton format="list" icon={Icon.List} />
      <MarkButton format="heading" icon={Icon.Heading} />
      <ImageButton />
      <LinkButton />
    </S.Toolbar>
  );
};

export default Toolbar;
