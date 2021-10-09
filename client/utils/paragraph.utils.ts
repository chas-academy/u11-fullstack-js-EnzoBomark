const createParagraphNode = (children = [{ text: '' }]) => ({
  type: 'paragraph',
  children,
});

export default createParagraphNode;
