import LinkButton from '../LinkButton';
import MarkButton from '../MarkButton';
import ImageButton from '../ImageButton';

const Toolbar = () => {
  return (
    <div className="toolbar">
      <MarkButton format="bold" icon="B" />
      <MarkButton format="italic" icon="I" />
      <MarkButton format="underline" icon="U" />
      <MarkButton format="list" icon="L" />
      <MarkButton format="heading" icon="H" />
      <ImageButton />
      <LinkButton />
    </div>
  );
};

export default Toolbar;
