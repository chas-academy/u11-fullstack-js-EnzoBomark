import Image from '@/components/shared/slate//Image';
import Link from '@/components/shared/slate//Link';
import List from '@/components/shared/slate//List';
import Heading from '@/components/shared/slate/Heading';
import Paragraph from '@/components/shared/slate/Paragraph';
import Subheading from '@/components/shared/slate/Subheading';

export const Element = (props) => {
  const type = props.element.type;
  if (type === 'image') return <Image {...props} />;
  if (type === 'link') return <Link {...props} />;
  if (type === 'list') return <List {...props} />;
  if (type === 'heading') return <Heading {...props} />;
  if (type === 'subheading') return <Subheading {...props} />;
  return <Paragraph {...props} />;
};
