import { S } from './TagsInput.style';
import { useState, useEffect } from 'react';

interface Props {
  getState: (e) => void;
}

const TagsInput: React.FC<Props> = (props: Props) => {
  const [tags, setTags] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    if (tags.length >= 6) return;
    props.getState(tags);
  }, [tags]);

  const clickHandler = () => {
    if (tags.length >= 6) return;
    setTags((currentValue) => [...currentValue, input]);
    setInput('');
  };

  const DeleteTagHandler = (e) => {
    setTags((currentValue) => [
      ...currentValue.filter((item, index) => parseInt(e.target.id) !== index),
    ]);
  };

  return (
    <>
      <S.Label htmlFor="tags">Tags</S.Label>
      <S.Wrapper>
        <S.TagsInput
          type="text"
          id="tags"
          placeholder="Add tags"
          value={input}
          maxLength={10}
          onChange={(e) => setInput(e.target.value)}
        />
        <S.AddTag type="button" onClick={clickHandler}>
          Add
        </S.AddTag>
      </S.Wrapper>
      {tags.length >= 6 && <S.Error>Max tags reached</S.Error>}
      <S.Tags>
        {tags.map((item, index) => {
          return (
            <S.Tag key={index} id={`${index}`} onClick={DeleteTagHandler}>
              {item}
            </S.Tag>
          );
        })}
      </S.Tags>
    </>
  );
};

export default TagsInput;
