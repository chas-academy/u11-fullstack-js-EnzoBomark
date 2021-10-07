import { S } from './TextArea.style';

interface Props {
  id: string;
  placeholder: string;
  error?: string;
  defaultValue?: string;
  onChange?: (value) => void;
  register?: any;
}

const TextArea: React.FC<Props> = (props: Props) => {
  return (
    <>
      <S.Label htmlFor={props.id}>{props.placeholder}</S.Label>
      <S.TextArea
        type="text"
        id={props.id}
        placeholder={props.placeholder}
        onInput={(e: any) => (props.onChange ? props.onChange(e.target.value) : null)}
        defaultValue={props.defaultValue}
        error={props.error}
        {...props.register}
      />
      {props.error && <S.Error>{props.error}</S.Error>}
    </>
  );
};

export default TextArea;
