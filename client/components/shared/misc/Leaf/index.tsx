import styled from 'styled-components';

const Hashtag = styled.span`
  color: gray;
  &:before {
    content: '';
  }
`;

export const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.hashtag && leaf.text.length <= 15) return <Hashtag {...attributes}>{children}</Hashtag>;
  if (leaf.bold) children = <strong>{children}</strong>;
  if (leaf.italic) children = <em>{children}</em>;
  if (leaf.underline) children = <u>{children}</u>;
  return <span {...attributes}>{children}</span>;
};
