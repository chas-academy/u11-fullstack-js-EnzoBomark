const Image = ({ attributes, element, children }) => {
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <img alt={element.alt} src={element.src} />
      </div>
      {children}
    </div>
  );
};
export default Image;
