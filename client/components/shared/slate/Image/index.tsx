import { S } from './Image.style';

const Image = ({ attributes, element, children }) => {
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <S.Image alt={element.alt} src={element.src} />
      </div>
      {children}
    </div>
  );
};
export default Image;
