import { InputStyle } from '../../../styles/ui/form-elements/Input.style';
import { DarkFormButton } from '../../../styles/ui/buttons/dark-form-button.style';
import { ResetPasswordStyle } from './ResetPassword.style';
import { object, string, number, InferType, ref } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { POST } from '../../../helpers/Rest.helper';

const schema = object({
  password: string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  passwordConfirmation: string().oneOf([ref('password'), null], 'Passwords must match'),
});

const formSubmitHandler = async (values: Props) => {
  const response = await POST('auth/reset-password', values);

  console.log(response);
};

type Props = InferType<typeof schema>;

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Props>({
    resolver: yupResolver(schema),
  });

  return (
    <ResetPasswordStyle>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <div>
          <InputStyle>
            <label htmlFor="password">
              <span>Password</span>
              <input
                type="password"
                placeholder="Password"
                id="password"
                {...register('password')}
              />
            </label>
            <span>{errors?.password?.message}</span>
          </InputStyle>

          <InputStyle>
            <label htmlFor="password-confirmation">
              <span>Password Confirmation</span>
              <input
                type="password"
                placeholder="Password Confirmation"
                id="password-onfirmation"
                {...register('passwordConfirmation')}
              />
            </label>
            <span>{errors?.passwordConfirmation?.message}</span>
          </InputStyle>
        </div>
        <div>
          <DarkFormButton>Submit</DarkFormButton>
        </div>
      </form>
    </ResetPasswordStyle>
  );
};

export default ResetPassword;
