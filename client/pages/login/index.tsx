import { InputStyle } from '../../styles/ui/form-elements/Input.style';
import { DarkFormButton } from '../../styles/ui/buttons/dark-form-button.style';
import { LoginStyle } from './Login.style';
import { object, string, number, InferType, ref } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { POST } from '../../helpers/Rest.helper';

const schema = object({
  email: string().email('Email must be a valid email address').required('Email is required'),
  password: string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
});

const formSubmitHandler = async (values: Props) => {
  const response = await POST('auth/login', values);

  console.log(response);
};

type Props = InferType<typeof schema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Props>({
    resolver: yupResolver(schema),
  });

  return (
    <LoginStyle>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <div>
          <InputStyle>
            <label htmlFor="email">
              <span>Email</span>
              <input placeholder="jane.doe@email.com" id="email" {...register('email')} />
            </label>
            <span>{errors?.email?.message}</span>
          </InputStyle>

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
        </div>
        <div>
          <DarkFormButton>Submit</DarkFormButton>
        </div>
      </form>
    </LoginStyle>
  );
};

export default Login;
