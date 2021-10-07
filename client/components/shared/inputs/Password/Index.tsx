import { S } from './Password.style';

interface Props {
  id: string;
  placeholder: string;
  error?: string;
  onChange?: (value) => void;
  register?: any;
}

const Password: React.FC<Props> = (props: Props) => {
  return (
    <>
      <S.Label htmlFor={props.id}>{props.placeholder}</S.Label>
      <S.Input
        type="Password"
        id={props.id}
        placeholder={props.placeholder}
        onInput={(e: any) => (props.onChange ? props.onChange(e.target.value) : null)}
        error={props.error}
        {...props.register}
      />
      {props.error && <S.Error>{props.error}</S.Error>}
    </>
  );
};

export default Password;
