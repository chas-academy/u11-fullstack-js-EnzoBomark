import { useSlateStatic } from 'slate-react';
import { insertImage } from '../../utils/image';

const ImageButton = () => {
  const editor = useSlateStatic();

  const insertImageHander = () => {
    const url = prompt('Enter an Image URL');
    insertImage(editor, url);
  };

  return (
    <button onClick={insertImageHander} aria-label="Insert Image" title="Image">
      image
    </button>
  );
};

export default ImageButton;
